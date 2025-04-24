import './App.css'
import Layout from './components/layout.jsx'
import Signup from './components/signup.jsx'
import Login from './components/login.jsx'
import Home from './components/home.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
   <Layout>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign_up" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
   </Layout>
  )
}

export default App
