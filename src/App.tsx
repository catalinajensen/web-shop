// libs
import { useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// internals
import Filters from './components/Filters';
import Header from './components/Header';
import Product from './components/Product';
import ShoppingCart from './components/ShoppingCart';
import { ctx } from './context';
import { initialState, reducerFn } from './hooks/reducer';
import { Product as ProductType } from './types';

function App() {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'ADD_PRODUCTS', payload: data }));
  }, []);

  useEffect(() => {
    localStorage.setItem('localCart', JSON.stringify(state.shoppingCart));
  }, [state.shoppingCart]);

  return (
    <ctx.Provider value={state}>
      <Header dispatch={dispatch} />
      {!state.products.length ? (
        <Container className="mb-4">
          <h2>Loading...</h2>
        </Container>
      ) : (
        <>
          <Container className="mb-4">
            <Row className="me-1">
              <Filters dispatch={dispatch} />
            </Row>
            <Row md={2} xs={1} lg={3} className="g-3">
              {state.filteredProducts?.map((product: ProductType) => (
                <Col key={product.id}>
                  <Product {...product} dispatch={dispatch}></Product>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}

      <ShoppingCart dispatch={dispatch} />
    </ctx.Provider>
  );
}

export default App;
