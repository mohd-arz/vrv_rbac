import Breadcrumbs from "@/components/user/bread-crump";
import FormComponent from "@/components/product/create-form";

export default function CreatePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Product", href: "/products" },
          { label: "Add Product", href: "/products/create", active: true },
        ]}
      ></Breadcrumbs>
      <FormComponent></FormComponent>
    </main>
  );
}
