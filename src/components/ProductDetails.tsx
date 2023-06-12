//libs
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

// internals
import { ctx } from '../context/index';
import starIcon from '../icons/star-icon.svg';
import { formatCurrency } from '../utils/formatCurrency';
import { Action, Product } from '../types';

type ProductDetailsProps = {
  isOpen: boolean;
  id: number;
  onHide: () => void;
  dispatch: React.Dispatch<Action>;
};

function ProductDetails({ isOpen, id, onHide, dispatch }: ProductDetailsProps) {
  const state = useContext(ctx);

  const product: Product = state?.products.find(
    (product) => product.id === id
  ) as Product;

  return (
    <Modal show={isOpen} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={6}>
              <img
                height="200px"
                width="200px"
                style={{
                  objectFit: 'contain'
                }}
                src={product.image}
                alt="product image"
              ></img>
            </Col>
            <Col xs={6}>{product.description}</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex">
          <span>{product.rating.rate}</span>
          <img src={starIcon} alt="Star icon" style={{ paddingLeft: 5 }} />
        </div>
        <div>
          <span className="me-2 text-muted">
            {formatCurrency(product.price)}
          </span>
          <Button
            variant="primary"
            onClick={() => {
              dispatch({ type: 'ADD_TO_CART', payload: product });
              onHide();
            }}
          >
            Add to cart
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductDetails;
