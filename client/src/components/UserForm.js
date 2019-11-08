import React from 'react'
import * as yup from 'yup'

import '../styles/App.css'

import { 
  Form, 
  Formik 
} from 'formik'

import { 
  Input, 
  Text, 
  Button 
} from 'kingsbury/lib'

const newUserSchema = yup.object().shape({
  name: yup.string()
    .min(3, 'username must be at least 3 characters long')
    .required('Please enter your full name'),
  email: yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: yup.string()
    .min(3, 'Password must be at least 3 characters long')
    .required('Please enter a password')
})

const loginSchema = yup.object().shape({
  email: yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: yup.string()
    .min(3, 'Password must be at least 3 characters long')
    .required('Please enter a password')
})

class UserForm extends React.Component {

  render() {
    const {
      handleSubmit,
      newUser
    } = this.props
    return (
      <Formik
        initialValues={{name: '', email: '', password: ''}}
        validateOnChange={false}
        validationSchema={newUser ? newUserSchema : loginSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors, 
          handleChange
        }) => 
          <Form>
            {newUser && 
              <React.Fragment>
                <Text 
                  textType='h2'
                  className='inputLabel'
                >
                  Name:
                </Text>
                <Input 
                  htmlType='text' 
                  name='name' 
                  placeholder='Full Name' 
                  error={errors.name} 
                  errorComponent={(error) => <p className="errorMsg">{error}</p>} 
                  onChange={handleChange}
                />
              </React.Fragment> 
            }
            <Text 
              textType='h2'
              className='inputLabel'  
            >
              Email:
            </Text>
            <Input 
              htmlType='email' 
              name='email' 
              placeholder='Email' 
              error={errors.email}
              errorComponent={(error) => <p className="errorMsg">{error}</p>}
              onChange={handleChange}/>
            <Text 
              textType='h2'
              className='inputLabel'  
            >
              Password:
            </Text>
            <Input 
              htmlType='password' 
              name='password'
              error={errors.password}
              errorComponent={(error) => <p className="errorMsg">{error}</p>}
              onChange={handleChange}/>
            <Button
              type="submit"
              id="submitButton"
              className={this.props.submitRequired ? 'submitRequired' : ''}
            >
              {newUser ? 'Create New User' : 'Log In'}
            </Button>
            {this.props.submitRequired &&
              <p className="errorLabel">Create new user before continuing</p> 
            }
          </Form>
        }
      </Formik>
    )
  }
}

export default UserForm