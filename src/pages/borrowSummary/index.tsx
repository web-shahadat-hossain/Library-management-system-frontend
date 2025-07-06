import Loading from "@/components/modules/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowsQuery } from "@/redux/api/borrowApi";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SimpleTable() {
  const { data, isLoading } = useGetBorrowsQuery();

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6 py-10">
      <p className="text-sm text-muted-foreground mt-5 border-b pb-1 mb-3">
        <FontAwesomeIcon icon={faBook} /> {data?.data?.length} Borrows
      </p>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Quantity</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <Loading />
          ) : (
            <TableBody>
              {data?.data?.length ? (
                data?.data?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.book.title}</TableCell>
                    <TableCell>{row.book.isbn}</TableCell>
                    <TableCell className="capitalize">
                      {row.totalQuantity}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
