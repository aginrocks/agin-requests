import { group } from "./styles";

export default function ParamsGroup({ children }: { children: React.ReactNode }) {
    return (
        <div className={group}>
            {children}
        </div>
    )
}