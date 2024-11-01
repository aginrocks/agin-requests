import RequestConfigProvider from "@lib/providers/RequestConfigProvider";
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