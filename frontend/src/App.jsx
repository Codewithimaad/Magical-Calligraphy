import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className='fixed inset-0 -z-10'>
        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      </div>

      <Navbar />
      <div className="mt-20">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
      {/* Router */}


      <Footer />


    </div>
  );
};

export default App;