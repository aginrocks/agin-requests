import { VscodeContext } from "@lib/providers/VSCodeProvider";
import { useContext } from "react";

export const useVscode = () => {
    const context = useContext(VscodeContext);
    if (!context) {
        console.error('useVscode must be used within a VscodeProvider');
    }
    return context;
};
