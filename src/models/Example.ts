import { z } from "zod";

export const Post = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  user: z.number().int(),
  content: z.string(),
});

export const PostCreate = Post.omit({ id: true });
