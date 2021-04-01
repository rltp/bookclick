import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Progress } from "semantic-ui-react";
import {postReview} from "../../../actions/users";
import SearchBookForm from "../../forms/SearchBookForm";
import RatingForm from "../../forms/ReviewForm";
import ClickOutSide from "../../elements/ClickOutSide/ClickOutSide";

class RatingPage extends Component{
  constructor(props){
    super(props);
    this.state={
      books:[],
      nextStep: false
    }
  }

  handlePostReviews(){
    if (this.state.books.length >= 5){
      this.props.postReview(this.state.books)
      this.setState({ ...this.state, nextStep: true })
    }
  }

  handleReview(rating){
    console.log("Rating",rating)
    if (!this.state.books.some((book) =>  book.book_id === rating.book_id))
      this.setState({ ...this.state, books: [...this.state.books, rating] }, this.handlePostReviews)
  }

  render(){
    console.log(this.state)
    return (
      <Fragment>
        <div className="ui container">
          <h1>Avis</h1>
          <h3>Donnez nous un avis sur 5 livres que vous avez lu pour que notre I.A vous connaise mieux</h3>
          <Progress value={this.state.books.length} total='5' color='blue' progress='ratio' />
          <SearchBookForm>
            <ClickOutSide>
              <RatingForm onRated={(rating) => this.handleReview(rating)} />
            </ClickOutSide>            
          </SearchBookForm>
        </div>
        {this.state.nextStep && <Redirect to="/signup/step/3"/>}
      </Fragment>
    );
  }
}

export default connect(
  null,
  {postReview}
)(RatingPage);
