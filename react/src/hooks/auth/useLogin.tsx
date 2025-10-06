import { useMutation } from "@tanstack/react-query";

import Api from "../../services/api";

interface LoginRequest {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    // mutation untuk login
    mutationFn: async (data: LoginRequest) => {
      // Menggunakan service API untuk Login
      const response = await Api.post("/api/login", data);

      // mengembalikan response data
      return response.data;
    },
  });
};
