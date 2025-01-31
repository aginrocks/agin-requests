import { group } from "./styles";

export default function Container({ children }: { children?: React.ReactNode }) {
    return (
        <div className={group}>
            {children}
        </div>
    )
}