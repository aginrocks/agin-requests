import { divider } from "./styles";

export default function Divider({ vertical, isMainDivider, withMargin }: { vertical?: boolean, isMainDivider?: boolean, withMargin?: boolean }) {
    return (
        <div className={divider({ vertical, isMainDivider, withMargin })}>

        </div>
    )
}