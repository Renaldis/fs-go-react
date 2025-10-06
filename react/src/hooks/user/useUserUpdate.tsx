import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Api from "../../services/api";

interface UserRequest {
  name: string;
  username: string;
  email: string;
  password?: string;
}

export const useUserUpdate = () => {
  return useMutation({
    // Mutation untuk update user
    mutationFn: async ({ id, data }: { id: number; data: UserRequest }) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      const response = await Api.post(`/api/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mengembalikan response data
      return response.data;
    },
  });
};
