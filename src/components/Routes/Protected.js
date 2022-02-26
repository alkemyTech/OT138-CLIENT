import React from "react";

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { login } from "../../actions/authActions";
import Loading from "../../components/Loading";
function ProtectedRoute({
  isAuthenticated,
  isFetchingAuth,
  children,
  failureAuth,
}) {
  return isFetchingAuth ? (
    <Loading />
  ) : !failureAuth ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated,
    isFetchingAuth: state.auth.isFetching,
    failureAuth: state.auth.failure,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
