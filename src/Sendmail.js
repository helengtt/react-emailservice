import React, { Component } from "react";
import fakeAPI from "./API";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';

// component for To, Cc and Bcc
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
    // error address is in red background__TODO
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
        <Col sm={10}>
          <FormControl 
            type="text"
            className={this.props.className}
            placeholder={this.props.placeholder} 
            value={this.props.value}
            onChange={this.handleChange} />
        </Col>
      </FormGroup>
    );
  }
}

// component contain To, Cc and Bcc
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
  render() {
    return (
      <FormGroup>
        <Col componentClass={ControlLabel} sm={1}>
          From
        </Col>
        <Col sm={10}>      
          <FormControl 
            type="text" 
            name="from" 
            placeholder="From"
            value={this.props.value} />
        </Col>
      </FormGroup>
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
      <FormGroup>
        <Col componentClass={ControlLabel} sm={1}>
          Subject
        </Col>
        <Col sm={10}>      
          <FormControl
            type="text" 
            name="subject"
            placeholder="Subject"
            value={this.state.value}
            onChange={this.handleChange} />
        </Col>
      </FormGroup>
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
      <FormGroup>
      <Col smOffset={1} sm={10}>
        <FormControl 
          type="text" 
          name="body"
          componentClass="textarea"
          style={{height: "200px"}}
          value={this.state.value}
          onChange={this.handleChange} />
      </Col>
      </FormGroup>
    );
  }
}

// for router
const LogoutButton = withRouter(({ history }) => (
    <Button
      type="button" 
      bsStyle="primary"
      onClick={() => { 
        fakeAPI.logout(() => history.push('/'))
      }}
    >
      Logout
    </Button>
))

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

  // send data to backend
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
        <Col smOffset={1}>
          <h2>New Message</h2>
        </Col>
        <Recipients ref="recipients"/>
        <From ref="from" value={fakeAPI.senderEmail}/>
        <Subject ref="subject"/>
        <Body ref="body"/>
        <FormGroup>
          <Col smOffset={10} sm={1}>
            <Button type="submit" bsStyle="primary">
              Send
            </Button>
          </Col>
          <Col smOffset={5} sm={6}>
            <LogoutButton />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
 
export default Sendmail;