import { VsCodeApiProvider } from "@lib/providers/VsCodeApiProvider";

export default function App({ children }: { children: React.ReactNode }) {
    return (
        <VsCodeApiProvider>
            {children}
        </VsCodeApiProvider>
    )
}