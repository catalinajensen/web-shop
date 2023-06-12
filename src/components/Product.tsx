// libs
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// internals
import { ctx } from '../context/index';
import starIcon from '../icons/star-icon.svg';
import { formatCurrency } from '../utils/formatCurrency';
import { Action, Product as ProductType } from '../types';
import ProductDetails from './ProductDetails';

interface ProductProps {
  id: number;
  dispatch: React.Dispatch<Action>;
}

function Product({ id, dispatch }: ProductProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const state = useContext(ctx);

  const product: ProductType = state?.products.find(
    (product) => product.id === id
  ) as ProductType;

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.image}
        height="200px"
        style={{
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => setIsModalOpen(true)}
      />
      <Card.Body
        className="d-flex flex-column"
        style={{ position: 'relative', height: '10rem' }}
      >
        <Card.Text
          className="d-flex justify-content-between align-items-baseline mb-4"
          style={{ height: '10rem' }}
        >
          <span
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {product.title}
          </span>
          <span className="ms-2 text-muted">
            {formatCurrency(product.price)}
          </span>
        </Card.Text>
        <Card.Text>
          <span style={{ textTransform: 'capitalize' }}>
            {product.category}
          </span>
        </Card.Text>
        <div className="d-flex justify-content-between align-items-baseline">
          <div className="d-flex">
            <span>{product.rating.rate}</span>
            <img src={starIcon} alt="Star icon" style={{ paddingLeft: 5 }} />
          </div>
          <Button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
          >
            Add to cart
          </Button>
        </div>
      </Card.Body>
      <ProductDetails
        isOpen={isModalOpen}
        id={id}
        onHide={() => setIsModalOpen(false)}
        dispatch={dispatch}
      />
    </Card>
  );
}

export default Product;
