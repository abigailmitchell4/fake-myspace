import React, { useEffect, useState, } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { AuthConsumer, } from "../providers/AuthProvider";
import Posts from './Posts'
import { Header, Segment, Button, Container, Card, } from "semantic-ui-react";

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
    const { auth: { user }, match: { params,} }= props;
    const user_id = user.id
    
    if (user_id == params.id) {
      return posts.map(post=> (
        <div key={post.id} style={{ marginTop: '40px', padding: '20px'}}>
          <Link to={`/users/${user_id}/posts/${post.id}`}>
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
                <Button as={Link} to={`/users/${user_id}/posts/${post.id}/edit`}>
                  Edit
                </Button>
              </div>
            </Segment>
          </Link>
        </div>
      ))
    } else {
      return null 
    }
  }

  return (
    <Container display="flex">
      <Header as="h1" textAlign="center">{user.nickname}</Header>
      <Container>
        {props.auth.user.id == params.id ?
          <Link to={`/users/${user.id}/edit`}>
            <Button color="green">
              Edit Profile
            </Button>
          </Link>
          :
          null
        }
          <Button onClick={addFriend} size="mini">
            Add Friend
          </Button>
        <br />
        <Card>
          <Card.Content>
            <Card.Header>
              {user.name}
            </Card.Header>
            <Card.Meta>
              {user.email}
            </Card.Meta>
          </Card.Content>
        </Card>
      </Container>
      <Container>
        {
          user.nickname ?
          <Header textAlign="center" as="h2">{user.nickname}'s posts</Header>
          :
          null
        }
        { props.auth.user.id == params.id ?
          <Button as={Link} to={`/users/${user.id}/posts/new`}>
            New Post
          </Button>
          :
          null
        }
        <>
          {listPosts()}
        </>
      </Container>
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

export default ConnectedUserView;