import { css } from "@/styled-system/css";
import { Card } from "../../Card";

export type FeatureHighlightProps = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function FeatureHighlight({ x, y, width, height }: FeatureHighlightProps) {
    // FIXME: Pointer events for the gradient
    return (
        <div className={highlight} style={{
            left: x,
            top: y,
            width,
            height,
        }}>
            <Card className={card}>

            </Card>
        </div>
    )
}

const highlight = css({
    position: 'absolute',
    // border: '1px solid token(colors.border)',
    // backgroundColor: '#ffffff05',
    // borderRadius: '10px',
    transition: 'all .5s ease',
    // pointerEvents: 'none',
    zIndex: -1,
    display: 'flex',
});

const card = css({
    flex: 1,
});