import { inputContainer } from "../Input/styles"
import { select } from "./styles"

export type Option = {
    value: string,
    label: string,
}
export default function Select({ options, withLeftBorder, withRightBorder, withLeftRadius, withRightRadius, ...props }: { options: Option[], withLeftBorder?: boolean, withRightBorder?: boolean, withLeftRadius?: boolean, withRightRadius?: boolean, }) {
    return (
        <div className={inputContainer({ withLeftBorder, withRightBorder, withLeftRadius, withRightRadius })}>
            <select {...props} className={select}>
                {options.map((o: Option) => <option value={o.value} key={o.value}>{o.label}</option>)}
            </select>
        </div>
    )
}