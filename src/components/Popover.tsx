import React from 'react';

interface PopoverProps {
    position: { x: number; y: number };
    children: React.ReactNode;
}

const Popover = ({ position, children }: PopoverProps) => {
    const popoverStyle: React.CSSProperties = {
        position: 'fixed',
        top: `${position.y}px`,
        left:`${position.x}px`,
        transform: 'translate(-50%, -100%)',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        pointerEvents: 'none',
        cursor: 'pointer'
    };

    return <div style={popoverStyle}>{children}</div>;
};

export default Popover;
