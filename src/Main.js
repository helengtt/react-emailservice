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
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data:[
    //             {"id":1, "username": "aaa", "password": "123456", "email": "abc@gmail.com", "loggedin": true },
    //             {"id":2, "username": "bbb", "password": "987654", "email": "efg@gmail.com", "loggedin": false }
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
 
export default Main;