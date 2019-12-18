import React, { useEffect, useState, } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { Container, Header, Card } from "semantic-ui-react";
import { AuthConsumer } from "../providers/AuthProvider";
import styled from 'styled-components';

const Users = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <Container>
      <Header as="h1" textAlign="center">All Users</Header>
      <Card.Group itemsPerRow={3}>

      { users.map(user => (
        <Link to={`/users/${user.id}`}>
        <StyledCard key={user.id}>
            <StyledHeader textAlign="center" as="h1">{user.nickname}</StyledHeader>
            <Card.Content>
              <StyledHeader color="white" as="h3">{user.name}</StyledHeader>
            </Card.Content>
            <br/>
            <Card.Meta>
              <StyledHeader color="white" as="h4">Email: {user.email}</StyledHeader>
            </Card.Meta>
        </StyledCard>
        </Link>
      ))}
      </Card.Group>
    </Container>
  );
};

const ConnectedUsers = (props) => (
  <AuthConsumer>
    { auth => (
      <Users {...props } auth={auth} />
    )}
  </AuthConsumer>

);

const StyledCard = styled.div`
  width: 250px;
  height: 200px;
  padding: 15px;
  margin: 15px;
  border-radius: 7%;
  color: white;
  font-family: 'Karla', sans-serif;
  background-color:#ca8724;
`
const StyledHeader = styled(Header)`
  color: white;
  font-family: 'Karla', sans-serif, !important;
`

export default ConnectedUsers;