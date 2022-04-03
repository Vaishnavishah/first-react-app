import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;

const api = axios.create({
  withCredentials: true
});

export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

// export const userLikesTuit = (uid, tid) =>
//     api.put(`${USERS_API}/${uid}/likes/${tid}`)
//         .then(response => response.data);

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userTogglesTuitUnlikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/unlikes/${tid}`)
        .then(response => response.data);

export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data).catch(e => {
          console.log("here: " + e);
    });

export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

