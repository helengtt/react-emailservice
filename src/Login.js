import React, { Component } from "react";
import fakeAuth from "./Auth";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, ButtonToolbar} from 'react-bootstrap';

const LoginButton = withRouter(({ history }) => (
    <Button 
        type="button" 
        bsStyle="primary"
        onClick={() => { 
            fakeAuth.isAuthenticated = true;
            fakeAuth.senderEmail = "test@test.com"; //TODO
            history.push('/');
        }}
    >
        Login
    </Button>
  ))

class Login extends Component {
  render() {
    return (
        <div className="login">
            <Form horizontal onSubmit={this.handleSubmit}>
                <h1>LogIn</h1>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>
                        Username
                    </Col>
                    <Col sm={8}>
                        <FormControl type="email" placeholder="Email" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>
                        Password
                    </Col>
                    <Col sm={8}>
                        <FormControl type="password" placeholder="Password" />
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