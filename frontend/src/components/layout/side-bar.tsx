import { IoIosPower } from "react-icons/io";
import NavLinks from "./nav-link";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SideNav() {
  const navigate = useNavigate();
  async function logOut() {
    try {
      const res = await axios.get(BACKEND_URL + "user/logout", {
        withCredentials: true,
      });
      if (res.status == 200) {
        toast({ description: "Logout Successfully." });
        setTimeout(() => {
          navigate("/signin", { replace: true });
        }, 1000);
      }
      console.log(res);
    } catch (err: any) {
      const response = err.response;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }
  return (
    <div className="flex min-h-screen flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        to={{
          pathname: "/",
        }}
      >
        <div className="w-32 text-white md:w-40">
          {/* <AcmeLogo /> */}
          Logo
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button
          onClick={logOut}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <IoIosPower className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
