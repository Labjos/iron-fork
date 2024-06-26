import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/auth.context";
import { useAlert } from "../contexts/alert.context";
import PageLayout from "../components/layouts/page-layout/page-layout";

function Login() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { doLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      await doLogin(data);

      navigate("/");
    } catch (err) {
      showAlert("invalid credentials");
    }
  }

  return (
    <PageLayout>
      <form data-testid="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required
            id="email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password")}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </PageLayout>
  );
}

export default Login;
