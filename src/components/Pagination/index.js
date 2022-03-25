import React from 'react';
import ReactPaginate from 'react-paginate';
import { Select } from '../Inputs';
import styled from '@emotion/styled';

export default function Pagination({ onPageChange, totalPages, forcePage }) {

  function handlePageChange(event) {
    onPageChange(event.selected + 1);
  }

  return (
    <StyledPagination
      onPageChange={handlePageChange}
      pageRangeDisplayed={1}
      pageCount={totalPages}
      breakLabel="..."
      activeClassName="activePage"
      previousLabel="❮"
      nextLabel="❯"
      forcePage={forcePage===undefined ? undefined: (forcePage-1)}
    />
  );
}

export function SelectLimit({ onSelect, options = [10, 15, 25] }) {
  return (
    <StyledSelectLimit>
      <span>Mostrar</span>
      <select onChange={event => onSelect(event.target.value)}>
        {
          options.map((opt, index) => (
            <option key={index} value={opt}>{opt}</option>
          ))
        }
      </select>
    </StyledSelectLimit>
  )
}

const StyledSelectLimit = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  select {
    padding: 5px;
    margin: 0;
    border-radius: 5px;
    font-size: 1.1rem;
  }
`;

const StyledPagination = styled(ReactPaginate)`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    justify-content: center;

    li {
        display: flex;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    li > a  {
        margin: 0;
        padding: 10px;
        min-width: 40px;
        min-height: 40px;
        display: block;
    }

    li:hover {
        opacity: 0.9;
    }

    li.activePage {
        border: 1px solid #777;
        border-radius: 5px;
    }

    li.previous.disabled,li.next.disabled {
        color: #888;
    }
`;