import { auth } from "@/atom/auth-atom";
import { PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const authValue = useRecoilValue(auth);
  const setAuth = useSetRecoilState(auth);
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

  return <>{children}</>;
}
