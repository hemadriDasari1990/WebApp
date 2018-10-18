import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

class UserEdit extends Component {
  emptyUser = {
    firstname: '',
    lastname: '',
    emailid: '',
    password: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      user: this.emptyUser,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async componentDidMount() {
    debugger
    console.log(this.props.match.params.id);
    axios.get(`http://localhost:9022/test/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ user: res.data });
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let user = {...this.state.user};
    user[name] = value;
    this.setState({user});
  }

  async handleSubmit(event) {
    debugger
    axios.put(`http://localhost:9022/test/users/${this.props.match.params.id}`, this.state.user)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Login successfull");
          window.location = '/users';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const {user} = this.state;
    // const title = <h2>{user.id ? 'Edit Group' : 'Add Group'}</h2>;

    return <div>
      <Container>
        <h2>Hi</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstname">firstname</Label>
            <Input type="text" name="firstname" id="firstname" value={user.firstname || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="lastname">lastname</Label>
            <Input type="text" name="lastname" id="lastname" value={user.lastname || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="emailid">emailid</Label>
            <Input type="text" name="emailid" id="emailid" value={user.emailid || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="password">password</Label>
              <Input type="text" name="password" id="password" value={user.password || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>
            <Button color="secondary" tag={Link} to="/users">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default UserEdit;