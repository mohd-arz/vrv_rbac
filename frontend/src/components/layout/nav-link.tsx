import { IoHomeOutline } from "react-icons/io5";

import clsx from "clsx";
import { Link, useLocation } from "react-router";
import { FaRegUser } from "react-icons/fa";

const links = [
  { name: "Home", href: "/", icon: IoHomeOutline },
  {
    name: "User",
    href: "/users",
    icon: FaRegUser,
  },
  // { name: 'Category', href: '/dashboard/category', icon: TbCategoryMinus },
];

export default function NavLinks() {
  const location = useLocation();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={{
              pathname: link.href,
            }}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`,
              {
                "bg-sky-100 text-blue-600": link.href === location.pathname,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
