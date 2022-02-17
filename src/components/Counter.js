import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOne, extOne } from '../actions/exampleActions';

export default function Counter() {
    const dispatch = useDispatch();

    let amount = useSelector((state) => state.exampleStore.amount);

    function butAdd(e) {
        e.preventDefault();

        dispatch(addOne());
    };

    function butExt(e) {
        e.preventDefault();

        dispatch(extOne());
    };

    return (
        <div>
            <p>This is a Counter</p>
            <p>{amount}</p>
            <div>
                <button onClick={(e) => butExt(e)}>-</button>
                <button onClick={(e) => butAdd(e)}>+</button>
            </div>
        </div>
    )
};