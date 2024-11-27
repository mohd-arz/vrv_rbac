import axios from "axios";
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type User = {
  id: number;
  name: string;
  username: string;
  created_at: Date;
  role: Role;
};

type Role = {
  id: number;
  name: string;
};

export default function () {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function getUsers() {
      const res = await axios.get(BACKEND_URL + "user/get-users", {
        withCredentials: true,
      });
      if (res.status == 200) {
        setUsers(res.data.users);
      }
    }
    getUsers();
  }, []);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {users?.map((user) => (
              <div
                key={user.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{user.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{user.username}</p>
                  </div>
                  <div> {user.role.name}</div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <EditPet id={user.id} /> */}
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
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Username
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At Date
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
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{user.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.username}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.role.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-0 pr-3">
                    <div className="flex gap-3">
                      {/* <EditPet id={user.id} /> */}
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
