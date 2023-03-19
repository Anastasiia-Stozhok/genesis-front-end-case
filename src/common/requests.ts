import { axiosInstance } from "./axiosInstance";
import { apiUrl } from "./constants";

export async function getToken() {
  try {
    return (
      await axiosInstance.get<{ token: string }>(
        `${apiUrl}auth/anonymous?platform=subscriptions`
      )
    ).data.token;
  } catch {
    // add error handling
    return;
  }
}
