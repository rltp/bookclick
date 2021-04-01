import React from "react";
import { Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { confirm } from "../../../actions/auth";
import { connect } from "react-redux";

class ConfirmationPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div className="ui container">
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Valider votre e-mail</Message.Header>
          </Message>
        )}

        {!loading &&
          success && (
            <Message success>
              <Icon name="checkmark" />
              <Message.Content>
                <Message.Header>
                  Bienvenue. Votre e-mail à bien été validé.
                </Message.Header>
                <Link to="/signup/step/2">Continuer</Link>
              </Message.Content>
            </Message>
          )}

        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>Hmmm quelque chose cloche...</Message.Header>
              </Message.Content>
            </Message>
          )}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  })
};

export default connect(
  null,
  { confirm }
)(ConfirmationPage);
