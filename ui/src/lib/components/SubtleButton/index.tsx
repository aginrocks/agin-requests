import React, { HTMLAttributes } from 'react';
import { subtleButton } from './styles';

export interface SubtleButtonProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export default function SubtleButton({ children, ...props }: SubtleButtonProps) {
    return (
        <div className={subtleButton} {...props}>
            {children}
        </div>
    )
}