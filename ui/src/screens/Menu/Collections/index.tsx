import Request from "@lib/components/Request";
import { collections } from "./styles";
import TreeItem from "@lib/components/TreeItem";

export default function Collections() {
    return (
        <div className={collections}>
            <TreeItem label="Test Collection" nestLevel={1}>

            </TreeItem>
        </div>
    )
}