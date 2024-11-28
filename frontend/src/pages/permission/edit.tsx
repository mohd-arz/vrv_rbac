import Breadcrumbs from "@/components/user/bread-crump";
import FormComponent from "@/components/permission/edit-form";
import { useParams } from "react-router";

export default function EditPage() {
  const params = useParams();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Permission", href: "/permission" },
          {
            label: "Edit Permission",
            href: "/permission/" + params.id + "/edit",
            active: true,
          },
        ]}
      ></Breadcrumbs>
      <FormComponent></FormComponent>
    </main>
  );
}
