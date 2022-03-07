import React from 'react';

export default function({children}) {
    return (
        <div>
            {children}
        </div>
    )
}

export function Header({children}) {
    return (
        <div>
            {children}
        </div>
    );
}

export function Body({children}) {
    return (
        <div>
            {children}
        </div>
    );
}