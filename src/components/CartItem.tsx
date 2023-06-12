// libs
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// internals
import { ctx } from '../context/index';
import { formatCurrency } from '../utils/formatCurrency';
import { Action } from '../types';

type CartItemProps = {
  id: number;
  dispatch: React.Dispatch<Action>;
};

function CartItem({ id, dispatch }: CartItemProps) {
  const state = useContext(ctx);

  const item = state?.shoppingCart.find((item) => item.product.id === id);

  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2}>
      <div>
        <img
          src={item?.product.image}
          alt="cart image"
          style={{ width: '125px', height: '75px', objectFit: 'contain' }}
        />
      </div>

      <div className="me-auto">
        <div>
          <span style={{ fontSize: '12px' }}>{item.product.title}</span>
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatCurrency(item.product.price)}
          <div>
            <span
              style={{
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
              onClick={() =>
                dispatch({
                  type: 'REMOVE_FROM_CART',
                  payload: item.product.id
                })
              }
            >
              Remove
            </span>
          </div>
        </div>
        <div></div>
      </div>
      <div className="d-flex align-items-center">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() =>
            dispatch({
              type: 'REMOVE_ONE_FROM_CART',
              payload: item.product.id
            })
          }
        >
          -
        </Button>
        <span className="ms-2 me-2">{item.quantity}</span>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() =>
            dispatch({ type: 'ADD_TO_CART', payload: item.product })
          }
        >
          +
        </Button>
      </div>
    </Stack>
  );
}

export default CartItem;
