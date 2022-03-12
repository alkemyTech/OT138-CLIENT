import React from "react";
import { TableContainer, TableScroll, Table as TableStyled } from "./styles";

export default function Table({ children }) {
    return (
        <TableContainer>
            <TableScroll>
                <TableStyled>
                    {children}
                </TableStyled>
            </TableScroll>
        </TableContainer>
    );
}
