import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export const useLogout = () => {
  // Ambil setIsAuthenticated dari context
  const authContext = useContext(AuthContext);

  // Gunakan null assertion karena kita yakin AuthContext akan selalu tersedia
  const { setIsAuthenticated } = authContext!;

  // untuk redirect ke halaman login
  const navigate = useNavigate();

  //   fungsi logout
  const logout = (): void => {
    // Hapus tooken
    Cookies.remove("token");
    Cookies.remove("user");

    setIsAuthenticated(false);

    navigate("/login");
  };

  return logout;
};
