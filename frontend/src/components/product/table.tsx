import axios from "axios";
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Product = {
  id: number;
  name: string;
  description: string;
  status: boolean;
  user: User;
};

type User = {
  id: number;
  name: string;
};

export default function () {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function getRoles() {
      const res = await axios.get(BACKEND_URL + "product/", {
        withCredentials: true,
      });
      if (res.status == 200) {
        console.log(res.data.products);
        setProducts(res.data.products);
      }
    }
    getRoles();
  }, []);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{product.name}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{product.user.name}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{product.status == true ? "Active" : "In Active"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    {/* <EditPermission id={product.id} /> */}
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
                  Description
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  Created By
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.map((product) => (
                <tr
                  key={product.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{product.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{product.description}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{product.user.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{product.status == true ? "Active" : "In Active"}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-0 pr-3">
                    <div className="flex gap-3">
                      {/* <EditPermission id={product.id} /> */}
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
