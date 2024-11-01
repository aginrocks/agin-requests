import RequestConfigProvider from "@lib/components/providers/RequestConfigProvider";
import { Request } from "./screens";

export default function App() {
  return (
    <div>
      <RequestConfigProvider>
        <Request />
      </RequestConfigProvider>
    </div>
  );
}