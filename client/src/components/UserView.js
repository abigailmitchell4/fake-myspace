import React, { useEffect, useState, } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Header, Segment, Button, Container, Card, } from "semantic-ui-react";
import styled from 'styled-components';

const UserView = (props) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  // const [friends, setFriends] = useState([]);
  const { match: { params, }, } = props

  useEffect(() => {
    axios.get(`/api/users/${params.id}`)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get(`/api/users/${params.id}/posts`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  const addFriend = (e) => {
    debugger
  };
  const listPosts = () => {
    const { auth: { user }, match: { params,} } = props;
    const user_id = user.id
    
    if (user_id == params.id) {
      return posts.map(post=> (
        <div key={post.id} style={{ marginTop: '40px', padding: '20px'}}>
          {/* <Link to={`/users/${user_id}/posts/${post.id}`}> */}
            <Segment style={{ textAlign: 'center' }}>
              <p>{post.body}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginTop: '20px',
                }}
              >
              </div>
              <div>
                <Link to={`/users/${user_id}/posts/${post.id}/edit`}>
                  <Button size="mini" color="teal">
                    Edit
                  </Button>
                </Link>
              </div>
            </Segment>
          {/* </Link> */}
        </div>
      ))
    } else {
      return null 
    }
  }

  return (
    <Container display="flex">
      <br />
      <Segment style={{backgroundColor: "#c6bb2e"}}>
        <Header style={{color: "#006863", padding: "10px", }}>
          <span style={{ padding: "10px"}}>
          {user.name}
          </span>
        {/* </Header>
        <Header style={{color: "#ca8724"}}> */}
          {user.email}
        
        {
          props.auth.user.id == params.id ?
          <Link to={`/users/${user.id}/edit`}>
            <Button size="mini" floated="right" basic color="black">
              Edit Profile
            </Button>
          </Link>
          :
          null
        }
          <Button onClick={addFriend} size="mini" floated="right" basic color="black">
            Add Friend
          </Button>
          </Header> 
        </Segment>  
        <>
        <Header as="h1" textAlign="center" style={{color: "#ca8724"}}>{user.nickname}</Header>
        { props.auth.user.id == params.id ?
          <Button as={Link} to={`/users/${user.id}/posts/new`} basic color="black">
            New Post
          </Button>
          :
          null
        }
          {listPosts()}
        </>
    </Container>
  );
};

const ConnectedUserView = (props) => (
  <AuthConsumer>
    {auth => (
      <UserView {...props} auth={auth} />
    )}
  </AuthConsumer>
);

// const Positioned = styled(Segment)`
//   /* position: relative;
//   left: 50rem;
//   bottom: 5.5rem;
//   width: 2rem;*/
//   /* display: flex; */
//   /* background-color: , !important; */
//   /* border: none, !important; */
 
// `
// // const ColoredDiv = styled.div`
// //   background-color: pink;
// //   padding: 2rem 2rem 0 2rem;
// //   margin: 1rem;
 
// // `

export default ConnectedUserView;