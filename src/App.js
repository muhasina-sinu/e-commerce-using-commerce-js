
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductContext from './context/ProductContext';


function App() {
  const [searchtext, updateSearch] = useState('');
  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCart] = useState("");

  function loadCart() {
    fetch('https://api.chec.io/v1/carts', {
      method: 'GET',
      headers: {
        'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b',

      }
    }).then(response => {
      response.json().then(data => {
        setCart(data.id)})
      
    })
      ;
  }
  useEffect(() => {
    loadCart();
  }, [])
  
  

  function addToCart(product) {
   
    fetch('https://api.chec.io/v1/carts/'+ cartId,{
             method:'POST',
             headers:{
                 'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
             id: product.id,
             quantity : 1

          }) 
  })
  }
  function fetchCart(){
    fetch('https://api.chec.io/v1/carts/' + cartId + '/items',{
      method:'GET',
      headers:{
        'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b'}
    }).then(response => {
      response.json().then(data => {
        setCartProducts(data);
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect( () => {
    fetchCart();
  },[])



  
  function onSearch(text) {
    updateSearch(text);
    
  }


  return (
    <div className="App">
      <ProductContext.Provider value={{addToCart ,cartId,cartProducts,fetchCart}}>
        <Header onSearch={onSearch} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/products' element={<ProductList searchtext={searchtext} />}></Route>
          <Route path='products/:productId' element={<ProductDetail />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        
        </Routes>
      </ProductContext.Provider>

    </div>
  );
}

export default App;
