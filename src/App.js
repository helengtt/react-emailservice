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
import { Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import "./index.css";

class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data:[
    //             {"id":1, "email": "abc@gmail.com", "password": "123456", "loggedin": true },
    //             {"id":2, "email": "efg@gmail.com", "password": "987654", "loggedin": false }
    //         ]
    //     }
    // }

    // loggedIn() {
    //     // ...
    //   }
      
    // requireAuth(nextState, replace) {
    //     if (!loggedIn()) {
    //         replace({
    //         pathname: "/"
    //         })
    //     }
    // } 

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Login} />
                    {/* <Route path="/sendmail" component={Sendmail} onEnter={requireAuth}/> */}
                    <Route path="/" component={Sendmail} />
                </div>
            </Router>
        );
    }
}
 
export default App;