import { z } from "zod";

export const TaskOverviewFormSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  priority: z.string(),
});
