import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
import { login } from "../../actions/authActions";
import Loading from "../../components/Loading";

function ProtectedRoute({ authStatus, children, user, isAdmin }) {

    let location = useLocation();

    return isAdmin ? (
        authStatus === "PENDING" || authStatus === "FETCHING" ? (
            <Loading />
        ) : authStatus !== "FAILURE" && user?.roleName === "Admin" ? (
            children
        ) : authStatus !== "FAILURE" && user?.roleName !== "Admin" ? (
            <Navigate to="/" />
        ) : (
            <Navigate to="/login" state={{ redirectUrl: location.pathname || '' }} />
        )
    ) : authStatus === "PENDING" || authStatus === "FETCHING" ? (
        <Loading />
    ) : authStatus !== "FAILURE" ? (
        children
    ) : (
        <Navigate to="/login" state={{ redirectUrl: location.pathname || '' }} />
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
