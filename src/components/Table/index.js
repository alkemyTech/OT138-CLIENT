import React from 'react';
import { Table } from './styles';

export default function ({ headers, data, accessors }) {
    return (
        <Table>
            <thead>
                <tr>
                    {
                        headers.map((text, index) => <th key={index}>{text}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {
                                    accessors.map((a, dataIndex) => {
                                        return (
                                            <td key={`${rowIndex}_${dataIndex}`}>
                                                {
                                                    a.applyFunction ? a.applyFunction(row[a.name]) : row[a.name]
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}