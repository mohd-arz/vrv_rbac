import axios from "axios";
import { useEffect, useState } from "react";
import { EditPermission } from "./button";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Permission = {
  id: number;
  name: string;
  slug: string;
  type_id: number;
};

type RolePermission = {
  id: number;
  permission: Permission;
  permission_id: number;
  role_id: number;
};

type Role = {
  id: number;
  name: string;
  role_permissions: RolePermission[];
};

export default function () {
  const [roles, setRoles] = useState<Role[]>([]);
  useEffect(() => {
    async function getRoles() {
      const res = await axios.get(BACKEND_URL + "permission/get-roles", {
        withCredentials: true,
      });
      if (res.status == 200) {
        console.log(res.data.roles);
        setRoles(res.data.roles);
      }
    }
    getRoles();
  }, []);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {roles?.map((role) => (
              <div
                key={role.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{role.name}</p>
                    </div>
                  </div>
                  <div>
                    {" "}
                    {role.role_permissions.length > 0 &&
                      role.role_permissions
                        .map((perm) => {
                          return perm.permission.slug;
                        })
                        .join(", ")}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <EditPermission id={role.id} />
                    {/* <DeletePet user={user as userType} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Role Name
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  Permissions
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  Action
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {roles?.map((role) => (
                <tr
                  key={role.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{role.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {" "}
                    {role.role_permissions.length > 0 &&
                      role.role_permissions
                        .map((perm) => {
                          return perm.permission.slug;
                        })
                        .join(", ")}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-0 pr-3">
                    <div className="flex gap-3">
                      <EditPermission id={role.id} />
                      {/* <DeletePet user={user as userType}/> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
