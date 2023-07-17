import Keycloak from "keycloak-js";
import { keycloak_constant } from "./constant";
const { keycloak_server_url, realm, clientId, clientSecret } =
  keycloak_constant;

const keycloak = new Keycloak({
  url: keycloak_server_url,
  realm: realm,
  clientId: clientId,
});
keycloak.clientSecret = clientSecret;

export default keycloak;
