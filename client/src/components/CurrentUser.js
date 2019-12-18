import React from 'react'

const CurrentUser = (props) => (
  <>
    <p>{props.user.email}</p>
    {/* <Posts user={props.user}/> */}
  </>
)

export default CurrentUser