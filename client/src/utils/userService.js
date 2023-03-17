import tokenService from "./tokenService";

const BASE_URL = "http://localhost:8000/"; // Note: Once deployed this should be updated.

function signup(user) {
  return fetch(BASE_URL + "signup/", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log(res.json());
      if (res.ok) return res.json();
      throw new Error("Email already taken!");
    })

    .then(({ token }) => tokenService.setToken(token));
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + "login/", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

export const updateProfileInfo = async (profileEdit, userID) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/users/${userID}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(profileEdit),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const exports = {
  signup,
  getUser,
  logout,
  login,
};

export default exports;
