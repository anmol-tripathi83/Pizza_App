import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import SignUp from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/auth/signup" element={<SignUp/>} />
          <Route path="/auth/login" element={<Login/>} />
        </Routes>
      </div>
  );
}

export default App;
