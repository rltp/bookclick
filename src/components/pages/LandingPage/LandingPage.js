import React, { Component, Fragment } from "react";
import { Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Header } from "semantic-ui-react";
import { allLandingSelector } from "../../../reducers/books";
import { fetchLanding } from '../../../actions/books';
import locomotiveScroll from "locomotive-scroll";
import Logo from './logo-static.png';
import Poster from "../../elements/Poster/Poster";
import './LandingPage.css';

class LandingPage extends Component{

  locomotive = null;

  constructor(props){
    super(props);
    this.props.fetchLanding().then(() => this.setState({ ...this.state, loading: false }));
    this.state = {
      scrollRef: React.createRef(),
      loading: true
    }
  }

  createLocomotive(){
    if (this.locomotive) this.locomotive.destroy();
    console.log("locomotive")
    if (!this.state.loading) 
      this.locomotive = new locomotiveScroll({
        el: this.state.scrollRef.current,
        smooth: true
      });
  }

  componentDidMount(){
    this.createLocomotive()
  }
  componentWillUnmount() {
    if (this.locomotive) this.locomotive.destroy();
  }

  render() {
    if (this.props.isAuth) return (<Redirect to="/home" />)
    if (!this.state.loading && !this.locomotive) this.createLocomotive()
    return (
      <Fragment>
        <main data-scroll-container ref={this.state.scrollRef}>
          <section id="header" className="content-landing content--fixed">
            <div className="frame">
              <div className="frame__title-wrap">
                <h1 className="frame__title">
                  <img src={Logo} alt="BookClick." width={100}/>
                </h1>
              </div>
              <div className="frame__demos">
                <Link to="/login"><Button secondary>Login</Button></Link>
                <Link to="/signup"><Button primary>Sign Up</Button></Link>
              </div>
            </div>
          </section>
          <section className="tiles tiles--columns-rotated tiles--darker" id="grid">
            <div className="tiles__wrap">
              {this.props.books.chunk(10).map((books, index) =>
                <div className="tiles__line" data-scroll data-scroll-speed={(index % 2) ? '-1' : '1'} data-scroll-target="#grid" key={index}>
                  {
                    books.map(book => (
                      <Poster key={book.isbn} url={book.image_url} fullsize={true} className="tiles__line-img"/>
                    ))
                  }
                </div>
              )}
            </div>
            <h2 className="tiles__title">BookClick.</h2>
          </section>
          <section className="content-landing">
            <p className="content__text content__text--centered" data-scroll data-scroll-speed="4">
              BookClick est un système de recommandation de livres, offrant à l'utilisateur des suggestions de livres à lire en fonction de ses goûts et de ses similarités avec d'autres personnes.
            </p>
          </section>
          <section className="content-landing content--feature">
            <p className="content__breakout content__breakout--big" data-scroll data-scroll-speed="1" data-scroll-direction="horizontal">pursuit of happiness</p>
            <p className="content__breakout content__breakout--medium" data-scroll data-scroll-speed="2" data-scroll-direction="horizontal">the right to experiment with your own consciousnes</p>
          </section>
          <section className="tiles tiles--small" id="grid2">
            <div className="tiles__wrap"></div>
              <div className="tiles__line">
                { this.props.books.slice(0, 10).map((book, index) => (
                    <Poster
                      key={index}
                      url={book.image_url} 
                      fullsize={true} 
                      className="tiles__line-img"
                      data-scroll 
                      data-scroll-speed={(index % 2) ? '-1' : '1'}
                      data-scroll-target="#grid2"
                    />
                  ))
                }
              </div>
          </section>
          <section className="content-landing">
            <a className="backtop" data-scroll data-scroll-speed="4">Devenir Marchant</a>
            <div className="frame frame--footer">
              <a href="https://twitter.com/bookclick" className="frame__author">@bookclick</a>
              <div className="frame__links">
                <a href="#">FAQ</a>
                <a href="#">Articles</a>
                <a href="#">CGU</a>
              </div>
              <div className="frame__demos">
                <a href="#" className="frame__demo">Devenir marchant</a>
                <a href="#" className="frame__demo">Contact</a>
              </div>
            </div>
          </section>
        </main>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.user.token,
    books: allLandingSelector(state)
  };
}

export default connect(mapStateToProps, { fetchLanding })(LandingPage);

