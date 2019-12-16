import React, { Fragment, } from 'react';
import FetchUser from './components/FetchUser';
import Login from './components/Login';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
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
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute exact path="/" component={Home} />
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
