import {normalize} from 'normalizr'
import api from "../api";
import { BESTS_FETCHED, POPULARS_FETCHED, SUGGESTS_FETCHED, LANDING_FETCHED} from '../types'
import {bookSchema} from '../schemas'

//data.entities.books
const bestsFetched = data => ({type: BESTS_FETCHED, data})
const popularsFetched = data => ({ type: POPULARS_FETCHED, data })
const suggestsFetched = data => ({ type: SUGGESTS_FETCHED, data })
const landingFetched = data => ({ type: LANDING_FETCHED, data })

export const fetchBooks = data => () => api
  .books
  .fetchBooks(data)
  .then(books => books);

export const fetchDetails = data => () => api
  .books
  .fetchDetails(data)
  .then(details => details);

export const fetchSimilars = data => () => api
  .books
  .fetchSimilars(data)
  .then(books => books);

export const fetchScore = data => () => api
  .books
  .fetchScore(data)
  .then(books => books);

export const fetchReviews = data => () => api
  .books
  .fetchReviews(data)
  .then(books => books);

export const fetchSearch = data => () => api
  .books
  .fetchSearch(data)
  .then(books => books);

export const fetchBests = data => (dispatch) => api
  .books
  .fetchBests(data)
  .then(books => dispatch(bestsFetched(normalize(books, [bookSchema]))));

export const fetchPopulars = data => (dispatch) => api
  .books
  .fetchPopulars(data)
  .then(books => dispatch(popularsFetched(normalize(books, [bookSchema]))));

export const fetchShelf = data => (dispatch) => api
  .books
  .fetchShelf(data)
  .then(books => dispatch(suggestsFetched(normalize(books, [bookSchema]))));

export const fetchLanding = data => (dispatch) => api
  .books
  .fetchLanding(data)
  .then(books => dispatch(landingFetched(normalize(books, [bookSchema]))));