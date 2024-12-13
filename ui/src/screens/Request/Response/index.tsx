import Welcome from "@lib/components/Welcome";
import { useRequestController } from "@lib/hooks";
import ResponseView from "./ResponseView";
import PendingRequest from "@lib/components/PendingRequest";
import { css } from "@styled-system/css";

export default function Response() {
    const { status, cancel } = useRequestController();
    return (
        <div className={resStyles}>
            {status == 'idle' && <Welcome />}
            <PendingRequest visible={status == 'pending'} />
            {(status == 'finished' || status == 'realtime' || status == 'pending') && <ResponseView />}
        </div>
    )
}

const resStyles = css({
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
});