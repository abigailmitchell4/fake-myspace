import React from 'react';
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { AuthConsumer, } from "../providers/AuthProvider";
import PostForm from "./PostForm"
import styled from "styled-components";
import { Card, Icon, Button, Header,} from "semantic-ui-react";

class Posts extends React.Component {
  state = { posts: [], toggle: false };

  componentDidMount() {
    const { auth: { user, }, match: { params: { id, }, history, }} = this.props;
    // const { id } = this.props.match.params
    axios.get(`/api/users/${user.id}`)
      .then(res => {
        this.setState({ user: res.data, })
      })
    axios.get(`/api/users/${user.id}/posts`)
    .then(res => {
      this.setState({ posts: res.data })
    })
  }

  deletePost = (id) => {
    const { auth: { user } }= this.props;
    const user_id = user.id
    // const { id, } = this.props.match.params
    axios.delete(`/api/users/${user_id}/posts/${id}`)
      .then( res => {
        const { posts, } = this.state;
        this.setState({ posts: posts.filter(d => d.id !== id), })
      })
  }

  toggleForm = () => this.setState({ toggle: !this.state.toggle })

  add = (data) => {
    this.setState({ posts: [data, ...this.state.posts] })
  }

  renderPosts = () => {
    const { posts, } = this.state;
    const { auth: { user } }= this.props;
    const user_id = user.id
    const { id, } = this.props.match.params
    if (posts.length <= 0)
      return <h2>No Posts</h2>
    return posts.map( post => (
      <Link key={post.id} to={`/user/${id}/posts/${post.id}`}>
        <CardWidth key={post.id}>
          <Card.Content>
            <Card.Header>{ post.body }</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Button 
              icon
              size="mini" 
              onClick={() => this.deletePost(post.id)} 
              style={{ marginLeft: "15px", }}
            >
              <Icon name="trash"/>
            </Button >
          </Card.Content>
        </CardWidth>
      </Link>
    )
  )}

  render() {
    const { id, } = this.props.match.params
    const { auth: { user } }= this.props;
    const user_id = user.id
    return (
      <div>
        <Header as="h2">Posts</Header>
        <br />
          <>
            
            {this.state.toggle ?
              <div style={{ width: '80%' }}>
                <PostForm id={id} add={this.add} toggleForm={this.toggleForm} />
              </div>
              :
              <Link to={`/users/${id}/posts/new`}>
                <Button inverted color='green' onClick={() => this.toggleForm()}>
                  <Icon name="add" />
                  New Post
                </Button>
              </Link>
            }
           
            
          </>
        <br />
        <br />
        <Card.Group>
          { this.renderPosts() }
        </Card.Group>
      </div>
    )
  }
}

const CardWidth = styled(Card)`
width: 200px !important;
margin: 15px !important;
`

export class ConnectedPosts extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Posts { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedPosts);