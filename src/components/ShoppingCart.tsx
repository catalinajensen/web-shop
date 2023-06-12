// libs
import { useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';

// internals
import { ctx } from '../context/index';
import { formatCurrency } from '../utils/formatCurrency';
import { Action } from '../types';
import CartItem from './CartItem';

interface ShoppingCartProps {
  dispatch: React.Dispatch<Action>;
}

function ShoppingCart({ dispatch }: ShoppingCartProps) {
  const state = useContext(ctx);

  const isOpen: boolean = state?.isShoppingCartOpen as boolean;
  const shoppingCart = state?.shoppingCart || [];

  return (
    <Offcanvas
      show={isOpen}
      onHide={() => dispatch({ type: 'OPEN_CART', payload: false })}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {shoppingCart?.map((item) => (
            <CartItem
              key={item.product.id}
              id={item.product.id}
              dispatch={dispatch}
            />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{' '}
            {formatCurrency(
              shoppingCart?.reduce((result, item) => {
                result = result + item.product.price * item.quantity;
                return result;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
