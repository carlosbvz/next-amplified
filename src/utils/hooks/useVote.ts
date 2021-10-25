import { API } from "aws-amplify";
import { useState, useEffect } from "react";
import {
  CreateVoteInput,
  CreateVoteMutation,
  UpdateVoteInput,
  UpdateVoteMutation,
  Vote,
  Post,
} from "../../API";
import { useUser } from "../../context/AuthContext";
import { updateVote, createVote } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";
interface IVote {
  userVote: Vote;
  voteType: string;
}

async function createNewVote(data: { voteType: string; postID: string }) {
  const { postID, voteType } = data;
  const createNewVoteInput: CreateVoteInput = {
    vote: voteType,
    postID,
  };

  return (await API.graphql({
    query: createVote,
    variables: { input: createNewVoteInput },
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  })) as { data: CreateVoteMutation };
}

async function updateExistingVote(data: IVote) {
  const { userVote, voteType } = data;
  const updateVoteInput: UpdateVoteInput = {
    id: userVote.id,
    vote: voteType,
    postID: userVote.postID,
    _version: userVote._version,
  };
  return (await API.graphql({
    query: updateVote,
    variables: { input: updateVoteInput },
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  })) as { data: UpdateVoteMutation };
}

async function requestServerChange(data) {
  const { userVote, voteType, post, setUserVote } = data;
  if (!userVote) {
    const newVote = await createNewVote({ voteType, postID: post.id });
    setUserVote(newVote);
  } else {
    const updatedVote = await updateExistingVote({ userVote, voteType });
    setUserVote(updatedVote);
  }
}
function requestUIChange(data) {
  const { voteType, upvotes, setUpvotes, downvotes, setDownvotes } = data;
  // Updating UI
  if (voteType === "upvote") {
    setUpvotes(upvotes + 1);
    setDownvotes(downvotes - 1);
  }
  if (voteType === "downvote") {
    setUpvotes(upvotes - 1);
    setDownvotes(downvotes + 1);
  }
}

function useVote(post: Post) {
  const initialVotes = post?.votes?.items;
  const { user } = useUser();
  const [userVote, setUserVote] = useState(null); // TODO: Type this.
  const [upvotes, setUpvotes] = useState<number>(
    initialVotes ? initialVotes.filter((v) => v.vote === "upvote").length : 0
  );
  const [downvotes, setDownvotes] = useState<number>(
    initialVotes ? initialVotes.filter((v) => v.vote === "downvote").length : 0
  );

  useEffect(() => {
    const votes = post?.votes?.items;
    if (user && votes) {
      const tryFindVote = votes.find((v) => v.owner === user.getUsername());
      if (tryFindVote) {
        setUserVote(tryFindVote);
      }
    }
  }, [user]);

  async function addVote(voteType: string) {
    if (!voteType) return; // No Vote
    if (userVote?.vote === voteType) return; // Same Vote

    requestServerChange({ userVote, voteType, post, setUserVote });
    requestUIChange({ voteType, upvotes, setUpvotes, downvotes, setDownvotes });
  }

  return {
    addVote,
    upvotes,
    downvotes,
  };
}

export { useVote };
