import './App.css'
import Layout from './Layouts/Layout';
import Home from './Pages/Home';

function App() {

  return (
      <div>
        <Layout>       {/** For Navbar and footer */}
          <Home/>
        </Layout>
      </div>
  );
}

export default App;
