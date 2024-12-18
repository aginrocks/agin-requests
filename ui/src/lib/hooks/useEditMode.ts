import { EditModeContext } from "@lib/providers/EditModeProvider";
import { useContext } from "react";

export function useEditMode() {
    return useContext(EditModeContext);
}