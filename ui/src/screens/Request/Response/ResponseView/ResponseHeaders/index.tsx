import { Table } from "@lib/components/Table";
import { useHTTPResponse } from "@lib/hooks";
import { css } from "@styled-system/css";

export default function ResponseHeaders() {
    const [response] = useHTTPResponse();

    return (
        <div className={mainStyles}>
            <Table
                data={Object.entries(response.headers)}
            />
        </div>
    )
}

const mainStyles = css({
    padding: '0 18px',
});