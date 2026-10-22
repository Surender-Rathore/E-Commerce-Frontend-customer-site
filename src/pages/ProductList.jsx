import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
} from "reactstrap";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getAllProduct } from "../api/productApi";

const PAGE_SIZE = 9;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getAllProduct();
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageProducts = products.slice(start, start + PAGE_SIZE);

  // Changing Page
  const goToPage = (p) => {
    setPage(p);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Header />
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ fontFamily: "serif", marginTop: 60 }}>
          <h4 style={{ fontWeight: 400, fontSize: 15 }} className="mb-4">
            All Products
          </h4>
          {loading ? (
            <div className="text-center py-5">
              <Spinner color="dark" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-muted">No products available</p>
          ) : (
            <>
              <Row className="g-3">
                {products.map((product) => (
                  <Col
                    key={product.id}
                    xs={12 / Math.min(pageProducts.length, 2)}
                    md={12 / Math.min(pageProducts.length, 4)}
                  >
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {totalPages > 1 && (
                <Pagination className="d-flex justify-content-center mt-4">
                  {/* Previous page per disabled hai */}
                  <PaginationItem disabled={page === 1}>
                    <PaginationLink
                      previous
                      onClick={() => goToPage(page - 1)}
                    />
                  </PaginationItem>

                  {/* 1, 2, 3 .. page numbers, abhi wala page active dikhata hai */}

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <PaginationItem key={p} active = {p===page}>
                        <PaginationLink onClick={()=> goToPage(p)}>
                                {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  {/* Last Page per bhi disabled */}
                  <PaginationItem disabled = {page===totalPages}>
                        <PaginationLink onClick={()=> goToPage(page+1)}/>
                  </PaginationItem>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
