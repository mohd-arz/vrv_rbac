import { AddUser } from "@/components/user/button";
import Table from "@/components/user/table";
import { PetsTableSkeleton } from "@/components/user/table-skeleton";
import { Suspense } from "react";

export default function UserPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Users</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search User..." /> */}
        <AddUser />
      </div>
      <Suspense fallback={<PetsTableSkeleton />}>
        <Table />
      </Suspense>
      <div className="mt-5 flex w-full justify-end">
        {/* <Pagination totalPages={totalPages?totalPages : 1} /> */}
      </div>
    </div>
  );
}
