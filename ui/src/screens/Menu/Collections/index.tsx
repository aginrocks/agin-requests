import Request from "@lib/components/Request";
import { collections } from "./styles";
import TreeItem from "@lib/components/TreeItem";

export default function Collections() {
    return (
        <div className={collections}>
            <TreeItem label="Test Collection">
                <TreeItem label="Test Collection">
                    <TreeItem label="Test Collection">
                        <Request method="get" type="http" url="https://example.com" />
                    </TreeItem>
                </TreeItem>
                <Request method="get" type="http" url="https://example.com" />
            </TreeItem>
        </div>
    )
}