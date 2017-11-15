import React from 'react'

// CSS
import './Styleguide.scss'

// Grid
import { Container } from 'react-grid-system'

// Components
import { Colors, Typography, Elements } from './Sections'

const Styleguide = () => (
  <Container styleName='styleguide'>
    <Colors />
    <Typography />
    <Elements />
  </Container>
)

export default Styleguide
