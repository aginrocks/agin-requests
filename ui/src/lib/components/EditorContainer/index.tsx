import { container } from "./styles";

export default function EditorContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className={container}>
            {children}
        </div>
    )
}