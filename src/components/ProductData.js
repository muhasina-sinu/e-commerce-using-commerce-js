import '../styles/ProductData.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import { FaStar } from "react-icons/fa";

function ProductData(props) {
  const product = props.product;
  const navigate = useNavigate();
  const { addToCart } = useContext(ProductContext);
  const [products, setProducts] = useState({});

  function loadProductsById() {
    fetch('https://api.chec.io/v1/products/' + product.id ,{
        method:'GET',
        headers:{
            'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b'
        }}).then(response => {
        response.json().then(data => {
            setProducts(data);
            
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
        console.log(error);
    })
}

useEffect(() => {
    loadProductsById();
}, [product.id])

  return (

   

      
        <div className="card" >
          <div className="imagediv">
            
            <NavLink to={"/products/" + product.id} ><img src={product.image?.url} className="image" /> </NavLink>
          </div>
          <div className="cardbody">
            <h5>
              <NavLink className='title' to={"/products/" + product.id} >{product.name}</NavLink></h5>
              {products.attributes && products.attributes.map(x =>
                        x.value > 1.5 && x.value < 2.5 && (
                        
                            <>
                              <FaStar style={{ color: "#F4A340" }} />
                              <FaStar style={{ color: "#F4A340" }} />
                              <FaStar style={{ color:"grey" }}/>
                              <FaStar style={{ color:"grey" }}/>
                              <FaStar style={{ color:"grey" }}/>
                            </>
                          )
                        )}
                        {products.attributes && products.attributes.map(x =>
                        x.value > 2.5 && x.value < 3.5 && (
                            <>
                            <FaStar style={{ color: "#F4A340" }} />
                            <FaStar style={{ color: "#F4A340" }} />
                            <FaStar style={{ color: "#F4A340" }}/>
                            <FaStar style={{ color:"grey" }}/>
                            <FaStar style={{ color:"grey" }}/>
                             
                        </>
                        ))}
                        {products.attributes && products.attributes.map(x =>
                        x.value > 3.5 && x.value < 4.5 && (
                            <>
                            <FaStar style={{ color: "#F4A340" }} />
                            <FaStar style={{ color: "#F4A340" }} />
                            <FaStar style={{ color: "#F4A340" }}/>
                            <FaStar style={{ color: "#F4A340" }}/>
                            <FaStar style={{ color:"grey" }}/>
                             
                        </>
                        ))}
            
            <h5>{product.price.formatted_with_symbol}</h5>
            <Link to="/cart" className="btn btn-dark" onClick={() => { addToCart(product) }}>
              Add to Cart
            </Link>
          </div> 
        </div>
      
      

  );
}

export default ProductData;
