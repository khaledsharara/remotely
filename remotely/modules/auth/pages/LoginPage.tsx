import { useState } from "react";
import { handleLogin } from "../utils/authApis";
import { useDispatch } from "react-redux";
import { login } from "../../shared/utils/userSlice";
import { userInfo } from "../utils/types";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const verifyUser = async (): Promise<void> => {
    try {
      const userInfo: userInfo | undefined = await handleLogin(email, password);
      if (userInfo) {
        dispatch(
          login({
            user: userInfo.user,
            token: userInfo.token,
            name: userInfo.name,
            role: userInfo.role,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="bg-gradient-to-l from-primary to-70% w-full h-full flex flex-col gap-2 justify-center items-center">
        <div className="mb-8 text-title text-white">Log In</div>
        <input
          className="mt-1 w-[25%] px-3 py-2 border-0 border-b-2 border-primary bg-transparent"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="mt-1 w-[25%] px-3 py-2 border-0 border-b-2 border-primary bg-transparent focus:outline-none"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          className="mt-1 w-[25%] px-3 py-2 bg-primary text-white border border-0 rounded-xl active:bg-primary-dark active:shadow-lg"
          type="submit"
          onClick={() => verifyUser()}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
