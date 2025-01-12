import { WorkspaceContext } from "@lib/providers/WorkspaceProvider";
import { useContext } from "react";

export function useWorkspace() {
    return useContext(WorkspaceContext);
}