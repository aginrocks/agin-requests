import { VsCodeApiContext, VsCodeApiContextProps } from "@lib/providers/VsCodeApiProvider";
import { useContext } from "react";

export const useVsCodeApi = (): VsCodeApiContextProps => {
    const context = useContext(VsCodeApiContext);
    if (!context) {
        throw new Error("useVsCodeApi must be used within a VsCodeApiProvider");
    }
    return context;
};
