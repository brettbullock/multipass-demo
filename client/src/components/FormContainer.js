import React from 'react'

import '../styles/App.css'
import 'react-tabs/style/react-tabs.css'

import UserForm from './UserForm'

import {
  Tab, 
  Tabs, 
  TabList, 
  TabPanel
} from 'react-tabs'

class FormContainer extends React.Component {
  render() {
    const {
      submitRequired,
      handleNewUserSubmit,
      handleLogInSubmit
    } = this.props
    return (
      <div className='form'>
        <Tabs>
          <TabList>
            <Tab>New User</Tab>
            <Tab>Log In</Tab>
          </TabList>
          <TabPanel>
            <UserForm
              handleSubmit={handleNewUserSubmit}
              submitRequired={submitRequired}
              newUser={true}
            />
          </TabPanel>
          <TabPanel>
            <UserForm
              handleSubmit={handleLogInSubmit}
              submitRequired={submitRequired}
              newUser={false}
            />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default FormContainer