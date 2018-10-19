import React, { Component } from "react";
import fakeAPI from "./API";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';

// for router
const LoginButton = withRouter(({ history }) => (
    <Button 
        type="button" 
        bsStyle="primary"
        onClick={() => {
            fakeAPI.login("test@test.com", () =>  history.push('/'));
        }}
    >
        Login
    </Button>
  ))

class Login extends Component {
    render() {
        return (
            <div className="login">
                <Form horizontal>
                    <h1>Email Service</h1>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={3}>
                            Username
                        </Col>
                        <Col sm={8}>
                            <FormControl 
                                type="email" 
                                placeholder="test@test.com" 
                                onChange={this.onUsernameChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={3}>
                            Password
                        </Col>
                        <Col sm={8}>
                            <FormControl 
                                type="password" 
                                placeholder="Password"
                                onChange={this.onPasswordChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup className="btn-login">
                        <Col smOffset={5} sm={6}>
                            <LoginButton />
                        </Col>
                    </FormGroup>    
                </Form>
            </div>
        );
    }
}
 
export default Login;