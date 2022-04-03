import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;

const api = axios.create({
  withCredentials: true
});

/**
 * A service to find all the tuits which are liked by the user which uses get request to fetch the response.
 * @param userId user id
 * @returns {Promise<AxiosResponse<any>>} tuits object
 */
export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

/**
 * A service to find all the users that liked the tuit which uses get request to fetch the response.
 * @param tid tuit id
 * @returns {Promise<AxiosResponse<any>>} users object
 */
export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);


/**
 * A service to like the tuit by a particular user  which uses put to update the database.
 * @param uid user id
 * @param tid tuit id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userTogglesTuitUnlikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/unlikes/${tid}`)
        .then(response => response.data);
/**
 * A service to dislike the tuit by a user.
 * @param uid user id
 * @param tid tuit id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data).catch(e => {
          console.log("here: " + e);
    });

/**
 * A service to find all the tuits which are disliked by the user.
 * @param userId user id
 * @returns {Promise<AxiosResponse<any>>} tuits object
 */
export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

