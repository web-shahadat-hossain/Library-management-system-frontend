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
type BookFormData = z.infer<typeof bookSchema>;

export default function CreateBookPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    // defaultValues: {
    //   year: "2025",
    //   total: "1",
    //   available: "1",
    // },
  });

  const onSubmit = (data: BookFormData) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 shadow-lg  shadow-blue-500/10 py-4 border border-[#eeeeee] p-4">
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
          <Label htmlFor="genre" className="pb-1">
            Genre
          </Label>
          <Select
            onValueChange={(value) => setValue("genre", value)}
            defaultValue=""
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select subject" />
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
          <Input type="number" id="total" {...register("total")} />
          {errors.total && (
            <p className="text-sm text-red-500">{errors.total.message}</p>
          )}
        </div>
        <div>
          <Label className="mb-1" htmlFor="description">
            Description
          </Label>
          <Textarea id="description" {...register("description")} />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" className="bg-[#5854F5] text-white">
            Add Book
          </Button>
        </div>
      </form>
    </div>
  );
}
