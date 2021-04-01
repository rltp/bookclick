import styled from 'styled-components';
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, Grid, Form, Divider, Icon, Rating, Button, Header } from "semantic-ui-react";

class ReviewForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0,
            comment: '',
            write: false
        }
        console.log(this.props.isbn)
    }

    handleSubmit(){
        this.props.onRated({book_id: this.props.isbn, score: this.state.score, comment: this.state.comment})
        this.setState({ score: 0, comment: '', write: false });
    }

    render() {
        console.log(this.props)
        return (
            <Segment placeholder className={this.props.className}>
                <Form reply>
                    <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical>Ou</Divider>
                        <Grid.Row verticalAlign='middle'>
                            
                            <Grid.Column>
                                <Header>
                                    <Icon name='star' />
                                    Noter le livre
                                </Header>
                                <Form.Field>
                                    <Rating maxRating={5} rating={this.state.score} onRate={(_e, { rating, _max }) => this.setState({ ...this.state, score: rating, write: false})} />
                                </Form.Field>
                            
                                <Button content='Envoyer' labelPosition='left' icon='send' secondary onClick={() => this.handleSubmit()} />
                            </Grid.Column>

                            <Grid.Column>
                                <Header>
                                    <Icon name='write' />
                                    Noter et ajouter un commentaire
                                </Header>
                                <Form.Field>
                                    <Rating maxRating={5} rating={this.state.score} onRate={(_e, { rating, _max }) => this.setState({ ...this.state, score: rating, write: true })} />
                                </Form.Field>

                                <Form.TextArea onChange={(e) => this.setState({ ...this.state, comment: e.target.value, write: true })} />
                                <Button content='Envoyer' labelPosition='left' icon='edit' secondary onClick={()=>this.handleSubmit()}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
        )
    }
}

ReviewForm.propTypes = {
    open: PropTypes.bool,
    isbn: PropTypes.string
};

export default connect(null, {})(ReviewForm);