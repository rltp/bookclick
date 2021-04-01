import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBookForm from "../../forms/SearchBookForm";
import { Header } from "semantic-ui-react";
import { fetchDetails } from "../../../actions/books";
import BookModal from "../../contents/BookModal";

class NewBookPage extends Component {
  state = {
    book: null
  };

  onBookSelect = book => {
    this.setState({ book });
    this.props
      .fetchDetails(book.id)
      .then(pages => this.setState({ book: { ...book, pages } }));
  };

  submit = book => console.log("submitted");

  render() {
    return (
      <div className="ui container">
        <Header>
          <h1>Recherche</h1>
        </Header>
        <SearchBookForm>
          <BookModal/>
        </SearchBookForm>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchDetails }
)(NewBookPage);
