import styled from "@emotion/styled";

export const Table = styled.table`
    margin-top: 2px;
    box-sizing: border-box;
    text-align: center;
    border-collapse: separate
    border-style: hidden;
    width: 100%;
    overflow-x: auto;
    table-layout: fixed;

    thead th {
        padding: 10px;
        background: #ddd;
    }
    
    tbody td {
        padding: 10px;
        word-wrap: break-word;
    }

    tbody tr:nth-child(odd) {
        background: #eee;
    }

    tbody tr:last-child {
        border-bottom: 2px solid #ddd;
    }

    @media (min-width: 850px) {
        table-layout: auto;
    }
`;