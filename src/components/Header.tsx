// libs
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

// internals
import { ctx } from '../context/index';
import cartIcon from '../icons/shopping-cart-icon.svg';
import { Action } from '../types';

interface HeaderProps {
  dispatch: React.Dispatch<Action>;
}

function Header({ dispatch }: HeaderProps) {
  const state = useContext(ctx);
  const shoppingCartItems = state?.shoppingCart.reduce((result, item) => {
    result = result + item.quantity;
    return result;
  }, 0);

  return (
    <Navbar
      sticky="top"
      className="bg-white mb-3 justify-content-end"
      style={{ borderBottom: '1px solid black' }}
    >
      <Container className="justify-content-end">
        <Button
          onClick={() => dispatch({ type: 'OPEN_CART', payload: true })}
          style={{ width: '3rem', height: '3rem', position: 'relative' }}
          variant="outline-primary"
        >
          <img src={cartIcon} alt="Cart icon" />
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: 'white',
              width: '1.5rem',
              height: '1.5rem',
              position: 'absolute',
              top: 0,
              right: 0,
              transform: 'translate(25%, -25%)'
            }}
          >
            {shoppingCartItems}
          </div>
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
