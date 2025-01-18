import Request from "@lib/components/Request";
import { environments } from "./styles";
import Welcome from "@lib/components/Welcome";
import { IconCube, IconHistory } from "@tabler/icons-react";

export default function Environments() {
    return (
        <div className={environments}>
            <div style={{ marginTop: '20px' }}>
                <Welcome
                    icon={IconCube}
                    title="Environments will be avaliable soon!"
                    subtitle="I'm working on it, stay tuned!"
                    size="sm"
                />
            </div>
            {/* <Request
                method="get"
                type="http"
                url="https://example.com"
            />
            <Request
                method="get"
                type="http"
                url="https://example.com"
            />
            <Request
                method="get"
                type="http"
                url="https://example.com"
            />
            <Request
                method="get"
                type="http"
                url="https://example.com"
            />
            <Request
                method="get"
                type="http"
                url="https://example.com"
            /> */}
        </div>
    )
}