"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema } from "@/schemas/book.schema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCreateBookMutation } from "@/redux/api/bookApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

type BookFormData = z.infer<typeof bookSchema>;

export default function CreateBookPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 1,
      description: "",
    },
  });
  const navigate = useNavigate();
  const [CreateBookPage, { isSuccess, isError, isLoading }] =
    useCreateBookMutation();

  const onSubmit = (data: BookFormData) => {
    const apiData = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      isbn: data.isbn,
      copies: Number(data.copies),
      description: data.description || "",
      available: true,
    };

    CreateBookPage(apiData);
  };

  if (isSuccess) {
    toast.success("Book has been created successfully!");
    navigate("/");
  }
  if (isError) {
    toast.error("Failed to create book. Please try again.");
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 shadow-lg shadow-blue-500/10 py-4 border border-[#eeeeee] p-4">
      <h2 className="text-2xl font-semibold">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title" className="pb-1">
            Title
          </Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="author" className="pb-1">
            Author
          </Label>
          <Input id="author" {...register("author")} />
          {errors.author && (
            <p className="text-sm text-red-500">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="isbn" className="pb-1">
            ISBN Code
          </Label>
          <Input id="isbn" {...register("isbn")} />
          {errors.isbn && (
            <p className="text-sm text-red-500">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="genre" className="pb-1">
            Genre
          </Label>
          <Select
            onValueChange={(value) => setValue("genre", value)}
            defaultValue=""
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
          <Label htmlFor="total" className="pb-1">
            Total Copies
          </Label>
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
          <Label className="mb-1" htmlFor="description">
            Description
          </Label>
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
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Add Book"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
