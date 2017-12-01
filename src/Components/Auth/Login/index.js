import React from 'react'
import { Link } from 'react-router-dom'

// Components
import LoginForm from './LoginForm'

const styles = {
  wrapperStyle: {
    width: '400px',
    minHeight: '745px',
    margin: '0 auto'
  },
  appNameStyles: {
    fontSize: '36px',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
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

const Login = () => (
  <div style={styles.wrapperStyle}>
    <div style={{ height: '48px' }} />
    <h1 style={styles.appNameStyles}>
      QUARTZ
    </h1>

    <h1 style={styles.headerStyles}>
      Log in to your account
    </h1>

    <LoginForm />

    <Link to={{ pathname: '/auth/forgot' }} style={styles.linkStyles}>
      Can't log in?
    </Link>

    <Link to={{ pathname: '/auth/signup' }} style={styles.linkStyles}>
      Sign up for an account
    </Link>
  </div>
)

export default Login
