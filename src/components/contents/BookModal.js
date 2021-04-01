import React, { Component, useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Modal, Loader, Image, Rating, Divider, Header, Icon, Grid, Button, Label, Sidebar, Menu } from "semantic-ui-react";
import { fetchDetails, fetchScore, fetchSimilars } from "../../actions/books";
import Shelf from "../elements/Shelf/Shelf";
import BookReviews from "./BookReviews";
import BookModalComponent from './BookModal';
import Poster from "../elements/Poster/Poster"
import '../../utils/chunk';

const RatingLoader = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const timer = setInterval(() =>  { setCount((count + 1) % 6)}, 500)
        return () => clearInterval(timer)
    })

    return (
        <React.Fragment>
            <Rating rating={count} maxRating={5} disabled />
            (Chargement {'.'.repeat(count / 2)})
        </React.Fragment>
    )
}
class BookModal extends Component{

    constructor(props) {
        super(props);
        this.state = { open: true, review: false, book: { details: {} }, isbn: props.isbn }
        this.init(props.isbn);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: false, review: false, book: { details: {} }, isbn: nextProps.isbn });
        this.init(nextProps.isbn);
    }

    init(isbn) {
        this.props.fetchDetails(isbn).then(details => {
            this.setState({ ...this.state, open: true, book: { ...this.state.book, details: { ...details } }});
        });

        this.props.fetchScore(isbn).then(score => {
            this.setState({ ...this.state, book: { ...this.state.book,  ...score } });
        });

        this.props.fetchSimilars(isbn).then(books => {
            this.setState({ ...this.state, book:{ ...this.state.book, similars: books } });
        });

        console.log("State of modal init:", this.state)
    }

    handleReview(){
        this.setState({ ...this.state, review: true })
    }

    render = () => {
        console.log("State of modal :", this.state)
        return (
            <Fragment>
            <Modal
                onClose={() => this.setState({ ...this.state, review: false, open: false, book: { details: {} }})}
                onOpen={() => this.setState({ ...this.state, open: true })}
                open={this.state.open}
                size='small'
            >
                { this.state.open &&
                <Fragment>
                    <Modal.Content image style={{minHeight: '0'}}>
        
                        <Poster url={this.state.book.details.image_url} activate={false}/>

                        <Modal.Description style={{marginLeft: '25px'}}>
                            <h1>{this.state.book.details.title}</h1>
                            <h3>{this.state.book.details.authors}</h3>
                            <p>ISBN : {this.state.book.details.isbn}</p>
                            <p>Date de publication : {this.state.book.details.publication_year}</p>
                            <span style={{ display: "flex", alignItems: "center" }}>
                                {this.state.book.score &&
                                    <React.Fragment>
                                        <Rating defaultRating={Math.round(this.state.book.score)} maxRating={5} disabled />
                                        ({Math.round(this.state.book.score)} / 5)
                                    </React.Fragment>
                                }
                                {!this.state.book.score &&
                                    <RatingLoader />
                                }
                            </span>
                        </Modal.Description>
                    </Modal.Content>

                    <span className="control">
                        <Button basic color='black' content='Ajouter à la Librairie' />
                        <Button as='div' labelPosition='right' onClick={() => this.handleReview()}>
                            <Button color='black'>
                                <Icon name='star' />
                                Avis
                            </Button>
                            <Label as='a' basic color='black' pointing='left'>
                                {!this.state.book.count &&
                                    <Loader className="workaround" active inline size='tiny' />
                                }
                                {this.state.book.count}
                            </Label>
                        </Button>
                        <Button primary>Acheter</Button>
                    </span>

                    <Modal.Content scrolling>
                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='zip' />
                                Titres similaires
                            </Header>
                        </Divider>

                        {this.state.book.similars && this.state.book.similars.chunk(4).map( books =>(
                            <Shelf data={books} mask={4} draggable={false}>
                                <BookModalComponent/>
                            </Shelf>
                        ))}

                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='tag' />
                                Tags
                            </Header>
                        </Divider>

                        <Grid columns={4} divided>
                            <Grid.Row>
                                {this.state.book.details.tag_name && 
                                this.state.book.details.tag_name.split(' ').chunk(25).map(tagsPerRow => (
                                    <Grid.Column>
                                        {tagsPerRow.map((tag, index) => (
                                            <p key={index}>#{tag}</p>
                                        ))}
                                    </Grid.Column>
                                ))}
                            </Grid.Row>
                        </Grid>

                    </Modal.Content>
                </Fragment>
                }
            </Modal>
            {this.state.review && <BookReviews open={this.state.review} isbn={this.state.isbn} onClose={() => this.setState({...this.state, review: false})}/>}
        </Fragment>
        )
    }
}
export default connect(null, { fetchDetails, fetchSimilars, fetchScore })(BookModal);