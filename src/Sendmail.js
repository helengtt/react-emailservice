import React, { Component } from "react";

class EmailAddress extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onEmailAddressChange(e.target.value);
  }

  // check if the value of addresses is valid
  isValid() {
    const addresses = this.props.value.split(',');
    if (addresses.length === 0) {
      return true;
    }
    for (const address of addresses) { 
      if(!address.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        return false;
      }
    }
    return true;
  }

  render() {
    // error address is in red background__TOBEFixed
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
          className={this.props.className} 
          placeholder={this.props.placeholder} 
          value={this.props.value}
          onChange={this.handleChange} />
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
    this.state = {to: '', cc: '', bcc: ''};
  }

  onToRecipientsChange(value) {
    this.setState({to: value});
  }

  onCcRecipientsChange(value) {
    this.setState({cc: value});
  }

  onBccRecipientsChange(value) {
    this.setState({bcc: value});
  }

  // check if at least one of To, Cc and Bcc value is true, then email can be sent
  isValid() {
    return this.refs.to.isValid() || this.refs.cc.isValid()  || this.refs.bcc.isValid();
  }

  render () {
    return (
      <div>
        <EmailAddress 
          className="to" 
          placeholder="To"
          value={this.state.to}
          ref="to"  // Add ref to invoke child componnent
          onEmailAddressChange={this.onToRecipientsChange} />
        <EmailAddress 
          className="cc" 
          placeholder="Cc"
          value={this.state.cc}
          ref="cc"
          onEmailAddressChange={this.onCcRecipientsChange} />
        <EmailAddress 
          className="bcc" 
          placeholder="Bcc"
          value={this.state.bcc}
          ref="bcc"
          onEmailAddressChange={this.onBccRecipientsChange} />
      </div>
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
    if (this.refs.recipients.isValid()) {
      console.log('email sent');
      alert ('email sent successfully!');
    } else {
      console.log('error');
      alert('error!');
      // error;
    }
  }

  render() {
    return (
      <div>
        <h2>New Message</h2>
        <form onSubmit={this.handleSubmit}>
          <Recipients ref="recipients"/>
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