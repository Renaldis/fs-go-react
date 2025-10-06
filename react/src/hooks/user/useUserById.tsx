import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Api from "../../services/api";

//interface User
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const useUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const token = Cookies.get("token");

      const response = await Api.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //return data
      return response.data.data as User;
    },
  });
};
