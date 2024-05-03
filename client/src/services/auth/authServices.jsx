import { useState } from "react";
import { useDispatch } from "react-redux";
import "./authServices.css";
import {
  handleLoginAsync,
  handleRegisterAsync,
} from "../../redux/features/auth/authAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../redux/features/auth/authSlice";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    const response = dispatch(handleRegisterAsync(email, password));
    response
      .then((response) => {
        console.log("register response", response);
        if (response.status === 201) {
          toast.success("Registered Successfully");
          dispatch(setUser({ email: email, password: password }));
          dispatch(handleLoginAsync(email, password));
          toast.success("Logged in Successfully");

          navigate("/");
        } else if (response.status === 400) {
          toast.error("Email already exits");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Auth;
