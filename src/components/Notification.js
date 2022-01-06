import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  //mik‰li notificaatio on annettu, n‰ytet‰‰n se, muutoin palautetaan null
  if (props.notification === '') {
    return null
  }
  return (
    <div style={style}>
      { props.notification }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.anecdote
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)
export default ConnectedNotification