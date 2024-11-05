import { container } from "./styles";

export default function MenuContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className={container}>
            {children}
        </div>
    )
}