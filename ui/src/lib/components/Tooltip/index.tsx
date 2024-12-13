import React, { useEffect, useRef, useState } from "react";
import { tooltip } from "./styles";
import { createPortal } from "react-dom";

export type TooltipProps = {
    label: string;
    children: React.ReactNode;
}

export default function Tooltip({ label, children }: TooltipProps) {
    const [visible, setVisible] = useState(false);

    const childRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseEnter = () => {
            setVisible(true);
        };

        const handleMosueLeave = () => {
            setVisible(false);
        };

        const node = childRef.current;
        if (node) {
            node.addEventListener('mouseenter', handleMouseEnter);
            node.addEventListener('mouseleave', handleMosueLeave);

            return () => {
                node.removeEventListener('mouseenter', handleMouseEnter);
                node.removeEventListener('mouseleave', handleMosueLeave);
            }
        }
    }, []);

    const getTooltipPosition = () => {
        const node = childRef.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();

        return {
            top: rect.top + rect.height + 5,
            left: rect.left,
            width: rect.width,
        }
    }

    const classes = tooltip({ opened: visible });

    const tooltipPosition = getTooltipPosition();

    return (
        <>
            {React.cloneElement(React.Children.only(children as React.ReactElement), {
                ref: childRef
            })}
            {createPortal(<>
                <div className={classes.container} style={{
                    position: 'absolute',
                    top: tooltipPosition?.top,
                    left: tooltipPosition?.left,
                    width: tooltipPosition?.width,
                }}>
                    <div className={classes.tooltip}>
                        {label}
                    </div>
                </div>
            </>, document.body)}
        </>
    )
}