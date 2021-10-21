// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, Vote, Comment } = initSchema(schema);

export {
  Post,
  Vote,
  Comment
};