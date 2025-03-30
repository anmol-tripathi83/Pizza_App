import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import SignUp from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
import NotFound from './Pages/NotFound';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/auth/signup" element={<SignUp/>} />
          <Route path="/auth/login" element={<Login/>} />

          {/**When all above pagenot work then this Not found page directed */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
  );
}

export default App;
