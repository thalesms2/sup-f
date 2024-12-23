import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  description: z.string(),
  userCreatorId: z.number(),
  companyId: z.number(),
  status: z.string(),
  priority: z.number(),
  public: z.boolean(),
});

export type Task = z.infer<typeof taskSchema>;
