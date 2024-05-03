import axios from "axios";

export const handleRegister = async (email, password) => {
  try {
    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const handleLogin = async (email, password) => {
  try {
    const userData = {
      email,
      password,
    };
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    console.log("Login Data" , data)
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
