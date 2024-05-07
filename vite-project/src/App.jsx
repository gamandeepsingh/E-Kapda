import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/noPage/NoPage';
import MyState from './context/data/MyState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import Allproducts from './pages/allProducts/AllProducts';

function App() {
  
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/order" element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
        } />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={
          <AdminProtectedRoute>
            <Dashboard/>
          </AdminProtectedRoute>
        } />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/allproducts" element={<Allproducts/>} />
        <Route path="/productinfo/:id" element={<ProductInfo/>} />
        <Route path="/addproduct" element={
          <AdminProtectedRoute>
            <AddProduct/>
          </AdminProtectedRoute>
        } />
        <Route path="/updateproduct" element={
          <AdminProtectedRoute>
            <UpdateProduct/>
          </AdminProtectedRoute>
        } />
        <Route path="/*" element={<NoPage/>} />
      </Routes>
    </Router>
    </MyState>
  )
}

export default App

//user protected route

export const ProtectedRoute = ({children}) =>{
  const user = localStorage.getItem('user');
  if(user){
    return children;
  }
  else{
    return <Navigate to="/login"/>
  }
}

// admin protected route

export const AdminProtectedRoute = ({children}) =>{
  const admin = JSON.parse(localStorage.getItem('user'));
  if(admin?.email === "jhadu4@gmail.com"){
    return children;
  }
  else{
    return <Navigate to="/login"/>
  }
}