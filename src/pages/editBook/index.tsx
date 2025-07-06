"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";

import { bookSchema } from "@/schemas/book.schema";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/api/bookApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type BookFormData = z.infer<typeof bookSchema>;

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const { data } = useGetSingleBookQuery(id as string);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const genre = watch("genre");

  useEffect(() => {
    if (data) {
      const book = data;
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        copies: book.copies,
        description: book.description || "",
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: BookFormData) => {
    const apiData = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      isbn: formData.isbn,
      copies: Number(formData.copies),
      description: formData.description || "",
    };

    updateBook({ id: id as string, data: apiData })
      .unwrap()
      .then(() => {
        toast.success("Book updated successfully!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Failed to update book. Try again.");
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 shadow-lg shadow-blue-500/10 py-4 border border-[#eeeeee] p-4">
      <h2 className="text-2xl font-semibold">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="author">Author</Label>
          <Input id="author" {...register("author")} />
          {errors.author && (
            <p className="text-sm text-red-500">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="isbn">ISBN Code</Label>
          <Input id="isbn" {...register("isbn")} />
          {errors.isbn && (
            <p className="text-sm text-red-500">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="genre">Genre</Label>
          <Select
            value={genre}
            onValueChange={(value) => setValue("genre", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FICTION">Fiction</SelectItem>
              <SelectItem value="SCIENCE">Science</SelectItem>
              <SelectItem value="HISTORY">History</SelectItem>
              <SelectItem value="BIOGRAPHY">Biography</SelectItem>
              <SelectItem value="FANTASY">Fantasy</SelectItem>
            </SelectContent>
          </Select>
          {errors.genre && (
            <p className="text-sm text-red-500">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="copies">Total Copies</Label>
          <Input
            type="number"
            id="copies"
            {...register("copies", { valueAsNumber: true })}
          />
          {errors.copies && (
            <p className="text-sm text-red-500">{errors.copies.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="bg-[#5854F5] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Book"}
          </Button>
        </div>
      </form>
    </div>
  );
}
