import React from 'react'

// Components
import ForgotForm from './ForgotForm'
import { Link } from 'react-router-dom'

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

const Forgot = () => (
  <div style={styles.wrapperStyle}>
    <div style={{ height: '48px' }} />

    <h1 style={styles.appNameStyles}>
      QUARTZ
    </h1>

    <h1 style={styles.headerStyles}>
      Forgot your password?
    </h1>

    <ForgotForm />

    <Link to={{ pathname: '/auth/login' }} style={styles.linkStyles}>
      Return to log in
    </Link>
  </div>
)

export default Forgot
