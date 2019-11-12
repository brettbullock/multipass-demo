import React from 'react'

import '../styles/App.css'

import { 
  Text, 
  Button 
} from 'kingsbury/lib'

class UserInfo extends React.Component {
  render() {
    const {
      name,
      url,
      handleLogOut
    } = this.props
    return (
      <React.Fragment>
        <Text textType="h4">Welcome {name}</Text>
        <div className="user-options">
          <a href={url}><Button className="paired-button">Go Shopping</Button></a>
          <Button onClick={handleLogOut} className="paired-button">Log Out</Button>
        </div>
      </React.Fragment>
    )
  }
}

export default UserInfo