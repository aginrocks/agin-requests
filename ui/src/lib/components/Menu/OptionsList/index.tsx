import { listStyles } from "./styles";

export function OptionsList({ children }: { children: React.ReactNode }) {
    return (
        <div className={listStyles}>
            {children}
        </div>
    )
}