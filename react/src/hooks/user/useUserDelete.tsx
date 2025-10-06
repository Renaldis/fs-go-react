import { useMutation } from "@tanstack/react-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export const useUserDelete = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      // ambil token
      const token = Cookies.get("token");

      // delete user by id
      const response = await Api.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan response
      return response.data;
    },
  });
};
