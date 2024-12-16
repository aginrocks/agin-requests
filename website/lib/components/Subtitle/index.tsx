import { subtitle } from "./styles";

type SubtitleVariants = Exclude<Parameters<typeof subtitle>[0], undefined>;

export interface SubtitleProps extends SubtitleVariants {
    children?: React.ReactNode;
}


export default function Subtitle({ size, weight, color, children }: SubtitleProps) {
    return (
        <div className={subtitle({ size, weight, color })}>{children}</div>
    )
}