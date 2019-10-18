import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import { Auth, Logout, Projects, Project, NewProject, EditProject, Tasks, NewTask, AdminDashboard } from './containers/index';
import HighchartTest from './containers/HighchartTest';


class App extends Component {

  componentDidMount(){
      this.props.onTryAutoSignin();
  }

  render(){

      let routes = (<Switch>
              <Route path="/login" component={Auth} /> 
              <Route path="/logout" component={Logout} /> 
              <Route exact path="/" > 
            <Redirect to= "/login" />
            </Route>
          </Switch>)

      if (this.props.isAuthenticated){
        routes = (<Switch>
          <Route path="/login" component={Auth} /> 
          <Route path="/logout" component={Logout} /> 
          <Route path="/projects" exact component={Projects} />
          <Route exact path="/" > 
            <Redirect to= "/projects" />
          </Route>
          <Route path="/projects/new" exact component={NewProject} />
          <Route path="/tasks" exact component={Tasks} />
          <Route path="/dashboard" exact component={AdminDashboard} />
          <Route path="/projects/:projectId/edit" exact component={EditProject} />
          <Route path="/projects/:projectId/new-todo" exact component={NewTask} />
          <Route path={`/projects/:projectId(\\d+)`} exact component={Project} />
          <Route path={'/highchart'} exact component={HighchartTest} />
          {/* <Route path="/projects/:projectId/add-resource"  exact component={AddResource} /> */}
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
