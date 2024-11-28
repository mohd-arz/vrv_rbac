import { auth, permissions } from "@/atom/auth-atom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { checkPermission } from "@/lib/utils";
import UnAuthorized from "../unauthorized";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProtectedRoute({
  children,
  perm,
}: {
  children: React.ReactNode;
  perm: string;
}) {
  const authValue = useRecoilValue(auth);
  const setAuth = useSetRecoilState(auth);
  const [perms, setPerms] = useRecoilState(permissions);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function validateUser() {
      try {
        const res = await axios.get(`${BACKEND_URL}user/me`, {
          withCredentials: true,
        });

        if (res.status === 200 && res.data.user) {
          setAuth(res.data.user);
          const perms = res.data?.user?.role?.role_permissions.map(
            (perms: any) => {
              return perms?.permission?.slug;
            }
          );
          setPerms(perms);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    if (!authValue) {
      validateUser();
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [authValue, setAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  if (!checkPermission(authValue, perms, perm)) {
    return <UnAuthorized />;
  }
  return <>{children}</>;
}
