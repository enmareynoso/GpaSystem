import jwt_decode from "jwt-decode";

// Function to get the JWT token from a cookie
export function getJWTFromCookie() {
  const jwtCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("jwt="));

  return jwtCookie ? jwtCookie.split("=")[1] : null;
}

// Function to extract the user ID from a JWT token
export function getUserIdFromJWT(jwtToken) {
  try {
    const decodedToken = jwt_decode(jwtToken);
    return decodedToken.id;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
