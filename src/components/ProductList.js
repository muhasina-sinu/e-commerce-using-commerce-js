import { useState, useEffect } from "react";
import ProductData from "./ProductData";
import { Link } from "react-router-dom";


function ProductList(props) {
    const searchtext = props.searchtext;
    const [productlist, setProductList] = useState([]);
    const [categorylist, setCategoryList] = useState([]);
    


    function loadProducts() {
        fetch('https://api.chec.io/v1/products?limit=25', {
            method: 'GET',
            headers: {
                'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b'
                
            }
        }).then(response => {
            response.json().then(data => {
                setProductList(data.data);
            }).catch(error => { console.log(error) });
        }).catch(error => { console.log(error) });
    }

    useEffect(() => {
        loadProducts();
    }, [searchtext])

    function loadCategories() {
        fetch('https://api.chec.io/v1/categories', {
            method: 'GET',
            headers: {
                'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b'
            }
        }).then(response => {
            response.json().then(data => {
                setCategoryList(data.data);
            }).catch(error => { console.log(error) });
        }).catch(error => { console.log(error) });
    }
    useEffect(() => {
        loadCategories();
    }, [])

    function loadProductsByCategory(category) {
        fetch('https://api.chec.io/v1/products?category_slug=' + category.slug, {
            method: 'GET',
            headers: {
                'X-Authorization': 'pk_56634972dd972cf8582e8268bc78ab428975c66991c9b'
            }
        })
        .then(response => response.json())
        .then(data => 
            
            setProductList(data.data)
            )
        .catch(error => console.log(error));
    }
    
    const filtered = productlist.filter(p => {

        return p.name.toLowerCase().includes(searchtext.toLowerCase());

    })
    
    return (<>
        <div className="container-fluid d-flex flex-row" >
            <div className="ps-md-2 pe-1 mt-3 text-start" style={{ width: "18em", borderRight: "1px solid grey"}}>
                <h4 className="mb-4">Category</h4>
                {categorylist.map(category => {
                     
                    return <div >
                        <h6 className="mt-2 fw-bold">{category.name}</h6>
                        {category.children.map(child => 
                            <div className="ms-3">
                                <Link to='/products' style={{textDecoration:"none",color:"black"}} onClick={()=> loadProductsByCategory(child) }>{child.name}</Link>
                            </div>
                        )}
                     </div> 
                })}
                    
                
            </div>


            <div className="d-flex flex-row justify-content-start flex-wrap py-4 ps-4" style={{gap:"20px",width:"78em"}}>


                {
                    filtered.map(x => {
                        
                        return <ProductData product={x} />
                    })
                }
            </div>
        </div>



    </>);
}

export default ProductList;
