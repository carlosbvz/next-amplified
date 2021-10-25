import React, { ReactElement } from "react";
import { Post } from "../../API";
import { Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";
import { useVote } from "../../utils/hooks/useVote";

interface Props {
  post: Post;
}

export default function PostVote({ post }: Props): ReactElement {
  const { addVote, upvotes, downvotes } = useVote(post);

  return (
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
  );
}
