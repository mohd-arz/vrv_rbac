import { Link } from "react-router";
import { PencilIcon } from "lucide-react";

export function EditPermission({ id }: { id: number }) {
  return (
    <Link
      to={{
        pathname: "" + id + "/edit",
      }}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
