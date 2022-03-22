import styled from "@emotion/styled";

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Table = styled.table`
  border-radius: 5px;
  min-width: 350px;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  th {
    padding: 10px;
    background: #ddd;
    max-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  td {
    padding: 10px;
    white-space: pre;
    .parent {
      display: flex;
    }
    .child {
      flex: 1;
      width: 100px;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  }
  tr:nth-of-type(odd) {
    background: #eee;
  }
  tbody tr:last-child {
    border-bottom: 2px solid #ddd;
  }
  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

export const TableScroll = styled.div`
  overflow-x: auto;
  border-radius: 4px;
`;
