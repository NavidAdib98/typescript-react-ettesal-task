import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://account.videocake.ir:40443/auth",
  realm: "ettesal",
  clientId: "webapp-test",
});
keycloak.clientSecret = "cfccf6b4-66c0-428d-a445-a214740f71d0";

export default keycloak;
