import React, { Component } from "react";

class To extends Component {
  render() {
    return (
      <input type="text" name="to" placeholder="To"/>
    );
  }
}

class Cc extends Component {
  render() {
    return (
      <input type="text" name="cc" placeholder="Cc"/>
    );
  }
}

class Bcc extends Component {
  render() {
    return (
      <input type="text" name="bcc" placeholder="Bcc"/>
    );
  }
}

class From extends Component {
  render() {
    return (
      <input type="text" name="from" placeholder="From"/>
    );
  }
}

class Subject extends Component {
  render() {
    return (
      <input type="text" name="subject" placeholder="Subject"/>
    );
  }
}

class Body extends Component {
  render() {
    return (
      <textarea>
        Hello there, this is the mail content
      </textarea>
    );
  }
}

class Sendmail extends Component {
  render() {
    return (
      <div>
        <h2>New Message</h2>
        <form onSubmit={this.handleSubmit}>
          <To />
          <Cc />
          <Bcc />
          <From />
          <Subject />
          <Body />
        </form>
      </div>
    );
  }
}
 
export default Sendmail;