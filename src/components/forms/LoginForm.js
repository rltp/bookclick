import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    return new Promise((resolve, reject) => {
      this.setState(
        {
          data: {
            ...this.state.data,
            [e.target.name]: e.target.value
          }
        },
        () => {
          resolve(this.state.data);
        }
      );
    });
  };

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      this.setState({ errors }, () => {
        if (Object.keys(errors).length === 0) {
          this.props.submit(this.state.data).catch(err => {
            this.setState({
              errors: err.response.data.errors,
              loading: false
            });
          });
        }
        resolve(this.state.errors);
      });
    });
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    if (!data.password) errors.password = "Password required";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <div>
        <Form onSubmit={this.onSubmit} loading={loading}>
          {errors.global && (
            <Message>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors.global}</p>
            </Message>
          )}
          <Form.Field error={!!errors.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </Form.Field>
          <Form.Field error={!!errors.password}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Button type="submit" primary>
            Se connecter
          </Button>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
