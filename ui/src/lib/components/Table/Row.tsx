import { ReactNode } from 'react';
import Cell from './Cell';
import { cva } from '@styled-system/css';

export type RowProps = {
    data: ReactNode[];
    isLast?: boolean;
}

export default function Row({ data, isLast }: RowProps) {
    return (
        <div className={rowStyles({ isLast })}>
            {data.map((c, i) => <Cell key={i} isLast={i == data.length - 1}>{c}</Cell>)}
        </div>
    )
}

const rowStyles = cva({
    base: {
        minH: '36px',
        display: 'flex',
        flexGrow: 'grow',
        alignItems: 'center',
        width: '100%',
        transition: 'background-color .3s ease',
        // '&:hover': {
        //     backgroundColor: 'var(--vscode-list-hoverBackground)'
        // }
    },
    variants: {
        isLast: {
            false: {
                borderBottom: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
            }
        }
    }
});