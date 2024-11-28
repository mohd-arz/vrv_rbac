import Table from "@/components/permission/table";
import { UserTableSkeleton } from "@/components/permission/table-skeleton";
import { Suspense } from "react";

export default function PermissionPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Permission</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search User..." /> */}
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
