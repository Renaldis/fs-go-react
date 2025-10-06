import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Api from "../../services/api";

interface UserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const useUserCreate = () => {
  return useMutation({
    // mutation untuk create user
    mutationFn: async (data: UserRequest) => {
      // ambil token
      const token = Cookies.get("token");

      //menggunakan service API untuk register
      const response = await Api.post("/api/users", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //mengembalikan response data
      return response.data;
    },
  });
};
