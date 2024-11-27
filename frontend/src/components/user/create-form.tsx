import { useEffect, useState } from "react";
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

// //Create Form Schema
export const userRegister = z
  .object({
    name: z.string(),
    username: z.string(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
    role_id: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export type userRegisterType = z.infer<typeof userRegister>;

type Roles = {
  id: number;
  name: string;
};

export const userDefaultValues = {
  name: undefined,
  username: undefined,
  password: undefined,
  confirm_password: undefined,
  role_id: undefined,
};

export default function FormComponent(): JSX.Element {
  const [roles, setRoles] = useState<Roles[]>([]);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const formState = useForm<userRegisterType>({
    resolver: zodResolver(userRegister),
    defaultValues: userDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof userRegister>) {
    try {
      setIsPending(true);
      const res = await axios.post(BACKEND_URL + "user/register", values, {
        withCredentials: true,
      });
      setIsPending(false);
      if (res.status == 200) {
        toast({
          description: res.data.message,
        });

        setTimeout(() => {
          navigate("/users");
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

  useEffect(() => {
    async function getRoles() {
      const res = await axios.get(BACKEND_URL + "user/get-roles", {
        withCredentials: true,
      });
      if (res.status == 200) {
        setRoles(res.data.roles);
      }
    }
    getRoles();
  }, []);

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
          <FormField
            control={formState.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Sex */}
          <FormField
            control={formState.control}
            name="role_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.length > 0 &&
                      roles.map((role) => {
                        return (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Type */}
          <FormField
            control={formState.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Type */}
          <FormField
            control={formState.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Pasword</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
