import { divider } from "./styles";

export default function Divider({ vertical, isMainDivider }: { vertical?: boolean, isMainDivider?: boolean }) {
    return (
        <div className={divider({ vertical, isMainDivider })}>

        </div>
    )
}