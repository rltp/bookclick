import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import ForgotPasswordForm from "../../forms/ForgotPasswordForm";
import { connect } from "react-redux";
import { resetPasswordRequest } from "../../../actions/auth";

class ForgotPasswordPage extends Component {
  state = {
    success: false
  };

  submit = data =>
    this.props.resetPasswordRequest(data).then(() => {
      this.setState({ success: true });
    });

  render() {
    return (
      <div className="ui container">
        {this.state.success ? (
          <Message>Email à été envoyé</Message>
        ) : (
          <Fragment>
            <h1>Mot de passe oublié</h1>
            <ForgotPasswordForm submit={this.submit} />
          </Fragment>
        )}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  { resetPasswordRequest }
)(ForgotPasswordPage);
