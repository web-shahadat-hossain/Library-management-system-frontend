"use client";

import Card from "@/components/modules/home/Card";
import Loading from "@/components/modules/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetBooksQuery } from "@/redux/api/bookApi";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function HomePage() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isError } = useGetBooksQuery({
    page,
    limit,
  });

  if (isError) {
    return (
      <div className="max-w-[1000px] mx-auto px-2 md:px-5 py-10 text-center text-red-500">
        Error loading books. Please try again later.
      </div>
    );
  }

  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-[1000px] mx-auto px-2 md:px-5">
      <p className="text-sm text-muted-foreground mt-5 border-b pb-1 mb-3">
        <FontAwesomeIcon icon={faBook} /> {total} books
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {data?.data?.map((book) => (
              <Card key={book._id} book={book} />
            ))}
          </div>

          {total > limit && (
            <div className="flex flex-col md:flex-row items-center justify-between mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage(page - 1);
                      }}
                      className={
                        page <= 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNumber) => (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          isActive={page === pageNumber}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) setPage(page + 1);
                      }}
                      className={
                        page >= totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
