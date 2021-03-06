import React from 'react'
import axios from 'axios'
import { Container, } from 'semantic-ui-react';
import styled from 'styled-components';
import { AuthConsumer, } from "../providers/AuthProvider";

const Home = () => {

  return (
    <AuthConsumer>
      { auth => (
        <Container>
          <StyledText>hello, welcome to</StyledText>
          <StyledHeader>mySpace</StyledHeader>
          {/* <CurrentUser user={auth.user} /> */}
        </Container>
      )}
    </AuthConsumer>
  )
}

const StyledHeader = styled.h1`
font-family: 'Karla', sans-serif;
text-align: center;
font-size: 50px;
font-weight: 600;
color: #bf6d06;
animation-name: moveInLeft; /*refers to @keyframes name*/
animation-duration: 1.2s;
animation-timing-function: ease-in;
@keyframes moveInLeft {
  0% {
      opacity: 0;
      transform: translateX(-100px);
  }
  80%{
      transform: translateX(10px);
  }
  100% {
      opacity: 1;
      transform: translate(0);
  }
}
`
const StyledText = styled.p`
font-family: 'Karla', sans-serif;
text-align: center;
font-size: 30px;
margin: 0;
padding-top: 50px;
color: #bf6d06;
animation: moveInRight 1.2s ease-out;
@keyframes moveInRight {
  0% {
      opacity: 0;
      transform: translateX(100px);
  }
  80%{
      transform: translateX(-10px);
  }
  100% {
      opacity: 1;
      transform: translate(0);
  }
}
`

export default Home;