import React from 'react'
import { Figure, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserDashboard = () => {
  return (
    <Stack className="pt-3" direction="horizontal" gap={3}>
      <div>
        <Figure className="mb-0 d-flex align-items-center">
          <Figure.Image
            className="mb-0"
            width={50}
            height={50}
            alt="Bravery Logo"
            src="/images/bravery-logo.png"
          />
          &nbsp;
          <span className="text-uppercase fw-bolder">Bravery</span>
        </Figure>
      </div>
      <div className="ms-auto">
        <Link className="menu-link" to={'/'}>
          Home
        </Link>
        <Link className="menu-link" to={'/account/register'}>
          Register
        </Link>
      </div>
    </Stack>
  )
}

export default UserDashboard
