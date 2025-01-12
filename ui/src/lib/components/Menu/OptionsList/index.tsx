import { listStyles } from "./styles";

type OptionsListVariants = Exclude<Parameters<typeof listStyles>[0], undefined>;

export interface OptionsListProps extends OptionsListVariants {
    children: React.ReactNode;
}

export function OptionsList({ children, radius }: OptionsListProps) {
    return (
        <div className={listStyles({ radius })}>
            {children}
        </div>
    )
}