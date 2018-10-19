import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import uploadScreen from './UploadScreen';
import loginscreen from './Loginscreen';
import userEdit from './UserEdit';
import products from'./Products';
import PaperCard from './PaperCard';
class App extends Component {
  render() {
    return (
      // <div className="App">
      //   {this.state.loginPage}
      //   {this.state.uploadScreen}
      // </div>
      <Router>
          <Switch>
            <Route path='/' exact={true} component={loginscreen}/>
            <Route path='/users' exact={true} component={uploadScreen}/>
            <Route path='/users/:id' component={userEdit}/>
            <Route path='/products' component={products}/>
            <Route path='/cards' component={PaperCard}/>
          </Switch>
        </Router>
    );
  }
}
const style = {
  margin: 15,
};
export default App;