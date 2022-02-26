import React, { useEffect } from "react";

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { login } from "../../actions/authActions";
import Loading from "../../components/Loading";
function ProtectedRoute({ authStatus, children, user, isAdmin }) {
  useEffect(() => {
    console.log(user);
  }, [user]);

  return isAdmin ? (
    authStatus === "PENDING" || authStatus === "FETCHING" ? (
      <Loading />
    ) : authStatus !== "FAILURE" && user?.roleName === "Admin" ? (
      children
    ) : authStatus !== "FAILURE" && user?.roleName !== "Admin" ? (
      <Navigate to="/" />
    ) : (
      <Navigate to="/login" />
    )
  ) : authStatus === "PENDING" || authStatus === "FETCHING" ? (
    <Loading />
  ) : authStatus !== "FAILURE" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
const mapStateToProps = (state) => {
  return {
    authStatus: state.auth.status,
    user: state.auth.user,
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
