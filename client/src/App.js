import React, { Fragment, } from 'react';
import FetchUser from './components/FetchUser';
import Login from './components/Login';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
// import PostView from "./components/PostView";
import PostForm from "./components/PostForm";
import UserView from "./components/UserView";
import UserForm from "./components/UserForm";
import Posts from './components/Posts';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Users from './components/Users';
import { Switch, Route, } from 'react-router-dom';
import { Container, } from "semantic-ui-react";
import styled from 'styled-components'

const App = () => (
  <Fragment>
    <BackgroundColor>
      <Navbar />
      <FetchUser>
        <Container>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
             {/* <ProtectedRoute exact path="/users" component={Users} />
            <ProtectedRoute exact path="/users/:user_id/posts" component={Posts} />
            <ProtectedRoute exact path="/users/:user_id/posts/new" component={PostForm} />  */}
            <ProtectedRoute exact path="/users/:user_id/posts" component={Posts} />
            <ProtectedRoute exact path="/users/:user_id/posts/new" component={PostForm} />
            {/* <ProtectedRoute exact path="/posts/:id" component={PostView} /> */}
            <ProtectedRoute exact path="/users/:user_id/posts/:id/edit" component={PostForm} />
            <ProtectedRoute exact path="/users" component={Users} />
            <ProtectedRoute exact path="/users/:id" component={UserView} />
            <ProtectedRoute exact path="/users/:id/edit" component={UserForm} /> 
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </FetchUser>
    </BackgroundColor>
  </Fragment>
)

const BackgroundColor = styled.div`
  background-color: #effffa;
  height: 100vh;
`

export default App;
