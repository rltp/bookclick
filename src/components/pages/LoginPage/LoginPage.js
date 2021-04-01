import React from "react";
import LoginForm from "../../forms/LoginForm";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../../actions/auth.js";

class LoginPage extends React.Component {
  submit = data => {
    return this.props
      .login(data)
      .then(() => this.props.history.push("/home"));
  };
  render() {
    return (
      <div className="ui container">
        <h1>Login Page</h1>
        <LoginForm submit={this.submit} />
        <Link to="/forgot_password">Forgot Password</Link>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  { login }
)(LoginPage);
