import { cva } from "@styled-system/css";
import { ReactNode } from "react";

export type CellProps = {
    children: ReactNode;
    isLast?: boolean;
}

export default function Cell({ children, isLast }: CellProps) {
    return (
        <div className={cellStyles({ isLast })}>
            {children}
        </div>
    )
}

const cellStyles = cva({
    base: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        padding: '0 12px',
        wordBreak: 'break-all',
    },
    variants: {
        isLast: {
            false: {
                borderRight: 'calc(var(--border-width)* 1px) solid var(--dropdown-border)',
            }
        }
    }
});