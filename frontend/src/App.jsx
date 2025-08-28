import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { AuthProvider } from "./context/authContext"; // ✅ Import AuthProvider

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="relative min-h-screen w-full overflow-hidden">
          <div className='fixed inset-0 -z-10'>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
          </div>

          <Navbar />
          <div className="mt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
