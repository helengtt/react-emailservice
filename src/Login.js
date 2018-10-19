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
    constructor(props){
        super(props);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={username: "", password:""};
    }

    onUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }
    
    handleSubmit(e){
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        if (username===0 || !username.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
          window.alert('Username or Password is invalid.');
          return false;
        } else {
          this.login();
        }
    }

    login(){
        /* TODO call backend API with data */
        fakeAPI.login(this.state.username, () => { console.log ('login successfully');})
    }

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