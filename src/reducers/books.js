import {createSelector} from "reselect";
import { BESTS_FETCHED, POPULARS_FETCHED, SUGGESTS_FETCHED, LANDING_FETCHED } from '../types'

const initialState = {
  bests:{},
  populars:{},
  suggests:{},
  landing:{}
}
export default function books(state = initialState, action = {}) {
  console.log(state, action)
  switch (action.type) {
    case BESTS_FETCHED:
      return {
        ...state,
        bests : { ...action.data.entities.books }
      }
    case POPULARS_FETCHED:
      return {
        ...state,
        populars : { ...action.data.entities.books }
      }
    case SUGGESTS_FETCHED:
      return {
        ...state,
        suggests: { ...action.data.entities.books }
      }
    case LANDING_FETCHED:
      return {
        ...state,
        landing: { ...action.data.entities.books }
      }
    default:
      return state;
  }
}

//SELECTORS

export const bestsSelector = state => state.books.bests;
export const popularsSelector = state => state.books.populars;
export const suggestsSelector = state => state.books.suggests;
export const landingSelector = state => state.books.landing;

export const allBestsSelector = createSelector(bestsSelector, booksHash => Object.values(booksHash));
export const allPopularsSelector = createSelector(popularsSelector, booksHash => Object.values(booksHash));
export const allSuggestsSelector = createSelector(suggestsSelector, booksHash => Object.values(booksHash));
export const allLandingSelector = createSelector(landingSelector, booksHash => Object.values(booksHash));