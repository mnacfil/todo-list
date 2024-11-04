import { z } from "zod";

export const CommentSchema = z.object({
  message: z.string(),
});
