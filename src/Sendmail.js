import React, { Component } from "react";

class EmailAddress extends Component {
  constructor(props) {
    super(props);
    this.onEmailAddressChange = this.onEmailAddressChange.bind(this);
  }

  onEmailAddressChange(e) {
    this.props.onEmailAddressChange(e.target.value);
  }

  render() {
    const addresses = this.props.value.split(',');

    for (const address of addresses) { 
      if(!address.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        address = <span className="error">{address}</span>;
      }
    }

    return (
      <div>
        <input 
          type="text" 
          classNname={this.props.className} 
          placeHolder={this.props.placeHolder} 
          value={this.props.value}
          onChange={this.onEmailAddressChange} />
      </div>
    );
  }
}

class Recipients extends Component {
  constructor(props) {
    super(props);
    this.onToRecipientsChange = this.onToRecipientsChange.bind(this);
    this.onCcRecipientsChange = this.onCcRecipientsChange.bind(this);
    this.onBccRecipientsChange = this.onBccRecipientsChange.bind(this);
    this.state = {value: ''};
  }

  onToRecipientsChange(e) {
    this.setState({value: e.target.value});
  }

  onCcRecipientsChange(e) {
    this.setState({value: e.target.value});
  }

  onBccRecipientsChange(e) {
    this.setState({value: e.target.value});
  }

  render () {
    
    return (
      <div>
        <EmailAddress 
          className="to" 
          placeHolder="To"
          value={this.state.value}
          onEmailAddressChange={this.onToRecipientsChange} />
        <EmailAddress 
          className="cc" 
          placeHolder="Cc"
          value={this.state.value}
          onEmailAddressChange={this.onCcRecipientsChange} />
        <EmailAddress 
          className="bcc" 
          placeHolder="Bcc"
          value={this.state.value}
          onEmailAddressChange={this.onBccRecipientsChange} />
      </div>
    );
  }
}

class From extends Component {
  render() {
    return (
      <input type="text" name="from" placeHolder="From"/>
    );
  }
}

class Subject extends Component {
  render() {
    return (
      <input type="text" name="subject" placeHolder="Subject"/>
    );
  }
}

class Body extends Component {
  render() {
    return (
      <textarea></textarea>
    );
  }
}

class Sendmail extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

  }

  render() {
    return (
      <div>
        <h2>New Message</h2>
        <form onSubmit={this.handleSubmit}>
          <Recipients />
          <From />
          <Subject />
          <Body />
          <input type="submit" value="Send" />
          <input type="button" value="SignOut" />
        </form>
      </div>
    );
  }
}
 
export default Sendmail;