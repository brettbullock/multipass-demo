import React from 'react'

import '../styles/App.css'
import 'intro.js/introjs.css'

import UserInfo from './UserInfo'
import TitleBlock from './TitleBlock'
import FormContainer from './FormContainer'

import { 
  introSteps,
  stepOptions,  
  introHints 
} from '../misc/intro'

import { 
  Steps,
  Hints 
} from 'intro.js-react';

class Main extends React.Component {
  state = {
    body: null,
    sessionAuth: localStorage.getItem('sessionAuth') || null,
    submitRequired: false,
    formSubmitted: false,
    changeHeight: false,
    isAuthenticated: false
  }

  async componentDidMount() {
    if (!this.state.sessionAuth) {
      return
    }
    const response = await fetch('http://localhost:4000/api/users/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': JSON.parse(this.state.sessionAuth)
      }
    })

    const body = await response.json()

    this.setState({
      body,
      isAuthenticated: true
    })
  }

  introJsOnBeforeChange = (nextStepIndex) => {
    // make sure form was submitted before changing next step
    if (nextStepIndex === 2 && this.state.formSubmitted === true) {
      return true
    } else if (nextStepIndex === 2 && this.state.formSubmitted !== true) {
      this.steps.updateStepElement(nextStepIndex - 1)
      return false
    }
  }

  introJsOnPreventChange = () => {
    this.setState({
      submitRequired: true
    })
  }

  apiCall = async (url, method, values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password
    }

    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const body = await response.json()
    // once body is returned, set state and add return to localstorage
    this.setState({
      body,
      sessionAuth: body.token,
      formSubmitted: true,
      submitRequired: false,
      isAuthenticated: true
    }, localStorage.setItem('sessionAuth', JSON.stringify(body.token)))
  }

  handleNewUserSubmit = async (values) => {
    this.apiCall('http://localhost:4000/api/users', 'POST', values)
  }

  handleLogInSubmit = async (values) => {
    this.apiCall('http://localhost:4000/api/users/login', 'POST', values)
  }

  handleLogOut = () => {
    localStorage.removeItem('sessionAuth')
    window.location.reload()
  }

  render() {
    const {
      body,
      submitRequired,
      isAuthenticated
    } = this.state

    return (
      <React.Fragment>
        <Steps
          enabled={false}
          steps={introSteps}
          initialStep={0}
          onExit={() => console.log('finished!')}
          ref={steps => (this.steps = steps)}
          onBeforeChange={this.introJsOnBeforeChange}
          onPreventChange={this.introJsOnPreventChange}
          options={stepOptions}
        />
        <Hints
          enabled={true}
          hints={introHints}
        />
        <TitleBlock/>
        <FormContainer
          handleNewUserSubmit={this.handleNewUserSubmit}
          handleLogInSubmit={this.handleLogInSubmit}
          handleLogOut={this.handleLogOut}
          submitRequired={submitRequired}
          isAuthenticated={isAuthenticated}
        />
        <div className={isAuthenticated ? 'user-message user-message--selected' : 'user-message'}>
          {isAuthenticated &&
            <UserInfo
              handleLogOut={this.handleLogOut}
              body={body}
              name={body.name}
              token={body.token}
              url={body.url}
            />
          }
        </div>
      </React.Fragment>
    )
  }
}

export default Main