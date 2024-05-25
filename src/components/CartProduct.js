import ProductContext from '../context/ProductContext';
import { useContext } from 'react';
import {  Link } from 'react-router-dom';

function CartProduct(props) {
    const prod = props.data;
    const { cartId,fetchCart } = useContext(ProductContext);
    
    
    
    

    function deleteFromCart(product,fetchCart){
        fetch('https://api.chec.io/v1/carts/'+ cartId+'/items/'+ product.id,{
            method:'DELETE',
            headers:{
              'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b'}
          }).then(response => {
            fetchCart();
          }).catch(error => {
            console.log(error);
          })
        
    }


     function quantityChange(product,event) {
        const newQuantity = parseInt(event.target.textContent);
        fetch("https://api.chec.io/v1/carts/"+ cartId+'/items/'+ product.id,{
            method:'PUT',
            headers:{
              'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b',
              "Content-Type": "application/json"},
            body: JSON.stringify({
                quantity: newQuantity
        })}).catch(error => {
            console.log(error);
        })
   
     }
    
    return ( 
        <>
        <hr className="mt-0"></hr>
        <div className="ms-3 pe-3 row pb-2 w-100" style={{height:"180px",gap:"10px"}}>
            <div className="col-3 mb-2 " style={{backgroundColor:"#f7f7f7",height:"100%"}}> 
                <img src={prod.image.url} className="p-2"style={{height:"100%",objectFit:"contain"}} alt="..."/>
            </div>  
            <div className="col-6 d-flex flex-column " style={{gap:"30px"}}>
                <h5 className="fw-bolder text-start ">{prod.name}</h5>
                <div className="d-flex" style={{gap:"20px"}}>
                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Qty : {prod.quantity}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={(event) => quantityChange(prod, event)}>1</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(event) => quantityChange(prod, event)}>2</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(event) => quantityChange(prod, event)}>3 </a></li>
                        </ul>
                    </div>
                    <Link to="/cart" className="align-self-end" style={{textDecoration:"none"}} onClick={() => {deleteFromCart(prod,fetchCart)}}>Delete</Link>
                </div>
            </div>
            <h6 className="fw-bolder text-danger col-1" style={{width:"15%"}}> {prod.price.formatted_with_symbol}</h6>
            
            
        </div>
        
        </>
     );
}

export default CartProduct;