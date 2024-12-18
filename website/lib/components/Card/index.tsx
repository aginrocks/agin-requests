'use client';
import { card } from "./styles";
import { useState } from "react";
import { useMouse } from "@mantine/hooks";

type CardVariants = Exclude<Parameters<typeof card>[0], undefined>;

export interface CardProps extends CardVariants, React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    const classes = card();

    const [isHovered, setIsHovered] = useState(false);

    const { ref, x, y } = useMouse();

    return (
        <div className={`${classes.card} ${className}`} {...props} ref={ref} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {children}
            <div className={classes.blur} style={{
                left: x - 100,
                top: y - 75,
                opacity: isHovered ? 1 : 0,
            }}></div>
            <div className={classes.border}></div>
        </div>
    )
}