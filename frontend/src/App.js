import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeItem from "./components/RecipeItem"



function App() {
  return (
    <>
    
    <Router>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile/" element={<Profile />}/>
                <Route path="/recipe/:recipeId" element={<RecipeItem />}/>
            </Routes>
        </div>
    </Router>
    <ToastContainer />
   </>
  );
}

export default App;
