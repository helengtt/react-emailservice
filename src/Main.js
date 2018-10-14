import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import Login from "./Login";
import Sendmail from "./Sendmail";
import "./index.css";

class Main extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Login} />
                    <Route path="/" component={Sendmail} />
                </div>
            </Router>
        );
    }
}
 
export default Main;