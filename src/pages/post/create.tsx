import { Storage } from "aws-amplify";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostStatus } from "../../API";
import { DefaultLayout, PrivatePage } from "../../layouts";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Grid,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ImageDropzone from "../../components/dropzone/ImageDropzone";
import { DataStore, syncExpression } from "@aws-amplify/datastore";
import { Post } from "../../models";

DataStore.configure({
  syncExpressions: [
    syncExpression(Post, () => {
      return (post) => post;
    }),
  ],
});

interface IFormInput {
  title: string;
  content: string;
  status: PostStatus;
}
interface Props {}

function CreatePost({}: Props): ReactElement {
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<PostStatus>(
    PostStatus.DRAFT
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // User uploaded file

    // Send a request to upload to the S3 Bucket.
    try {
      let imagePath = null;
      if (file) {
        imagePath = uuidv4();
        await Storage.put(imagePath, file, {
          contentType: file.type, // contentType is optional
        });
      }

      const newPost = await DataStore.save(
        new Post({
          title: data.title,
          contents: data.content,
          status: data.status,
          image: imagePath,
        })
      );

      console.log("New post created successfully:", newPost);
      router.push(`/post/${newPost.id}`);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <Container maxWidth="md">
      <br />
      {/* Create a form where: */}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Grid container direction="column">
          {/* Title of the post */}
          <Grid item>
            <TextField
              variant="outlined"
              id="title"
              label="Post Title"
              type="text"
              fullWidth
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title.message : null}
              {...register("title", {
                required: { value: true, message: "Please enter a title." },
                maxLength: {
                  value: 120,
                  message:
                    "Please enter a title that is 120 characters or less.",
                },
              })}
            />
          </Grid>
          {/* Contents of the post */}
          <br />
          <Grid item>
            <TextField
              variant="outlined"
              id="content"
              label="Post Content"
              type="text"
              fullWidth
              multiline
              error={errors.content ? true : false}
              helperText={errors.content ? errors.content.message : null}
              {...register("content", {
                required: {
                  value: true,
                  message: "Please enter some content for your post.",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "Please make sure your content is 1000 characters or less.",
                },
              })}
            />
          </Grid>
          <br />
          <Grid>
            <InputLabel id="post-status-label">Post Status</InputLabel>
            <Select
              labelId="post-status-label"
              id="status"
              defaultValue={selectedStatus}
              label="Post Status"
              onChange={(e) => {
                setSelectedStatus(e.target.value as PostStatus);
              }}
              fullWidth
              error={errors.status ? true : false}
              {...register("status", {
                required: {
                  value: true,
                  message: "Please a Post status",
                },
              })}
            >
              <MenuItem value={PostStatus.DRAFT}>Draft</MenuItem>
              <MenuItem value={PostStatus.PUBLISHED}>Published</MenuItem>
            </Select>
          </Grid>
          {/* Optional Image of the post */}
          <br />
          <Grid item>
            <ImageDropzone file={file} setFile={setFile} />
          </Grid>
          <br />
          {/* Button to submit the form with those contents */}
          <Button variant="contained" type="submit">
            Create Post
          </Button>
        </Grid>
      </form>
    </Container>
  );
}

export default function CreatePostWithLayout() {
  return (
    <PrivatePage>
      <DefaultLayout>
        <CreatePost />
      </DefaultLayout>
    </PrivatePage>
  );
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...require(`../../../messages/shared/navigation/${locale}.json`),
      },
    },
  };
}
