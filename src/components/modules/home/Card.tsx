import { cn } from "@/lib/utils";
import { useDeleteBookMutation } from "@/redux/api/bookApi";
import type { IBooks } from "@/types";
import { DeleteConfirm } from "./DeleteConfirm";
import { toast } from "sonner";
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
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
            Edit
          </button>
          <DeleteConfirm onConfirm={() => deleteHandler(book._id)} />
        </div>
        <button className="px-4 py-1.5 text-sm bg-indigo-700 text-white rounded hover:bg-indigo-800 transition">
          Borrow
        </button>
      </div>
    </div>
  );
}

export default Card;
