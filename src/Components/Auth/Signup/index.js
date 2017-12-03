import React from 'react'
import { Link } from 'react-router-dom'

// Components
import SignupForm from './SignupForm'

// CSS
import './Signup.scss'

const styles = {
  wrapperStyle: {
    width: '400px',
    minHeight: '745px',
    margin: '0 auto'
  },
  headerStyles: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    margin: '48px 0'
  },
  linkStyles: {
    color: '#fff',
    margin: '48px auto 0',
    display: 'block',
    textAlign: 'center'
  }
}

const Signup = () => {
  return (
    <div style={styles.wrapperStyle}>
      <h1 style={styles.headerStyles}>
        Sign up for your account
      </h1>
      <SignupForm />
      <p
        style={styles.linkStyles}
      >
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  )
}

export default Signup
