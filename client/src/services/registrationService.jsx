import http from "./httpServices";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
    role:user.role
  });
}

export function getUsers() {
  return http.get(apiEndpoint);
}

