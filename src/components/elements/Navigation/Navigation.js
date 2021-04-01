import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/auth";

const Navigation = ({ user, logout }) => (
  <Menu primary pointing fuild widths={4} fixed='bottom' size="large" inverted>
    <Menu.Item as={Link} to="/home">
      <Icon name='home'/>
      Accueil
    </Menu.Item>
    <Menu.Item as={Link} to="/library">
      <Icon name='book' />
      Librairie
    </Menu.Item>
    <Menu.Item as={Link} to="/store">
      <Icon name='cart' />
      Store
    </Menu.Item>
    <Menu.Item as={Link} to="/search">
      <Icon name='search'/>
      Recherche
    </Menu.Item>
  </Menu>
);

Navigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(Navigation);
