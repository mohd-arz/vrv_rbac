import Breadcrumbs from "@/components/user/bread-crump";
import FormComponent from "@/components/user/create-form";

export default function CreatePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/users" },
          { label: "Add User", href: "/users/create", active: true },
        ]}
      ></Breadcrumbs>
      <FormComponent></FormComponent>
    </main>
  );
}
