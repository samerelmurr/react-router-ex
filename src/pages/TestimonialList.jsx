import React from 'react'
import { useParams } from 'react-router-dom';

const TestimonialList = () => {
    const { id } = useParams();
  return (
    <div>
        <h1>TestimonialList {id}</h1>
    </div>
  )
}

export default TestimonialList