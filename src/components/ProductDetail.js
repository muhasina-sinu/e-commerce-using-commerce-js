import { useEffect, useState,useContext } from "react";
import { useParams,useNavigate,Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import {stripHtml} from "string-strip-html";
import styles from '../styles/ProductDetail.module.css';
import { FaStar } from "react-icons/fa";

function ProductDetail() {
    const params = useParams();
    const id = params.productId;
    const {addToCart} = useContext(ProductContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const result = product.description ? stripHtml(product.description).result:"";
    
    
    

    function loadProductsById() {
        fetch('https://api.chec.io/v1/products/' + id ,{
            method:'GET',
            headers:{
                'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b'
            }}).then(response => {
            response.json().then(data => {
                setProduct(data);
                
            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            console.log(error);
        })
    }
    
    useEffect(() => {
        loadProductsById();
    }, [id])
    

    return (
        <>
            <div className={styles.container}>
                <img src={product.image?.url}></img>
                <div style={{textAlign:"left"}}>
                    <h3>{product.name}</h3>
                    {product.attributes && product.attributes.map(x =>
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
                        {product.attributes && product.attributes.map(x =>
                        x.value > 2.5 && x.value < 3.5 && (
                            <>
                            <FaStar style={{ color: "#F4A340" }} />
                            <FaStar style={{ color: "#F4A340" }} />
                            <FaStar style={{ color: "#F4A340" }}/>
                            <FaStar style={{ color:"grey" }}/>
                            <FaStar style={{ color:"grey" }}/>
                             
                        </>
                        ))}
                        {product.attributes && product.attributes.map(x =>
                        x.value > 3.5 && x.value < 4.5 && (
                            <>
                            <FaStar style={{ color: "#F4A340" }} />
                            <FaStar style={{ color: "#F4A340" }} />
                            <FaStar style={{ color: "#F4A340" }}/>
                            <FaStar style={{ color: "#F4A340" }}/>
                            <FaStar style={{ color:"grey" }}/>
                             
                        </>
                        ))}
                
                    
                    
                    
                    <hr/>
                    { product.price && (<h5>{product.price.formatted_with_symbol}</h5>)}
                    <p>All prices include VAT.</p>
                    <hr/>
                    <h4>About this item</h4>
                    {result && (<p>{result}</p>)}
                    <br/>
                    <Link to="/cart" className="btn btn-warning m-2" onClick={() => {addToCart(product)}}>
                         Add to Cart
                    </Link>
                    <a href="#" className="btn btn-warning m-2" onClick={()=>{navigate(-1);} }>Back to products</a>

                </div>
                
            </div>


        </>
    );
}

export default ProductDetail;