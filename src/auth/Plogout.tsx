import axios, { AxiosError } from "axios";
import { KeycloakInstance } from "keycloak-js";
import { keycloak_constant } from "./constant";
const { keycloak_server_url, realm, clientId, clientSecret } =
  keycloak_constant;

export default async function plogout(
  keycloak: KeycloakInstance
): Promise<void> {
  const url = `${keycloak_server_url}/realms/${realm}/protocol/openid-connect/logout`;
  const data = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: keycloak.refreshToken!,
  });
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    await axios.post(url, data.toString(), config);
    keycloak.clearToken();
    console.log("Logged out");
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error(axiosError.message);
    throw new Error("Logout failed");
  }
}
