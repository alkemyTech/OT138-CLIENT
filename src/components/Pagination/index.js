import React from 'react';

export default function Pagination({currentPage, totalPages, onPageChange}) {
    return (
        <div>
            {
                [...Array(totalPages)].map((_, index) => {
                    return <button disabled={currentPage===index+1} onClick={() => onPageChange(index+1)}>{index+1}</button>
                })
            }
        </div>
    );
}