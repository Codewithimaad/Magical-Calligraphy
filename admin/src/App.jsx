import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const App = () => {
  return (
    <AuthProvider>
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        </div>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Login />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
