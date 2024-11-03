import RequestConfigProvider from "@lib/providers/RequestConfigProvider";
import { Request } from "./screens";
import { VsCodeApiProvider } from "@lib/providers/VsCodeApiProvider";

export default function App() {
  return (
    <div>
      <VsCodeApiProvider>
        <Request />
      </VsCodeApiProvider>
    </div>
  );
}