import Request from "@lib/components/Request";
import { history } from "./styles";

export default function History() {
    return (
        <div className={history}>
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
            />
            <Request
                method="get"
                type="http"
                url="https://example.com"
            />
        </div>
    )
}