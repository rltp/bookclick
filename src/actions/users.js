import api from "../api";
import { userLoggedIn } from "./auth";
import { USER_POST_REVIEW } from "../types";

export const userPostReview = () => ({
  type: USER_POST_REVIEW
});

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.JWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const postReview = books => dispatch =>
  api.user.postReview(books).then(user => {
    console.log(user)
    dispatch(userPostReview(user));
});
