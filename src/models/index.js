// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PostStatus = {
  "DRAFT": "DRAFT",
  "PUBLISHED": "PUBLISHED"
};

const { Post, Vote, Comment } = initSchema(schema);

export {
  Post,
  Vote,
  Comment,
  PostStatus
};