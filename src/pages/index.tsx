import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listPosts } from "../graphql/queries";
import { ListPostsQuery, Post } from "../API";
import PostPreview from "../components/PostPreview";
import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import DefaultLayout from "../layouts/default";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const t = useTranslations("Index");
  const router = useRouter();

  useEffect(() => {
    const fetchPostsFromApi = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        errors: any[];
      };

      if (allPosts.data) {
        setPosts(allPosts.data.listPosts.items as Post[]);
        return allPosts.data.listPosts.items as Post[];
      } else {
        throw new Error("Could not get posts");
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

// pages/index.js
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
    <DefaultLayout>
      <Home />
    </DefaultLayout>
  );
}
