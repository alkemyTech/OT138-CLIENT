import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from '@emotion/styled';

export default function Pagination({ onPageChange, totalPages }) {

    function handlePageChange(event) {
        onPageChange(event.selected+1);
    }

    return (
        <StyledPagination
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            breakLabel="..."
            activeClassName="activePage"
            previousLabel="❮"
            nextLabel="❯"
        />
    );
}

const StyledPagination = styled(ReactPaginate)`
    display: flex;
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