import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Pages } from './pages/pages';


function App() {
  return (
    <>
      <Navbar id="10"/>
      <Routes>
        <Route path="/" element={<Pages.HomePage/>} />
        <Route path="/about" element={<Pages.AboutUsPage/>} />
        <Route path="/testimonial" element={<Pages.TestimonialNav/>}>
          <Route index element={<Pages.TestimonialPage/>} />
          <Route path=":id" element={<Pages.TestimonialListPage/>} />
          <Route path="new" element={<Pages.NewTestimonial/>} />
        </Route> 
        {/* <Route path="/testimonial" element={<Pages.TestimonialPage/>} />
        <Route path="/testimonial/:id" element={<Pages.TestimonialListPage/>} />
        <Route path="/testimonial/new" element={<Pages.NewTestimonial/>} /> */}
        <Route path="*" element={<Pages.NotFound />} />
      </Routes>
    </>
  );
}

export default App;
