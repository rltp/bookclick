import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../../messages/ConfirmEmailMessage";
import { Image } from "semantic-ui-react";
import { allBestsSelector, allPopularsSelector, allSuggestsSelector } from "../../../reducers/books";
import { fetchShelf, fetchBests, fetchPopulars } from '../../../actions/books';
import Shelf from '../../elements/Shelf/Shelf';
import BookModal from "../../contents/BookModal";

class HomePage extends React.Component {
	componentDidMount = () => this.onInit(this.props);

	onInit = (props) => {
		props.fetchShelf();
		props.fetchBests()
		props.fetchPopulars()
	}

	render() {
		const { isConfirmed, helloName } = this.props;
		return (
			<div className="ui container">
				{!isConfirmed && <ConfirmEmailMessage />}
				<h1 style={{fontWeight: "bold"}}>Bienvenue <a>{helloName}</a>
					<Link to="/settings">
						<Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' avatar floated='right'/>
					</Link>
				</h1>
				<section className="row">
					<span>
						<h2>Les mieux notés</h2>
					</span>
					<Shelf data={this.props.books.bests} mask={10}>
						<BookModal/>
					</Shelf>
				</section>
				<section className="row">
					<span>
						<h2>Les plus populaires</h2>
					</span>
					<Shelf data={this.props.books.populars} mask={10} >
						<BookModal/>
					</Shelf>
				</section>
				{this.props.books.suggests.length > 0 &&
				<section className="row">
					<span>
						<h2>Suggeré par notre I.A pour {helloName}</h2>
					</span>
					<Shelf data={this.props.books.suggests} mask={10} >
						<BookModal/>
					</Shelf>
				</section>
				}
			</div>
		);
	}

};

HomePage.propTypes = {
	isConfirmed: PropTypes.bool.isRequired,
	helloName: PropTypes.string.isRequired,
	fetchBests: PropTypes.array.isRequired,
	fetchPopulars: PropTypes.array.isRequired,
	fetchShelf: PropTypes.array.isRequired,
	books: PropTypes
		.arrayOf(PropTypes.shape({ 
			bests: PropTypes.array.isRequired,
			populars: PropTypes.array.isRequired,
			suggests: PropTypes.array.isRequired,
		}).isRequired)
		.isRequired
};

function mapStateToProps(state) {
	return {
		isConfirmed: state.user.confirmed,
		helloName: state.user.firstname,
		pseudo: state.user.pseudo,
		books: {
			bests: allBestsSelector(state),
			populars: allPopularsSelector(state),
			suggests: allSuggestsSelector(state)
		}
	};
}

export default connect(mapStateToProps, { fetchBests, fetchPopulars, fetchShelf })(HomePage);
