import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <h1>LogIn</h1>
            <label>
                Username:
                <input type="text" />
            </label>
            <label>
                Password:
                <input type="text"/>
            </label>
            <input type="submit" value="Login" />
        </form>
    );
  }
}
 
export default Login;