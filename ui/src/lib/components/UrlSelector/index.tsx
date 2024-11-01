import { VSCodeButton, VSCodeDropdown, VSCodeOption, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import { useRequest } from "@lib/components/hooks";
import { container, input, inputGroup, methodSelector, sendButton } from "./styles";
import Input from "@lib/components/Input";
import Divider from "../Divider";

export default function UrlSelector() {
    const request = useRequest();

    return (
        <div className={container}>
            <div className={inputGroup}>
                <Input
                    leftSection={<div className={methodSelector}>
                        <select>
                            <option>GET</option>
                            <option>POST</option>
                            <option>PATCH</option>
                            <option>PUT</option>
                            <option>DELETE</option>
                        </select>
                        <Divider vertical />
                    </div>
                    }
                    rightSection={<VSCodeButton className={sendButton}>
                        Send
                    </VSCodeButton>}
                    placeholder="Enter Url..."
                />
            </div>
        </div>
    )
}