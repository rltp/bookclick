import axios from "axios";
import { postReview } from "./actions/users";

export default {
	user: {
		login: credentials => axios
			.post("/auth/signin", { credentials })
			.then(res => res.data.user),
		signup: user => axios
			.post("/auth/signup", { user })
			.then(res => res.data.user),
		confirm: token => axios
			.post("/auth/confirmation", { token })
			.then(res => res.data.user),
		resetPasswordRequest: email => axios.post("/auth/reset_password_request", { email }),
		validateToken: token => axios.post("/auth/validate_token", { token }),
		resetPassword: data => axios.post("/auth/reset_password", { data }),
		postReview: data => axios.post("/me/rate", {rating: data})
	},
	books: {
		fetchSearch: data => {
			return axios
				.post("/books/search", { query: data })
				.then(res => res.data);
		},
		fetchBests: () => {
			return axios
				.get("/books/bests")
				.then(res => res.data);
		},
		fetchPopulars: () => {
			return axios
				.get("/books/populars")
				.then(res => res.data);
		},
		fetchScore: bookID => {
			return axios
				.get(`/books/avg/${bookID}`)
				.then(res => res.data[0]);
		},
		fetchReviews: bookID => {
			return axios
				.get(`/books/comments/${bookID}`)
				.then(res => res.data);
		},
		fetchDetails: bookID => {
			return axios
				.get(`/books/details/${bookID}`)
				.then(res => res.data);
		},
		fetchSimilars: bookID => {
			return axios
				.get(`/books/similarity/${bookID}`)
				.then(res => res.data);
		},
		fetchLanding: () => axios
			.get("/books/list/0/80")
			.then(res => res.data),
		
		fetchShelf: () => axios
			.get("/me/colab")
			.then(res => res.data)
	}
};
