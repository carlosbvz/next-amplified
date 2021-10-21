import React, { ReactElement, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  GetPostQuery,
  ListPostsQuery,
  Post,
  Comment,
  CreateCommentInput,
  CreateCommentMutation,
} from "../../API";
import { API, withSSRContext } from "aws-amplify";
import { listPosts, getPost } from "../../graphql/queries";
import { useForm, SubmitHandler } from "react-hook-form";
import { createComment } from "../../graphql/mutations";
import DefaultLayout from "../../layouts/default";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import PostPreview from "../../components/PostPreview";
import PostComment from "../../components/postcomment";
import { Grid, TextField, Button } from "@mui/material";

interface IFormInput {
  comment: string;
}

interface Props {
  post: Post;
}

function IndividualPost({ post }: Props): ReactElement {
  const [comments, setComments] = useState<Comment[]>(
    post.comments.items as Comment[]
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    const newCommentInput: CreateCommentInput = {
      postID: post.id,
      content: data.comment,
    };
    // Add Comment Mutation
    const createNewComment = (await API.graphql({
      query: createComment,
      variables: { input: newCommentInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as { data: CreateCommentMutation };

    setComments([...comments, createNewComment.data.createComment as Comment]);
  };

  return (
    <div>
      <PostPreview post={post} />
      {/* Start rendering comments */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        style={{ marginTop: 32, marginBottom: 32 }}
      >
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <TextField
              variant="outlined"
              id="comment"
              label="Add A Comment"
              type="text"
              multiline
              fullWidth
              error={errors.comment ? true : false}
              helperText={errors.comment ? errors.comment.message : null}
              {...register("comment", {
                required: { value: true, message: "Please enter a username." },
                maxLength: {
                  value: 240,
                  message: "Please enter a comment under 240 characters.",
                },
              })}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Add Comment
            </Button>
          </Grid>
        </Grid>
      </form>
      {comments
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const SSR = withSSRContext();
  const postQuery = (await SSR.API.graphql({
    query: getPost,
    variables: {
      id: params.pid,
    },
  })) as { data: GetPostQuery };

  return {
    props: {
      post: postQuery.data.getPost as Post,
      messages: {
        ...require(`../../../messages/shared/navigation/${locale}.json`),
      },
    },
    revalidate: 1,
  };
};

// Return the Path for all possible posts
export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();
  const response = (await SSR.API.graphql({ query: listPosts })) as {
    data: ListPostsQuery;
    error: any[];
  };
  const paths = response.data.listPosts.items.map((post) => ({
    params: { pid: post.id },
  }));

  return { paths, fallback: "blocking" };
};

export default function IndividualPostWithLayout({
  post,
}: Props): ReactElement {
  return (
    <DefaultLayout>
      <IndividualPost post={post} />
    </DefaultLayout>
  );
}
