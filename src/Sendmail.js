import React, { Component } from "react";
import { Button, Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';

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
    const addresses = this.props.value.split(/,\s*|;\s*/);
    for (const address of addresses) { 
      if(!address.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        return false;
      }
    }
    return true;
  }

  render() {
    // error address is in red background__TOBEFixed
    const addresses = this.props.value.split(/,\s*|;\s*/);
    for (const address of addresses) { 
      if(!address.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        address = <span className="error">{address}</span>;
      }
    }

    return (
      <FormGroup>
        <Col componentClass={ControlLabel} sm={1}>
          {this.props.label}
        </Col>
        <input 
          type="text"
          className={this.props.className}
          placeholder={this.props.placeholder} 
          value={this.props.value}
          onChange={this.handleChange} />
      </FormGroup>
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
          label="To"
          placeholder="To"
          value={this.state.to}
          ref="to"  // Add ref to invoke child componnent
          onEmailAddressChange={this.onToRecipientsChange} />
        <EmailAddress 
          className="cc"
          label="Cc" 
          placeholder="Cc"
          value={this.state.cc}
          ref="cc"
          onEmailAddressChange={this.onCcRecipientsChange} />
        <EmailAddress 
          className="bcc"
          label="Bcc" 
          placeholder="Bcc"
          value={this.state.bcc}
          ref="bcc"
          onEmailAddressChange={this.onBccRecipientsChange} />
      </div>
    );
  }
}

class From extends Component {
  constructor(props){
    super(props);
  }
  /*
    TODO: Need a way to grab the user's email address from user data when loggedin=true.
   */
  render() {
    return (
      <input 
        type="text" 
        name="from" 
        placeholder="From"
        value={this.props.value} />
    );
  }
}

class Subject extends Component {
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.state = {value:''};
  }

  handleChange(e){
    this.setState({value:e.target.value});
  }

  isValid(){
    if (this.state.value.length > 255){
      return false;
    }
    return true;
  }

  render() {
    return (
      <input 
        type="text" 
        name="subject"
        placeholder="Subject"
        value={this.state.value}
        onChange={this.handleChange} />
    );
  }
}

class Body extends Component {
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.state = {value:''};
  }

  handleChange(e){
    this.setState({value:e.target.value});
  }

  isValid(){
    // ... (under certain conditions return false)
    return true;
  }

  render() {
    return (
      <textarea
        type="text" 
        name="body"
        value={this.state.value}
        onChange={this.handleChange} >
      </textarea>
    );
  }
}

const fakeAPI = {
  send(data, cb) {
    setTimeout(cb, 100); // fake async
  }
};

class Sendmail extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.refs.recipients.isValid()) {
      window.alert('Error: Please add at least one valid recipient.');
    } else if (!(this.refs.subject.isValid() || this.refs.body.isValid())) {
      if(window.confirm('Send this message without a subject or text in the body?')){
        this.send();
      }
    } else {
      this.send();
    }
  }

  send(){
    const recipients = this.refs.recipients.refs;
    let data = {
      to:recipients.to.value,
      cc:recipients.cc.value,
      bcc:recipients.bcc.value,
      from:this.refs.from.value,
      subject:this.refs.subject.value,
      body:this.refs.body.value,
    }

    /* TODO call backend API with data */
    fakeAPI.send(data, () => { window.alert ('email sent successfully!');})

  }

  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <h2>New Message</h2>
        <Recipients ref="recipients"/>
        <From ref="from" />
        <Subject ref="subject"/>
        <Body ref="body"/>
          <Button type="submit" bsStyle="primary">
            Send
          </Button>
          <Button bsStyle="primary">
            SignOut
          </Button>
      </Form>
    );
  }
}
 
export default Sendmail;