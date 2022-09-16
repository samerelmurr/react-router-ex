import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
    <ul>
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