import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class SignupForm extends Component {
  state = {
    data: {
      email: "",
      password: "",
      pseudo: "",
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      postcode: "",
      country_code: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      console.log(errors)
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.pseudo}>
          <label htmlFor="pseudo" />
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            placeholder="Nickname"
            value={data.pseudo}
            onChange={this.onChange}
          />
          {errors.pseudo && <InlineError text={errors.pseudo} />}
        </Form.Field>
        <Form.Field error={!!errors.firstname}>
          <label htmlFor="firstname" />
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Firstname"
            value={data.firstname}
            onChange={this.onChange}
          />
          {errors.firstname && <InlineError text={errors.firstname} />}
        </Form.Field>
        <Form.Field error={!!errors.lastname}>
          <label htmlFor="lastname" />
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Lastname"
            value={data.lastname}
            onChange={this.onChange}
          />
          {errors.lastname && <InlineError text={errors.lastname} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password" />
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email" />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.address}>
          <label htmlFor="address" />
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={this.onChange}
          />
          {errors.address && <InlineError text={errors.address} />}
        </Form.Field>
        <Form.Field error={!!errors.city}>
          <label htmlFor="city" />
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={this.onChange}
          />
          {errors.city && <InlineError text={errors.city} />}
        </Form.Field>
        <Form.Field error={!!errors.postcode}>
          <label htmlFor="postcode" />
          <input
            type="text"
            id="postcode"
            name="postcode"
            placeholder="Postcode"
            value={data.postcode}
            onChange={this.onChange}
          />
          {errors.postcode && <InlineError text={errors.postcode} />}
        </Form.Field>
        <Form.Field error={!!errors.country_code}>
          <label htmlFor="country_code" />
          <input
            type="text"
            id="country_code"
            name="country_code"
            placeholder="Country code"
            value={data.country_code}
            onChange={this.onChange}
          />
          {errors.country_code && <InlineError text={errors.country_code} />}
        </Form.Field>
        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
