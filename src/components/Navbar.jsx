import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <h1>{props.id}</h1>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="about">About Us</Link>
        </li>
        <li>
          <Link to="testimonial">Testimonial</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;