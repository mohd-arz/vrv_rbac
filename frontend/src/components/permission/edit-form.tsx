import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useNavigate, useParams } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Toaster } from "../ui/toaster";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "../ui/button";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// //Create Form Schema

const permissionZod = z.object({
  permission: z.number().array(),
});

type permissiontype = z.infer<typeof permissionZod>;

const permissionDefaultValues = {
  permission: [],
};

type permisionTypeT = {
  id: number;
  type: string;
  permissions: PermissionT[];
};

type PermissionT = {
  id: number;
  name: string;
  slug: string;
  type_id: number;
};

export default function FormComponent(): JSX.Element {
  const params = useParams();
  const [permissionTypes, setPermissionTypes] = useState<permisionTypeT[]>([]);
  const [existingPerms, setExistingPerms] = useState<number[]>([]);
  const [selectedPerms, setSelectedPerms] = useState<number[]>([]);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();
  const formState = useForm<permissiontype>({
    resolver: zodResolver(permissionZod),
    defaultValues: permissionDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof permissionZod>) {
    try {
      setIsPending(true);
      const res = await axios.post(
        BACKEND_URL + "permission/set-role-permission/" + params.id,
        values,
        {
          withCredentials: true,
        }
      );
      setIsPending(false);
      if (res.status == 200) {
        toast({
          description: res.data.message,
        });

        setTimeout(() => {
          navigate("/permission");
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
      const res = await axios.get(
        BACKEND_URL + "permission/get-permission-types",
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        console.log(res.data.permissionTypes);
        setPermissionTypes(res.data.permissionTypes);
      }
    }

    async function getExistingPerms() {
      const res = await axios.get(
        BACKEND_URL + "permission/get-existing-perms/" + params.id,
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        console.log(res.data.permissionTypes);
        setExistingPerms(res.data.permissionIds);
        setSelectedPerms(res.data.permissionIds);
      }
    }
    getRoles();
    getExistingPerms();
  }, []);

  return (
    <>
      <Form {...formState}>
        <form onSubmit={formState.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name */}
          {permissionTypes.length > 0 &&
            permissionTypes.map((role) => {
              return (
                <>
                  <label htmlFor="">{role.type}</label>
                  <div
                    style={{ margin: "0px" }}
                    className="mx-0 my-0 flex gap-4 items-center"
                  >
                    {role.permissions.length > 0 &&
                      role.permissions.map((perm) => {
                        return (
                          <FormField
                            control={formState.control}
                            name="permission"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{perm.name}</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    value={perm.id}
                                    checked={selectedPerms.includes(perm.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedPerms([
                                          ...selectedPerms,
                                          perm.id,
                                        ]);
                                        field.onChange([
                                          ...selectedPerms,
                                          perm.id,
                                        ]);
                                      } else {
                                        const updatedPerms =
                                          selectedPerms.filter(
                                            (id) => id !== perm.id
                                          );
                                        setSelectedPerms(updatedPerms);
                                        field.onChange(updatedPerms);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        );
                      })}
                  </div>
                </>
              );
            })}
          {/* Image */}

          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
