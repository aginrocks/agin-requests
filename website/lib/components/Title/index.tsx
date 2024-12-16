import { title } from "./styles";

type TitleVariants = Exclude<Parameters<typeof title>[0], undefined>;

export interface TitleProps extends TitleVariants {
    children?: React.ReactNode;
}

export default function Title({ size, weight, color, children }: TitleProps) {
    return (
        <div className={title({ size, weight, color })}>{children}</div>
    )
}