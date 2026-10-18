import { Col, Row, Spinner } from "reactstrap"
import Header from "../components/Header"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { getAllProduct } from "../api/productApi"

const ProductList = () => {
        const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(()=>{
                const loadProducts = async () =>{
                        try {
                                const res = await getAllProduct();
                                setProducts(res.data);
                        } catch (err) {
                                console.log(err);
                        }finally{
                                setLoading(false)
                        }
                };

                loadProducts();
        }, [])
  return (
        <>
        <Header />
        <div style={{maxWidth:1160, margin:"0 auto", padding:"0 20px"}}>
                <div style={{fontFamily:"serif", marginTop:60}}>
                        <h4 style={{fontWeight:400, fontSize:15}} className="mb-4">
                                All Products
                        </h4>
                        {loading ? (
                                <div className="text-center py-5">
                                        <Spinner color="dark"/>
                                </div>
                        ) : products.length === 0 ? (
                                <p className="text-muted">No products available</p>
                        ) : (

                                <Row className="g-3">
                                        {products.map((product)=>(

                                                <Col md="3" xs="6" key={product.id}>
                                <ProductCard product={product} />
                                </Col>
                                        ))}
                        </Row>
        )}
                </div>
        </div>
        </>
  )
}

export default ProductList