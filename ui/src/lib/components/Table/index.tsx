import { ReactNode } from 'react';
import Row from './Row';
import { css } from '@styled-system/css';

export type TableProps = {
    data: ReactNode[][];
}

export function Table({ data }: TableProps) {
    return (
        <div className={tableStyles}>
            {data.map((r, i) => <Row key={i} isLast={i == data.length - 1} data={r} />)}
        </div>
    )
}

const tableStyles = css({
    borderRadius: '10px',
    border: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
    overflow: 'hidden',
});