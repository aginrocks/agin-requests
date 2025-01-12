import { VsCodeApiProvider } from "@lib/providers/VsCodeApiProvider";
import WorkspaceProvider from "@lib/providers/WorkspaceProvider";

export default function App({ children }: { children: React.ReactNode }) {
    return (
        <VsCodeApiProvider>
            <WorkspaceProvider>
                {children}
            </WorkspaceProvider>
        </VsCodeApiProvider>
    )
}