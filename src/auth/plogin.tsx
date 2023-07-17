import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
import { KeycloakInstance } from "keycloak-js";
import { keycloak_constant } from "./constant";
const { keycloak_server_url, realm, clientId, clientSecret } =
  keycloak_constant;

export default async function login(
  keycloak: KeycloakInstance,
  username: string,
  password: string
): Promise<void> {
  const url = `${keycloak_server_url}/realms/${realm}/protocol/openid-connect/token`;

  const data = new URLSearchParams({
    grant_type: "password",
    client_id: clientId,
    username: username,
    password: password,
  });
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(url, data.toString(), config);
    const token = response.data.access_token;
    keycloak
      .updateToken(60) // Refresh token 60 seconds before expiration
      .then((refreshed) => {
        if (refreshed) {
          console.log("Token refreshed:", keycloak.token);
        } else {
          console.log(
            "Token not refreshed, valid until:",
            keycloak.tokenParsed?.exp
          );
        }
      })
      .catch((error) => {
        console.error("Failed to refresh token:", error);
      });
    keycloak.token = token;
    console.log(keycloak.authenticated);
    const tokenData = jwt_decode(token) as Record<string, unknown>;
    keycloak.tokenParsed = tokenData;
    console.log("PLOGIN-> access token ->", token);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error(axiosError.message);
    throw new Error("Login failed");
  }
}
