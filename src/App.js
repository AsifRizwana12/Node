import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CardProvider } from "./components/ContextReducer";
import  MyOrder  from "./screens/MyOrder";

function App() {
  return (
    <CardProvider>
      <Router>
        <div> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CardProvider>
  );
}

export default App;
