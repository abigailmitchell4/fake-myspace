import React from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Header, Button, } from "semantic-ui-react";

class PostForm extends React.Component {
  state = { body:'' };

  componentDidMount() {
    const { auth: { user, }, match: { params: { id, } }, history, location} = this.props
    if (id) {
      axios.get(`/api/users/${user.id}/posts/${id}`)
      .then(res => {
          if (user.id !== res.data.user_id) {
            history.push(`users/${user.id}/posts`);
          }
          this.setState({ body: res.data.body, })
        })
        .catch(err => console.log(err))
  }
}

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { auth: { user, }, match: { params: { id, user_id }, history, }} = this.props;
    if((user.id == user_id) && id) {
      axios.put(`/api/users/${user_id}/posts/${id}`, this.state)
      .then(res => {
        history.push(`/users/${user_id}/posts/${id}`)
        debugger
      })
      .catch(err => {
        console.log(err)
      })
      } else {
      axios.post(`/api/users/${user_id}/posts`, this.state)
      .then(res => {
        history.push(`/users/${user_id}`)
      })
        .catch(err => {
          console.log(err)
        })
    } 
  };

  render() {
    const { match: { params: { id, } } } = this.props;
    return (
      <div>
        {id ?
          <Header as="h1" textAlign="center">Edit Post</Header>
          :
          <Header as="h1" textAlign="center">New Post</Header>}
        <Form onSubmit={this.handleSubmit}>
          <Form.TextArea
            label="Body"
            name="body"
            placeholder="Body"
            required
            onChange={this.handleChange}
            value={this.state.body}
          />
          <Form.Button color="blue">Submit</Form.Button>
        </Form>
        <Link to="/posts">
          <Button color="green">Back</Button>
        </Link>
      </div>
    );
  };
};

const ConnectedPostForm = (props) => (
  <AuthConsumer>
    {auth =>
      <PostForm {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedPostForm;