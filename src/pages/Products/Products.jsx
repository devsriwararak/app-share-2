import React from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div>
      Products
      <br />
      <Link to="/" className='underline'> * Dashboard</Link>
      </div>
  )
}

export default Products