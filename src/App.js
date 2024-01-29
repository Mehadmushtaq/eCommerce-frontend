import { useSelector } from 'react-redux';
import PrimaryNavbar from './components/PrimaryNavbar';
import SecondaryNavbar from './components/SecondaryNavbar';
import Registration from './components/Registration';
import Login from './components/Login';
import { Routes, Route } from 'react-router';
import Home from './components/Home';
import Product from './components/Product';
import { Container } from '@mui/material';
import DrawerPage from './components/DrawerPage';

function App() {
  const users = useSelector((state) => state.users);

  return (
    <>
      <PrimaryNavbar />
      <SecondaryNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products/:id' element={<Product />} />
      </Routes>
    </>
    // <>
    //   <PrimaryNavbar />
    //   <SecondaryNavbar />
    //   <Registration />
    //   {/* <Login /> */}
    //   {users.map((user) => (
    //     <div key={user.id}>
    //       {user.firstName}-{user.email}
    //     </div>
    //   ))}

    //   {/* <Login /> */}
    // </>
  );
}

export default App;
