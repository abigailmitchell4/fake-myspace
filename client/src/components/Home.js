import React from 'react';
import { Header, Container, } from 'semantic-ui-react';
import styled from 'styled-components';

const Home = () => (
  <Container>
    <StyledText>hello, welcome to</StyledText>
    <StyledHeader>mySpace</StyledHeader>
  </Container>
)

const StyledHeader = styled.h1`
font-family: 'Poppins', sans-serif;
text-align: center;
font-size: 80px;
font-weight: 400;
color: #bf6d06;
`
const StyledText = styled.p`
font-family: 'Karla', sans-serif;
text-align: center;
font-size: 50px;
margin: 0;
padding-top: 50px;
color: #bf6d06;
`

export default Home;