import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertBox = ({ alert, setAlert }) => {
  if (alert.show && alert.message && alert.variant) {
    return (
      <Alert
        variant={alert.variant || 'danger'}
        onClose={() =>
          setAlert({
            show: false,
            message: '',
          })
        }
        dismissible
      >
        {alert.message}
      </Alert>
    )
  }
}

export default AlertBox
