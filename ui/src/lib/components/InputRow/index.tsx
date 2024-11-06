import SimpleInput, { SimpleInputProps } from "../SimpleInput";
import { labelStyles, param } from "./styles";

export interface InputRowProps extends SimpleInputProps {
    label?: string,
}

export default function InputRow({ label, ...props }: InputRowProps) {
    return (
        <div className={param}>
            <div className={labelStyles}>{label}</div>
            <SimpleInput {...props} />
        </div>
    )
}