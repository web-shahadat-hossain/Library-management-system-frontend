import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { format } from "date-fns";
import { useCreateBorrowMutation } from "@/redux/api/borrowApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useEffect } from "react";

type IBorrow = {
  quantity: number;
  dueDate: Date;
  book: string;
};
export function AddBorrow({ id }: { id: string }) {
  const form = useForm<IBorrow>({
    defaultValues: {
      quantity: 1,
      book: id,
      dueDate: undefined,
    },
  });
  const navigate = useNavigate();
  const [createBorrow, { isSuccess, isError, error, isLoading }] =
    useCreateBorrowMutation();

  const onSubmitHandler: SubmitHandler<IBorrow> = (data) => {
    data.quantity = Number(data.quantity);
    const apiData = { ...data, book: id };
    createBorrow(apiData);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Borrow has been created successfully!");
      navigate("/borrow-summary");
    }
    if (isError) {
      if ("data" in error) {
        toast.error((error.data as any)?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [isSuccess, isError, error, navigate]);
  if (isError) {
    if ("data" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error.data as any)?.message || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-[#432DD7] cursor-pointer">Borrow Book</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription>
              Confirm to borrow this book. Once borrowed.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)}>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity </FormLabel>
                    <FormControl>
                      <Input
                        min={1}
                        type="number"
                        {...field}
                        value={Number(field.value) || 1}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <br />

              <FormField
                control={form.control}
                name="dueDate"
                rules={{ required: "Due date is required" }}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              const formatted = format(date, "yyyy-MM-dd");
                              field.onChange(formatted);
                            }
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-3">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && " Submitting..."}
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
