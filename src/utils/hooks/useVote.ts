import { API } from "aws-amplify";
import { useState, useEffect } from "react";
import {
  CreateVoteInput,
  CreateVoteMutation,
  UpdateVoteInput,
  UpdateVoteMutation,
} from "../../API";
import { useUser } from "../../context/AuthContext";
import { updateVote, createVote } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";

function useVote(votes) {
  const { user } = useUser();
  const [userVote, setUserVote] = useState(null); // TODO: Type this.
  const [upvotes, setUpvotes] = useState<number>(
    votes ? votes.filter((v) => v.vote === "upvote").length : 0
  );
  const [downvotes, setDownvotes] = useState<number>(
    votes ? votes.filter((v) => v.vote === "downvote").length : 0
  );

  useEffect(() => {
    if (user) {
      const tryFindVote = votes?.find((v) => v.owner === user.getUsername());
      if (tryFindVote) {
        setUserVote(tryFindVote);
      }
    }
  }, [user]);

  async function addVote(voteType: string) {
    debugger;
    if (userVote?.vote !== voteType) {
      const updateVoteInput: UpdateVoteInput = {
        id: userVote.id,
        vote: voteType,
        postID: userVote.postID,
        _version: userVote._version,
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
      setUserVote(updateThisVote);
    }
    if (!userVote) {
      const createNewVoteInput: CreateVoteInput = {
        vote: voteType,
        postID: "post.id",
        _version: userVote._version,
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
      setUserVote(createNewVote);
      console.log("Created vote:", createNewVote);
    }
  }

  return {
    addVote,
    upvotes,
    downvotes,
  };
}

export { useVote };
