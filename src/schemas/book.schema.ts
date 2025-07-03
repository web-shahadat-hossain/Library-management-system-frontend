import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "ISBN is required"),
  year: z.string().min(1, "Published year is required"),
  total: z.string().min(1, "Total copies required"),
  available: z.string().min(1, "Available copies required"),
  description: z.string().optional(),
});
