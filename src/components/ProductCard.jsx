import { useNavigate } from "react-router"
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

const ProductCard = ({ product }) => {
        const navigate = useNavigate();
  return (

        <Card
        className="category-card shadow-sm border border-secondary p-3"
        style={{
                cursor:"pointer"
        }}
        onClick={()=> navigate(`/product/${product.id}`)}
        >
                <CardImg top src={product.image} style={{
                        height:140,
                        objectFit:"cover"
                }}/>
                <CardBody>
                        <CardTitle tag="h6">{product.name}</CardTitle>
                        <CardText>Rs. {product.price}</CardText>
                </CardBody>
        </Card>
  )
}

export default ProductCard