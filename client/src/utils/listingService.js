import tokenService from "./tokenService.js";
// const BASE_URL = "https://blogging-platform-365219.ew.r.appspot.com";
const BASE_URL = "http://localhost:8000/";

export const getListings = async () => {
  try {
    let res = await fetch(BASE_URL + "api/v1/");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getListing = async (listingID) => {
  try {
    let res = await fetch(BASE_URL + `api/v1/${listingID}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    let res = await fetch(BASE_URL + `users`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async (userID) => {
  try {
    let res = await fetch(BASE_URL + `users/details/${userID}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createAListing = async (listing) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(BASE_URL + `api/v1/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: listing,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeAListing = async (listing) => {
  try {
    console.log("listing was deleted");
    const token = tokenService.getToken();
    let res = await fetch(BASE_URL + `api/v1/${listing}/`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateAListing = async (listing, listingId) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(BASE_URL + `api/v1/${listingId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(listing),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
