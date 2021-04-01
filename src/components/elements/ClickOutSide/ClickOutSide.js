import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
export default class ClickOutSide extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            open: true
        }
        
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentWillReceiveProps(nextProps) {
        console.log("props change: ", nextProps)
        this.setState({ open: true});
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            console.log('out');
            this.setState({
                open: false
            })
        }
    }

    render() {
        console.log("state of onclick", this.state, this.props)
        const childrenWithProps = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, { ...this.props.children.props, ...this.props })
        })
        return (<div ref={this.wrapperRef}>{this.state.open && childrenWithProps}</div>);
    }
}