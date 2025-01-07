import { IconPointFilled } from "@tabler/icons-react";
import { messageName } from "./styles";

type MessageNameVariants = Exclude<Parameters<typeof messageName>[0], undefined>;
export interface MessageNameProps extends MessageNameVariants, React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    isUnsaved?: boolean;
}

export default function MessageName({ label, isUnsaved, size, withMargin, clickable, ...props }: MessageNameProps) {
    return (
        <div className={messageName({ size, withMargin, clickable })} {...props}>
            {label}
            {isUnsaved && <IconPointFilled size={11} />}
        </div>
    )
}