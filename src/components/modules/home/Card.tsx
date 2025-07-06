import { cn } from "@/lib/utils";
import { useDeleteBookMutation } from "@/redux/api/bookApi";
import type { IBooks } from "@/types";
import { DeleteConfirm } from "./DeleteConfirm";
import { toast } from "sonner";
import { Link } from "react-router";
import { AddBorrow } from "../AddBorrow";
interface CardProps {
  book: IBooks;
}
function Card({ book }: CardProps) {
  const [deleteBook, { isError, isSuccess }] = useDeleteBookMutation();

  const deleteHandler = (id: string) => {
    deleteBook(id);
  };

  if (isSuccess) {
    toast.success("Book deleted successfully!!!");
  }
  if (isError) {
    toast.error("Failed to delete book!!!");
  }
  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-md p-4 space-y-3 border">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <span
          className={cn(
            "text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap",

            book.available
              ? " bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}
        >
          {book.available ? ` ${book.copies} Available` : "Unavailable"}
        </span>
      </div>

      <p className="text-sm text-gray-600">Author: {book.author}</p>
      <p className="text-sm text-gray-500">genre: {book.genre}</p>
      <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
      <p className="text-sm text-gray-700">{book.description}</p>

      <hr className="my-2" />

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Link
            to={`/edit-book/${book._id}`}
            className="px-3 py-2 text-sm bg-blue-100 block text-blue-700 rounded hover:bg-blue-200 transition"
          >
            Edit
          </Link>
          <DeleteConfirm onConfirm={() => deleteHandler(book._id)} />
        </div>
        <AddBorrow id={book._id} />
      </div>
    </div>
  );
}

export default Card;
