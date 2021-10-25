import React, { ReactElement, useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import { Post } from "../API";
import { Grid, Paper, Typography, ButtonBase } from "@mui/material";
import Image from "next/image";
import Truncate from "../utils/Truncate";
import { useRouter } from "next/router";
import PostVote from "../components/postvote";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  const router = useRouter();
  const [postImage, setPostImage] = useState<string | undefined>(undefined);

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
        <PostVote post={post} />
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
