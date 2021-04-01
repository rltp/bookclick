import styled from 'styled-components';
import React from 'react';
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";

import ItemBeforeMask from './Item-before.png';
import ItemAfterMask from './Item-after.png';
import PreviewMask from './Preview.png';

const Item = styled.div`
    position: relative;
    height: 100%;
    width: fit-content;
    transition: transform 450ms;
    margin: 0 auto 10px;
    &:before {
        height: 113.6%;
        width: 119.8%;
        display: block;
        content: '';
        position: absolute;
        top: -4.7%;
        opacity: .6;
        background-image: url(${ItemBeforeMask});
        background-size: 100% 100%;
        left: -10.9%;
        z-index: 1;
    }
    &:after {
        content: '';
        background-image: url(${ItemAfterMask});
        height: 98%;
        width: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }
        
    ${({ active }) => active && `
        cursor: pointer;
        &:hover {
            transform: scale(1.09);
        }
    `}

    ${({ holder }) => holder && `
        width: 135px;
        display: table;
        height: 200px;
        margin: 0 10px;
    `}
`;

const Preview = styled.picture`
    &:before {
        background-image: url(${PreviewMask});
        mix-blend-mode: multiply;
        height: 98%;
        width: 100%;
        display: block;
        content: '';
        position: absolute;
        top: 0;
        border-radius: 2.5px;
        background-size: 100% 100%;
        left: 0;
        z-index: 1;
    }
`;

const Image = styled.img`
    ${({ fullsize }) => !fullsize && `
        object-fit: contain;
        height: auto !important;
        width: 135px !important;
        border-radius: 2px;
    `}

    ${({ fullsize }) => fullsize && `
        height: 98%;
        width: 100%;
        border-radius: 2px;
    `}
`;

const Poster = (props) =>{
    if (props.url)
        return(
            <Item active={props.activate} {...props}>
                <Preview>
                    <Image src={props.url} fullsize={props.fullsize}/>
                </Preview>
            </Item>
        )
    else
        return(
            <Item active={false} holder={true} {...props}>
                <Preview>
                    <Loader active>{props.holder}</Loader>
                </Preview>
            </Item>
        )

}

Poster.propTypes = {
    activate: PropTypes.bool,
    url: PropTypes.string
};

export default Poster