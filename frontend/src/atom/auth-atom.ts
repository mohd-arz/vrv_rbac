import { atom } from "recoil";

type Role = {
  id: number;
  name: string;
};
type User = {
  name: string;
  username: string;
  role_id: number;
  role: Role;
};

const auth = atom({
  key: "auth",
  default: <User | null>null,
});

export { auth };
