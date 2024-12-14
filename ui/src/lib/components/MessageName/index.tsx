import { IconPointFilled } from "@tabler/icons-react";
import { messageName } from "./styles";

export interface MessageNameProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    isUnsaved?: boolean;
}

export default function MessageName({ label, isUnsaved, ...props }: MessageNameProps) {
    return (
        <div className={messageName} {...props}>
            {label}
            {isUnsaved && <IconPointFilled size={11} />}
        </div>
    )
}