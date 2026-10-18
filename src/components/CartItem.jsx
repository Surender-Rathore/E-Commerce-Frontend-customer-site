import { Card, CardBody, CardImg } from "reactstrap";
import { FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const product = item.product;

  return (
    <Card>
      <CardBody
        style={{
          minHeight: 100,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <CardImg
              src={product.image}
              style={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
            <h3 style={{ fontSize: 15 }} className="mb-0">
              {product.name}
            </h3>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="me-3 border-0 shadow-0"
              onClick={() => onUpdateQuantity(product.id, item.quantity, -1)}
            >
              -
            </button>
            {item.quantity}
            <button
              className="ms-3 border-0 shadow-0"
              onClick={() => onUpdateQuantity(product.id, item.quantity, 1)}
            >
              +
            </button>
            <p className="mb-0 ms-3 fw-bold" style={{ fontSize: 15 }}>
              Rs. {(product.price * item.quantity).toLocaleString()}
            </p>

            <FiTrash2
              size={18}
              className="ms-3"
              style={{ cursor: "pointer", color: "#dc3545" }}
              onClick={() => onRemove(product.id)}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartItem;
