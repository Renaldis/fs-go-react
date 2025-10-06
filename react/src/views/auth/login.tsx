import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/auth/useLogin";
import { AuthContext } from "../../context/AuthContext";
import { FormEvent, useContext, useState } from "react";
import Cookies from "js-cookie";

//interface for validation errors
interface ValidationErrors {
  [key: string]: string;
}

export default function Login() {
  //initialize navigate
  const navigate = useNavigate();

  //initialize useLogin
  const { mutate, isPending } = useLogin();

  //destruct auth context "setIsAuthenticated"
  const { setIsAuthenticated } = useContext(AuthContext)!;

  //define state
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //define state for errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Handle submit form
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Call the login mutation
    mutate(
      {
        username,
        password,
      },
      {
        onSuccess: (data: any) => {
          //set token to cookie
          Cookies.set("token", data.data.token);

          //set user to cookie
          Cookies.set(
            "user",
            JSON.stringify({
              id: data.data.id,
              name: data.data.name,
              username: data.data.username,
              email: data.data.email,
            })
          );

          //set isAuthenticated to true
          setIsAuthenticated(true);

          // Redirect to dashboard page
          navigate("/admin/dashboard");
        },
        onError: (error: any) => {
          //set errors to state "errors"
          setErrors(error.response.data.errors);
        },
      }
    );
  };
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-body">
            <h4 className="fw-bold text-center">LOGIN</h4>
            <hr />
            {errors.Error && (
              <div className="alert alert-danger mt-2 rounded-4">
                Username or Password is incorrect
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  placeholder="Username"
                />
                {errors.Username && (
                  <div className="alert alert-danger mt-2 rounded-4">
                    {errors.Username}
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                />
                {errors.Password && (
                  <div className="alert alert-danger mt-2 rounded-4">
                    {errors.Password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-4"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "LOGIN"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
