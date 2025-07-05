import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "ISBN is required"),
  isbn: z.string().min(1, "Total copies required"),
  copies: z.number().min(1, "Available copies required"),
  description: z.string(),
});
