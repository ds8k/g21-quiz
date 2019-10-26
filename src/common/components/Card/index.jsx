import React from 'react'
import { Paper } from 'material-bread'

import commonStyles from '../../styles'
import styles from './styles'

export const Card = ({ style = {}, ...props }) => (
  <Paper
    style={[commonStyles.marginHorizontal, styles.card, style]}
    shadow={4}
    {...props}
  />
)
