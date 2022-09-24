import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      // navigate('/');
      navigate(-2);
    }, 2000);
  }, []);

  return (
    <>
      <h1>Page Not Found</h1>
      {/* <Navigate to="/" /> */}
    </>
  )
}

export default PageNotFound;