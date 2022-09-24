import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const TestimonialNav = () => {
  return (
    <>
        <Link to="/testimonial/1">Testimonial 1</Link>
        <br/>
        <br/>
        <Link to="/testimonial/2">Testimonial 2</Link>
        <br/>
        <Outlet/>
    </>
  )
}

export default TestimonialNav