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
      <div>
        <Text textType="h4">Welcome {name}</Text>
        <div className="userOptions">
          <a href={url}><Button className="pairedButton">Go Shopping</Button></a>
          <Button onClick={handleLogOut} className="pairedButton">Log Out</Button>
        </div>
      </div>
    )
  }
}

export default UserInfo