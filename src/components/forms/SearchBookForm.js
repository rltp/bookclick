import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Search } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchSearch } from "../../actions/books.js";
import Shelf from '../elements/Shelf/Shelf';
import BookModal from "../contents/BookModal";
import { query } from "express-validator";
import '../../utils/chunk';

class SearchBookForm extends React.Component {
  state = {
    query: "",
    books: []
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data.value
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  onChange = (e, data) => {
    this.setState({
      query: data.value
    });
  };

  fetchOptions = () => {
    if (!this.state.query && this.state.query.length > 3 ) return;

    this.setState({
      loading: true
    });

    this.props.fetchSearch(this.state.query).then(books => {
      if (!books) return;  

      this.setState({
        loading: false,
        books: books.chunk(6),
      });
    });
  };

  render() {  
    console.log(this.state) 
    return (
      <Fragment>
        <Form>
          <Search
            fluid
            input={{ fluid: true }}
            onSearchChange={this.onSearchChange} 
            loading={this.state.loading}
            placeholder='Recherche un livre...'
            value={this.state.query} 
            onChange={this.onChange}
            showNoResults={false}
          />
        </Form>
        {this.state.books && this.state.query.length > 3 && this.state.books.map( shielf => (
          <Shelf data={shielf} mask={6}>{this.props.children}</Shelf>
        ))}
        {!this.state.books.length && this.state.query.length > 3 &&
          <h3>Aucun livre trouvé.</h3>
        }
      </Fragment>
    );
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchSearch }
)(SearchBookForm);
