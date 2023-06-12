// libs
import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';

// internals
import { ctx } from '../context/index';
import { Action } from '../types';

interface FiltersProps {
  dispatch: React.Dispatch<Action>;
}

function Filters({ dispatch }: FiltersProps) {
  const state = useContext(ctx);
  const [title, setTitle] = useState<string>('');

  return (
    <Container className="mb-4 d-flex justify-content-end">
      <Form className="me-2">
        <Form.Control
          type="text"
          placeholder="Search product"
          onChange={(e) => {
            dispatch({ type: 'SEARCH', payload: e.target.value });
            setTitle('');
          }}
        />
      </Form>
      <DropdownButton
        title={'Choose category'}
        variant="secondary"
        style={{ width: '150px' }}
      >
        <Dropdown.Item
          style={{ textTransform: 'capitalize', width: '150px' }}
          active={!title}
          onClick={() => {
            setTitle('');
            dispatch({
              type: 'FILTER_BY_CATEGORY',
              payload: ''
            });
          }}
        >
          All
        </Dropdown.Item>
        {state?.categories.map((category, index) => {
          return (
            <Dropdown.Item
              key={index}
              style={{ textTransform: 'capitalize', width: '150px' }}
              active={category === title}
              onClick={() => {
                setTitle(category);
                dispatch({
                  type: 'FILTER_BY_CATEGORY',
                  payload: category
                });
              }}
            >
              {category}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </Container>
  );
}

export default Filters;
