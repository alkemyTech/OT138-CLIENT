import React from "react";
import { TableContainer, TableScroll, Table as TableStyled } from "./styles";
import { SkeletonTheme } from 'react-loading-skeleton'

export default function Table({ children }) {
    return (
        <TableContainer>
            <TableScroll>
                <TableStyled>
                    <SkeletonTheme baseColor="#d8d8d8" highlightColor="#eeeeee">
                        {children}
                    </SkeletonTheme>
                </TableStyled>
            </TableScroll>
        </TableContainer>
    );
}
