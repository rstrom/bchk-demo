import Radium from 'radium'
import React from 'react'
import Markdown from 'react-remarkable'
import styles from '../global/styles'

@Radium
class Message extends React.Component {
  constructor (props) {
    super(props)
  }

  static simulate () {
    return null
  }

  render () {
    return (
      <div style={[styles.container]}>
        <Markdown
          source={this.props.body}
        />
      </div>
    )
  }
}

export default Message
