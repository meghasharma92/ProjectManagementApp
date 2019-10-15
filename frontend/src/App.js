import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Projects from './containers/Projects/Projects';
import NewProject from './containers/NewProject/NewProject';
import EditProject from './containers/EditProject/EditProject';
import Project from './containers/Project/Project';
import NewTask from './containers/Project/Todo/NewTask';

class App extends Component {

  componentWillMount(){
      this.props.onTryAutoSignin();
  }

  render(){

      let routes = (<Switch>
        <Route path="/login" component={Auth} /> 
        <Route path="/" exact component={Projects} /> 
        <Route path="/projects/new" exact component={NewProject} />
        <Route path="/projects/:projectId/edit" exact component={EditProject} />
        <Route path="/projects/:projectId"  component={Project} />
        </Switch>)

      if (this.props.isAuthenticated){
          routes = (<Switch>
            <Route path="/projects" component={Projects} /> 
            <Route path="/logout" component={Logout} /> 
            </Switch>)
      }


      return (
        <div>
          <Layout>
          {routes}
          </Layout>
        </div>
      );
  }

}

const mapStatetoProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchtoProps = dispatch => {
	return{
		onTryAutoSignin: () => dispatch(actions.authCheckState())
	}
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(App));
