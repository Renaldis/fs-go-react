import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Api from "../../services/api";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const useUser = () => {
  return useQuery<User[], Error>({
    // Membuat queryKey
    queryKey: ["users"],
    // Membuat queryFn
    queryFn: async () => {
      // get token from cookies
      const token = Cookies.get("token");

      //   get users from api
      const response = await Api.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return data
      return response.data.data as User[];
    },
  });
};
