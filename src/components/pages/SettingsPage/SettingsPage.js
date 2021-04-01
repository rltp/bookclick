import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";

const SettingsPage = ({ isAuthenticated, logout }) => (
  <div className="ui container">
    <h1>Settings Page</h1>
    {isAuthenticated ? (
      <button onClick={() => logout()}>Logout</button>
    ) : (
      <div>
        <Link to="/login">Login</Link> or
        <Link to="/signup"> Sign Up</Link>
      </div>
    )}
  </div>
);

SettingsPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStatetoProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(
  mapStatetoProps,
  { logout }
)(SettingsPage);
