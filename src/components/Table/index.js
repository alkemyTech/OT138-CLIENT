import React from "react";
import { TableContainer, TableScroll, Table } from "./styles";

export default function Table({ children }) {
    return (
        <TableContainer>
            <TableScroll>
                <Table>
                    {children}
                </Table>
            </TableScroll>
        </TableContainer>
    );
}
