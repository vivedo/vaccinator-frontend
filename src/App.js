import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {ProvideAuth, useAuth} from "./auth";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./components/LoginPage/LoginPage";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import UploadPage from "./components/UploadPage/UploadPage";
import ListPage from "./components/ListPage/ListPage";
import BetaBadge from "./components/BetaBadge/BetaBadge";

export default function AuthExample() {
    return (
        <ProvideAuth>
            <BetaBadge/>
            <Router>
                <div>
                    <AuthenticatedComponent>
                        <NavBar />
                    </AuthenticatedComponent>
                    <Switch>
                        <LoginRoute path="/login">
                            <LoginPage />
                        </LoginRoute>
                        <PrivateRoute path="/dashboard">
                            <DashboardPage />
                        </PrivateRoute>
                        <PrivateRoute path="/upload">
                            <UploadPage />
                        </PrivateRoute>
                        <PrivateRoute path="/list/:id">
                            <ListPage />
                        </PrivateRoute>
                        <Route path='*' exact={true}>
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}


// Route accessible only when logged
function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

// Route accessible only when NOT logged
function LoginRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function AuthenticatedComponent({children, ...rest}) {
    let auth = useAuth();
    return auth.user ? children : <></>
}