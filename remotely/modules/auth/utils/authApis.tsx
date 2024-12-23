import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { userInfo } from "./types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserInfo = async (token: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/info`, {
      uid: token,
    });

    const userInfo = response.data;

    const user = {
      name: userInfo.data.name,
      role: userInfo.role,
      email: userInfo.data.email,
      uid: userInfo.data.uid,
      employeeRole: userInfo.data.role,
    };

    return user;
  } catch (error) {
    console.error("Failed to get user info", error);
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!userCredential) {
      throw new Error("Failed to login");
    }
    const token = await userCredential.user.getIdToken();

    console.log("Login successful", userCredential.user.uid, token);

    let userInfo = null;

    if (userCredential?.user?.uid) {
      try {
        userInfo = await getUserInfo(userCredential.user.uid);
        console.log("User info", userInfo);
      } catch (error) {
        console.error("Failed to get user info", error);
      }
    }

    const user: userInfo = {
      user: userCredential.user.uid,
      token,
      name: userInfo?.name,
      role: userInfo?.role,
      email: userInfo?.email,
      employeeRole: userInfo?.employeeRole,
    };

    if (user?.role === "employee") {
      logUser(user.user, "login");
    }

    return user as userInfo;
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const logUser = async (uid: string, action: string) => {
  try {
    await axios.post(`${API_URL}/api/auth/log`, {
      uid,
      action,
    });
  } catch (error) {
    console.error("Failed to log login", error);
  }
};
