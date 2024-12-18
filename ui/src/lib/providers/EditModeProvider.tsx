import useSynced from "@lib/hooks/useSynced";
import { createContext, useState } from "react";

export type EditMode = 'design' | 'test';

type EditModeContextType = [
    EditMode,
    React.Dispatch<React.SetStateAction<EditMode>>,
];

const initialEditMode: EditMode = 'test';
const initialData: EditModeContextType = [
    initialEditMode,
    () => { },
];

export const EditModeContext = createContext<EditModeContextType>(initialData);

export default function EditModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<EditMode>(initialEditMode);

    useSynced('editMode', mode, setMode);

    return (
        <EditModeContext.Provider value={[mode, setMode]}>
            {children}
        </EditModeContext.Provider>
    )
}