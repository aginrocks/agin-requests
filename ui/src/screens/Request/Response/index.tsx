import Welcome from "@lib/components/Welcome";
import { useRequestController } from "@lib/hooks";
import ResponseView from "./ResponseView";

export default function Response() {
  const { status, cancel } = useRequestController();
  return (
    <>
      {status == 'idle' && <Welcome />}
      {(status == 'finished' || status == 'ws-connected' || status == 'pending') && <ResponseView />}
    </>
  )
}