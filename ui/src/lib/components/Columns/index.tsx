import React from "react";
import { base, col } from "./styles";
import Divider from "../Divider";

export default function Columns({ left, right }: { left: React.ReactNode, right: React.ReactNode }) {
    return (
        <div className={base}>
            <div className={col}>
                {left}
            </div>
            <Divider vertical isMainDivider />
            <div className={col}>
                {right}
            </div>
        </div>
    )
}