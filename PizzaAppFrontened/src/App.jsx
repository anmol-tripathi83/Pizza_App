import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import SignUp from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
import NotFound from './Pages/NotFound';
import Denied from './Pages/Denied';
import AddProduct from './Pages/Admin/Addproduct';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/denied" element={ <Denied/> } />
          <Route path="/auth/signup" element={<SignUp/>} />
          <Route path="/auth/login" element={<Login/>} />

          <Route path="/admin/addProduct" element={<AddProduct/>} />

          {/**When all above pagenot work then this Not found page directed */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
  );
}

export default App;
