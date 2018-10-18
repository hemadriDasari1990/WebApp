import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import axios from 'axios';

class UploadScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9022/test/users/')
      .then(res => {
        this.setState({ users: res.data });
        console.log(this.state.users);
      });
  }

  async remove(id) {
    axios.post('http://localhost:9022/test/users/delete/'+id)
      .then(res => {
        let updatedUsers = [...this.state.users].filter(i => i.id !== id);
        this.setState({users: updatedUsers});
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Users LIST
            </h3>
          </div>
          <div class="panel-body">
            {/* <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Contact</Link></h4> */}
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Id</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user =>
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.emailid}</td>
                    <td>{user.password}</td>
                    <td>
                      <td>
                        <ButtonGroup>
                          <Button size="sm" color="primary" tag={Link} to={'/users/' + user.id}>Edit</Button>
                          <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Delete</Button>
                        </ButtonGroup>
                      </td>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default (withRouter(UploadScreen));