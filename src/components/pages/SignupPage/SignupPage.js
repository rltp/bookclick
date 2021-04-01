import React from "react";
import PropTypes from "prop-types";
import SignupForm from "../../forms/SignupForm";
import { connect } from "react-redux";
import { signup } from "../../../actions/users";

class SignupPage extends React.Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/signup/step/2"));
  render() {
    return (
      <div className="ui container">
        <h1>Inscription</h1>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(
  null,
  { signup }
)(SignupPage);
