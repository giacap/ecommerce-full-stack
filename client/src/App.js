import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navigation from './components/Navigation'
import Home from './components/Home'
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'
import AddProduct from './components/AddProduct'
import Account from './components/Account'
import Orders from './components/Orders'
import DeleteProduct from './components/DeleteProduct'
import UpdateProduct from './components/UpdateProduct'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";




function App() {
  return (

    <Router>
      <Container className="bg-light min-vh-100 text-dark pt-3 d-flex flex-column justify-content-between" fluid >
        
        <Navigation />

        <Route path='/' exact component={Home}/>

        <Route path='/signup' exact component={SignUp} />

        <Route path='/login' exact component={Login} />

        <Route path='/product/:id' exact component={ProductPage} />

        <Route path='/cart' exact component={Cart} />

        <Route path='/account' exact component={Account} />




        {/* admin */}
        <Route path='/addproduct' exact component={AddProduct}/>

        <Route path='/orders' component={Orders} />

        <Route path='/deleteproduct' component={DeleteProduct} />

        <Route path='/updateproduct' component={UpdateProduct} />

        <Footer />

      </Container>
    </Router>
  );
}

export default App;
