import {defineSchema, defineTable} from 'convex/server';
import {v} from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    username: v.string() && v.null(),
    email: v.string(),
    password: v.string(),
  }),
  profiles: defineTable({
    body: v.string(),
    authorId: v.string(),
    format: v.string(),
  }),
  covers: defineTable({
    body: v.string(),
    authorId: v.string(),
    format: v.string(),
  }),
  posts: defineTable({
    title: v.string(),
    description: v.string(),
    article: v.string(),
    storageId: v.string(),
    authorId: v.string(),
    format: v.string(),
  }),
  reactions: defineTable({
    postId: v.string(),
    userId: v.string(),
  }),
  messages: defineTable({
    chat: v.string(),
    senderId: v.string(),
    receiverId: v.string(),
    inboxId: v.string(),
  }),
  inbox: defineTable({
    last_chat: v.string() || v.null(),
    senderId: v.string(),
    receiverId: v.string(),
  }),
});
