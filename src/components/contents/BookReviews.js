import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchReviews } from "../../actions/books";
import { postReview } from "../../actions/users";
import humanized_time_span from '../../utils/humanized_time_span';
import RatingForm from '../forms/ReviewForm'
import { Dimmer, Sidebar, Header, Loader, Grid, Divider, Rating, Icon,  Comment} from "semantic-ui-react";
import styled from 'styled-components';

const RatingFormModal = styled(RatingForm)`
    position: absolute !important;
    bottom: 0;
    left: 0;
    border-radius: 0;
`;

class BookReviews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            loading: true,
            reviews: []
        }
        this.onInit()
    }

    onInit(){
        this.props.fetchReviews(this.props.isbn).then(reviews => {
            this.setState({ ...this.state, loading: false, reviews: reviews });
        });
    }

    handleReview(rating) {
        this.props.postReview([rating])
        this.setState({ ...this.state, reviews: [...this.state.reviews, {...rating, pseudo: "Vous" , createdAt: Date.now()}] })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, open: nextProps.open });
        this.onInit();
    }

    render = () => {
        console.log("Sate of reviews:", this.state)
        return (
            <Dimmer active={this.state.open} onClickOutside={() => this.props.onClose()} page>
                <Sidebar
                    direction='right'
                    icon='labeled'
                    vertical
                    as={"div"}
                    className="bookReviews"
                    visible={true}
                    width='very wide'
                >
                    <Header as='h1' dividing>
                        Comments
                        <Icon name='close' size='large'
                            style={{ fontSize: 'inherit', float: 'right', cursor: 'pointer' }}
                            onClick={() => this.setState({ ...this.state, open: false })}
                        />
                    </Header>
                    {this.state.reviews.length > 0 && !this.state.loading &&
                    <Comment.Group>
                        {this.state.reviews.map(review => (
                        <Comment>
                            <Comment.Avatar as='a' src={`https://eu.ui-avatars.com/api/?name=${review.pseudo}`} />
                            <Comment.Content style={{padding: 0, minHeight: 0}}>
                                <Comment.Author>{review.pseudo}</Comment.Author>
                                <Comment.Metadata>
                                    <div style={{ padding: "10px 10px 0 0" }}><Rating defaultRating={Math.round(review.score)} maxRating={5} disabled /></div>
                                    <div>{humanized_time_span(review.createdAt)}</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <p>{review.comment}</p>
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>
                        ))}
                    </Comment.Group>
                    }
                    {this.state.reviews.length == 0 && this.state.loading && <Loader className="workaround" active size="huge"/>}
                    {this.state.reviews.length == 0 && !this.state.loading && <Header><h3>Aucun commentaires actuellement</h3></Header>}
                    {!this.state.loading && <RatingFormModal isbn={this.props.isbn} onRated={(review) => this.handleReview(review)} open={true} />}
                </Sidebar>
            </Dimmer>
        )
    }
}

BookReviews.propTypes = {
    isbn: PropTypes.string.isRequired
};
export default connect(null, { fetchReviews, postReview })(BookReviews);