import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Toaster } from "../ui/toaster";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const productCreate = z.object({
  name: z.string(),
  description: z.string().optional(),
  status: z.boolean().optional(),
});

export type productCreateType = z.infer<typeof productCreate>;

export const userDefaultValues = {
  name: undefined,
  description: undefined,
  status: undefined,
};

export default function FormComponent(): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const formState = useForm<productCreateType>({
    resolver: zodResolver(productCreate),
    defaultValues: userDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof productCreate>) {
    try {
      setIsPending(true);
      const res = await axios.post(BACKEND_URL + "product/create", values, {
        withCredentials: true,
      });
      setIsPending(false);
      if (res.status == 200) {
        toast({
          description: res.data.message,
        });

        setTimeout(() => {
          navigate("/products");
        }, 1000);
      }
    } catch (err: any) {
      setIsPending(false);
      const response = err.response;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }
  return (
    <>
      <Form {...formState}>
        <form onSubmit={formState.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name */}
          <FormField
            control={formState.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Image */}
          {/* Type */}
          <FormField
            control={formState.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Sex */}
          <FormField
            control={formState.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={"1"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"1"}>Active</SelectItem>
                    <SelectItem value={"0"}>In Active</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Type */}
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
