import Request from "@lib/components/Request";
import { collections } from "./styles";
import TreeItem from "@lib/components/TreeItem";
import { IconFolder, IconPlus } from "@tabler/icons-react";
import SidebarSearch from "@lib/components/SidebarSearch";
import ActionIcon from "@lib/components/ActionIcon";

export default function Collections() {
    return (
        <div className={collections}>
            <SidebarSearch rightSection={<ActionIcon icon={IconPlus} />} paddingRight="sm" />
            <TreeItem label="Test Collection">
                <TreeItem label="Test Collection" icon={IconFolder}>
                    <TreeItem label="Test Collection" icon={IconFolder}>
                        <Request method="get" type="http" url="https://example.com" />
                    </TreeItem>
                </TreeItem>
                <Request method="get" type="http" url="https://example.com" />
            </TreeItem>
        </div>
    )
}