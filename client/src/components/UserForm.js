import React, {useState, useEffect} from "react";
import axios from "axios";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Header, } from "semantic-ui-react";

const UserForm = (props) => {
  // state = { name:'', nickname:'',};
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    const { auth: { user, }, match: { params,}, history } = props
    if (user.id !== params.id) {
      history.push(`/users/${user.id}/edit`)
    };
    axios.get(`/api/users/${user.id}`)
      .then(res => {
        setName(res.data.name)
        setNickname (res.data.nickname)
      })
      .catch(err => console.log(err))
  }, [])

  const handleNameChange = (e) => {
    setName(e.target.value)
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { auth: { user: { id, } }, history, } = props;
    axios.put(`/api/users/${id}`, {name, nickname})
      .then(res => {
        history.push(`/users/${id}`)
      })
      .catch(err => {
        console.log(err)
      })
  };

    return (
      <div>
        <Header as="h1" textAlign="center">Edit Profile</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Name"
            name="name"
            placeholder="Name"
            required
            onChange={handleNameChange}
            value={name}
          />
          <Form.Input
            label="Nickname"
            name="nickname"
            placeholder="Nickname"
            required
            onChange={handleNicknameChange}
            value={nickname}
          />
          <Form.Button color="blue">Submit</Form.Button>
        </Form>
      </div>
    )
  }


const ConnectedUserForm = (props) => (
  <AuthConsumer>
    {auth =>
      <UserForm {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedUserForm;