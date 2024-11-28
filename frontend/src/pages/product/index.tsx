import { auth, permissions } from "@/atom/auth-atom";
import { AddProduct } from "@/components/product/button";
import Table from "@/components/product/table";
import { UserTableSkeleton } from "@/components/product/table-skeleton";
import { checkPermission } from "@/lib/utils";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";

export default function ProductPage() {
  const user = useRecoilValue(auth);
  const perms = useRecoilValue(permissions);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Product</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {checkPermission(user, perms, "create-products") && <AddProduct />}
      </div>
      <Suspense fallback={<UserTableSkeleton />}>
        <Table />
      </Suspense>
      <div className="mt-5 flex w-full justify-end">
        {/* <Pagination totalPages={totalPages?totalPages : 1} /> */}
      </div>
    </div>
  );
}
