import apiClient from "@/config/api-client";
import IUser from "@/types/entities/user.entity";

const endpoints = {
  login: "/login",
  signup: "/signup",
};
export async function loginRequest(email: string, password: string) {
  const { data } = await apiClient<IUser>({
    method: "POST",
    url: endpoints.login,
    data: {
      email,
      password,
    },
  });
  return data;
}

export async function signupRequest(
  name: string,
  email: string,
  password: string
) {
  const { data } = await apiClient<IUser>({
    method: "POST",
    url: endpoints.signup,
    data: {
      name,
      email,
      password,
    },
  });
  return data;
}
