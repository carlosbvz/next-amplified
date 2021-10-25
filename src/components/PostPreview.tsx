import React, { ReactElement, useEffect, useState } from "react";
import { API, Storage } from "aws-amplify";
import {
  CreateVoteInput,
  CreateVoteMutation,
  Post,
  UpdateVoteInput,
  UpdateVoteMutation,
} from "../API";
import { Grid, Paper, Typography, ButtonBase } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Truncate from "../utils/Truncate";
import { useRouter } from "next/router";
import { createVote, updateVote } from "../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";
import { useUser } from "../context/AuthContext";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  const router = useRouter();
  const { user } = useUser();
  const [postImage, setPostImage] = useState<string | undefined>(undefined);
  const [existingVote, setExistingVote] = useState<string | undefined>(
    undefined
  );
  const [existingVoteId, setExistingVoteId] = useState<string | undefined>(
    undefined
  );
  const [upvotes, setUpvotes] = useState<number>(
    post.votes.items
      ? post.votes.items.filter((v) => v.vote === "upvote").length
      : 0
  );
  const [downvotes, setDownvotes] = useState<number>(
    post.votes.items
      ? post.votes.items.filter((v) => v.vote === "downvote").length
      : 0
  );
  const [voteVersion, setVoteVersion] = useState<number>(null);

  useEffect(() => {
    if (user) {
      const tryFindVote = post.votes.items?.find(
        (v) => v.owner === user.getUsername()
      );
      if (tryFindVote) {
        setExistingVote(tryFindVote.vote);
        setExistingVoteId(tryFindVote.id);
        setVoteVersion(tryFindVote._version);
      }
    }
  }, [user]);

  useEffect(() => {
    async function getImageFromStorage() {
      try {
        const signedURL = await Storage.get(post.image); // get key from Storage.list
        setPostImage(signedURL);
      } catch (error) {
        console.log("No image found.");
      }
    }

    getImageFromStorage();
  }, []);

  async function addVote(voteType: string) {
    if (existingVote && existingVote !== voteType) {
      const updateVoteInput: UpdateVoteInput = {
        id: existingVoteId,
        vote: voteType,
        postID: post.id,
        _version: voteVersion,
      };
      const updateThisVote = (await API.graphql({
        query: updateVote,
        variables: { input: updateVoteInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: UpdateVoteMutation };

      if (voteType === "upvote") {
        setUpvotes(upvotes + 1);
        setDownvotes(downvotes - 1);
      }

      if (voteType === "downvote") {
        setUpvotes(upvotes - 1);
        setDownvotes(downvotes + 1);
      }
      setExistingVote(voteType);
      setExistingVoteId(updateThisVote.data.updateVote.id);
      setVoteVersion(updateThisVote.data.updateVote._version);
    }
    if (!existingVote) {
      const createNewVoteInput: CreateVoteInput = {
        vote: voteType,
        postID: post.id,
        _version: voteVersion,
      };

      const createNewVote = (await API.graphql({
        query: createVote,
        variables: { input: createNewVoteInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: CreateVoteMutation };
      if (createNewVote.data.createVote.vote === "downvote") {
        setDownvotes(downvotes + 1);
      }
      if (createNewVote.data.createVote.vote === "upvote") {
        setUpvotes(upvotes + 1);
      }
      setExistingVote(voteType);
      setExistingVoteId(createNewVote.data.createVote.id);
      setVoteVersion(createNewVote.data.createVote._version);
      console.log("Created vote:", createNewVote);
    }
  }

  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        spacing={3}
        alignItems="flex-start"
        wrap="nowrap"
        style={{
          width: "100%",
          padding: 16,
          marginTop: 16,
        }}
      >
        {/* Votes */}
        <Grid item alignItems="center" xs={2}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton
                color="inherit"
                onClick={() => addVote("upvote")}
                aria-label="Upvote"
              >
                <ArrowUpwardIcon style={{ maxWidth: 24 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" direction="column">
                <Grid item>
                  <Typography variant="h6" component="span">
                    {upvotes - downvotes}
                  </Typography>
                </Grid>
                <Grid item>votes</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                onClick={() => addVote("downvote")}
                aria-label="Downvote"
              >
                <ArrowDownwardIcon style={{ maxWidth: 24 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        {/* Content Preview */}
        <Grid item xs={10}>
          <ButtonBase onClick={() => router.push(`/post/${post.id}`)}>
            <Grid container direction="column" alignItems="flex-start">
              <Grid item>
                <Typography variant="body1">
                  Posted by <b>{post.owner}</b> at <b>{post.createdAt}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h2">{post.title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  <Truncate lines={1} width={650}>
                    {post.contents}
                  </Truncate>
                </Typography>
              </Grid>

              {post.image && postImage && (
                <Grid item>
                  <Image
                    src={postImage}
                    alt={""}
                    height={540}
                    width={980}
                    layout="intrinsic"
                    objectFit="cover"
                  />
                </Grid>
              )}
            </Grid>
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  );
}
