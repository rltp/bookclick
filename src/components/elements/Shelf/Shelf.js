import React, { Component, Fragment } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import styled from "styled-components";
import Poster from "../Poster/Poster";
import '../Books.css'


const Article = styled.article`
    display: block;
    font-size: 16px;
    max-width: min-content;
    margin: 0 auto;
    padding: 0 10px;
`;

const Container = styled(ScrollContainer)`
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 20px;
    align-items: baseline;
    text-align: center;
    &:-webkit-scrollbar {
    display: none;
    }
`;

class Shelf extends Component {

    constructor(props){
        super(props);
        this.state = { 
            open: false,
            bookSelected: null,
            dragabble: props.dragabble || true,
        }
    }

    onBookSelect = isbn => {
        this.setState({...this.state, bookSelect: isbn})
    };

    render = () => {
        const mask = new Array(this.props.mask).fill("Chargement");

        const childrenWithProps = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, { isbn: this.state.bookSelect });
        });
        return (
            <Fragment>
                <Container vertical={false} horizontal={this.state.dragabble}>
                    {this.props.data.length > 0 && this.props.data.map((item, index) => (
                        <Article key={index} onClick={() => this.onBookSelect(item.isbn)}>
                            <Poster url={item.image_url} activate={true}/>
                            <span>{item.title}</span>
                        </Article>
                    ))}
                    {this.props.data.length == 0 && mask.map((text, index) => (
                        <Poster key={index} holder={text}/>
                    ))}
                </Container>
                {this.state.bookSelect && childrenWithProps }
            </Fragment>
        )
    }
}
export default Shelf;