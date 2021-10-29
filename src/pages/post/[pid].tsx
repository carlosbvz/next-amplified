import React, { ReactElement, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { withSSRContext } from "aws-amplify";
import { useForm, SubmitHandler } from "react-hook-form";
import { DefaultLayout, PrivatePage } from "../../layouts";
import PostPreview from "../../components/PostPreview";
// import PostComment from "../../components/postcomment";
import { Grid, TextField, Button } from "@mui/material";
import { DataStore } from "@aws-amplify/datastore";
import { Post, Comment } from "../../models";
import { serializeModel } from "@aws-amplify/datastore/ssr";

interface IFormInput {
  comment: string;
}

interface Props {
  post: Post;
}

function IndividualPost({ post }: Props): ReactElement {
  console.log(post);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const newComment: Comment = await DataStore.save(
      new Comment({
        content: data.comment,
        post,
      })
    );

    setComments([...comments, newComment]);
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
      {/* {comments
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((comment) => (
          <div key={comment.id}>{comment.content}</div>
          <PostComment key={comment.id} comment={comment} />
        ))} */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const SSR = withSSRContext();
  const post = await SSR.DataStore.query(Post, params.pid);
  const serializedPost = post ? serializeModel(post) : ({} as Post);

  console.log(params.id);

  return {
    props: {
      post: serializedPost,
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
  const allPosts = await SSR.DataStore.query(Post);

  console.log(allPosts);

  const paths = allPosts.map((post) => ({
    params: { pid: post.id },
  }));

  return { paths, fallback: "blocking" };
};

export default function IndividualPostWithLayout({
  post,
}: Props): ReactElement {
  return (
    <PrivatePage>
      <DefaultLayout>
        <IndividualPost post={post} />
      </DefaultLayout>
    </PrivatePage>
  );
}
