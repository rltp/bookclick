import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import HomePage from "./components/pages/HomePage/HomePage";
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";
import SignupPage from "./components/pages/SignupPage/SignupPage";
import RatingPage from "./components/pages/SignupPage/RatingPage";
import ConfirmationPage from "./components/pages/ConfirmationPage/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage/ResetPasswordPage";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import Navigation from "./components/elements/Navigation/Navigation";
import ComingSoon from "./components/pages/ComingSoon/ComingSoon";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";

const App = ({ location, isAuthenticated }) => {
  return (
    <Fragment>
      <Route location={location} path="/" exact component={LandingPage} />
      <Route
        location={location}
        path="/confirmation/:token"
        exact
        component={ConfirmationPage}
      />
      <GuestRoute
        location={location}
        path="/login"
        exact
        component={LoginPage}
      />
      <GuestRoute
        location={location}
        path="/forgot_password"
        exact
        component={ForgotPasswordPage}
      />
      <GuestRoute
        location={location}
        path="/signup"
        exact
        component={SignupPage}
      />
      <UserRoute
        location={location}
        path="/signup/step/2"
        exact
        component={RatingPage}
      />
      <UserRoute
        location={location}
        path="/signup/step/3"
        exact
        component={HomePage}
      />
      <GuestRoute
        location={location}
        path="/reset_password/:token"
        exact
        component={ResetPasswordPage}
      />
      <UserRoute
        location={location}
        path="/home"
        exact
        component={HomePage}
      />
      <UserRoute
        location={location}
        path="/library"
        exact
        component={ComingSoon}
      />
      <UserRoute
        location={location}
        path="/store"
        exact
        component={ComingSoon}
      />
      <UserRoute
        location={location}
        path="/settings"
        exact
        component={SettingsPage}
      />
      <UserRoute
        location={location}
        path="/search"
        exact
        component={SearchPage}
      />
      {isAuthenticated && <Navigation />}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  null
)(App);
