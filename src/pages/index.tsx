import React, { useEffect, useState } from "react";
import { PostStatus } from "../API";
import PostPreview from "../components/PostPreview";
import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { DefaultLayout, PrivatePage } from "../layouts";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { DataStore } from "@aws-amplify/datastore";
import { Post } from "../models";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const t = useTranslations("Index");
  const router = useRouter();

  useEffect(() => {
    const fetchPostsFromApi = async (): Promise<Post[]> => {
      const allPosts = await DataStore.query(Post);

      if (allPosts) {
        const publishedPosts = allPosts.filter(
          (post) => post.status !== PostStatus.DRAFT
        );

        setPosts(publishedPosts);
        return publishedPosts;
      } else {
        throw new Error(t("errors.loadPostError"));
      }
    };

    fetchPostsFromApi();
  }, []);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h2">{t("title")}</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Create Post">
            <Fab
              color="default"
              aria-label="create post"
              onClick={() => router.push("/post/create")}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>

      <Typography variant="body1">{t("description")}</Typography>

      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </>
  );
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  // TODO: Return a different file based on user's role
  return {
    props: {
      messages: {
        ...require(`../../messages/pages/index/${locale}.json`),
        ...require(`../../messages/shared/navigation/${locale}.json`),
      },
    },
  };
}

export default function HomeWithLayout() {
  return (
    <PrivatePage>
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    </PrivatePage>
  );
}
