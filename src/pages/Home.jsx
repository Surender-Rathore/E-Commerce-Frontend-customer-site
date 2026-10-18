import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getAllProduct } from "./../api/productApi";
import { getAllCatgories } from "../api/categoryApi";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProduct(),
          getAllCatgories(),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // jo pehle 4 products hain sirf wohi us section me show karne hain zyada nahi
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <Header />
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ fontFamily: "serif", marginTop: 60 }}>
          <div className="text-center mb-3">
            <p
              style={{
                fontWeight: 520,
              }}
              className="mb-2"
            >
              New Season
            </p>
            <h4
              style={{
                fontWeight: 520,
              }}
              className="mt-0 mb-1"
            >
              Everyday essentials, made to last
            </h4>
            <p style={{ fontWeight: 400 }} className="mt-0">
              Simple, well made goods for daily use
            </p>
            <Button
              color="dark"
              type="submit"
              onClick={() => navigate("/product")}
            >
              Shop now
            </Button>
          </div>
          <div className="ms-4 mt-5">
            <h4
              style={{
                fontWeight: 400,
                fontSize: 15,
              }}
            >
              Shop by category
            </h4>

            <Row className="g-3">
              {categories.map((category) => (
                <Col md="3" xs="6" className="text-center" key={category.id}>
                  <Card className="category-card text-center shadow-sm border border-secondary p-3">
                    <CardBody>{category.name}</CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div className="ms-4 mt-5">
            <h4 style={{ fontWeight: 400, fontSize: 15 }}>Featured products</h4>

            {loading ? (
              <div className="text-center py-4">
                <Spinner color="dark" />
              </div>
            ) : featuredProducts.length === 0 ? (
              <p className="text-muted">No products available</p>
            ) : (
              <Row className="g-3">
                {/* Card-1 */}
                {featuredProducts.map((product) => (
                  <Col
                    md="3"
                    xs="6"
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <ProductCard product={product}/>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
