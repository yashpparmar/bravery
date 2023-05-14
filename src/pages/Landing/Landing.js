import React from 'react'

import './Landing.scss'
import Header from '../../components/Header'

const Landing = () => {
  return (
    <>
      <Header />
      <section className="main-section">
        <div className="container d-flex align-items-center flex-column">
          <h1 className="text-uppercase mb-0">Bravery</h1>
          <p className="font-weight-light mb-0">BE AWARE</p>
          <p className="font-weight-light mb-0">BE SAFE</p>
        </div>
      </section>
    </>
  )
}

export default Landing
