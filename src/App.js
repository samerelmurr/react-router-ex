import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { HomePage, AboutUsPage, TestimonialPage } from './pages';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutUsPage/>} />
        <Route path="/testimonial" element={<TestimonialPage/>} />
      </Routes>
    </>
  );
}

export default App;
