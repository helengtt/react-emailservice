import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login";
import fakeAPI from "./Auth";
import Sendmail from "./Sendmail";
import "./index.css";

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" render={() => (
                    fakeAPI.isAuthenticated ? (
                    <Sendmail/>
                    ) : (
                    <Login/>
                    )
                )}/>
            </Router>
        );
    }
}
 
export default App;