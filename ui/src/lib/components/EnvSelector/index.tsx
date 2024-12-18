import { useMemo, useState } from "react";
import CompactSelect from "../CompactSelect";
import { IconBox } from "@tabler/icons-react";
import { useEnv } from "@lib/hooks/useEnv";
import { OptionProps } from "../Menu/Option";

export default function EnvSelector() {
    // TODO: Move to context
    const { currentEnv, setCurrentEnv, environments } = useEnv();

    const options = useMemo(() => environments.map((e): OptionProps => ({
        label: e.label,
        value: e.id,
    })), [environments]);

    return (
        <CompactSelect
            value={currentEnv}
            onChange={setCurrentEnv}
            options={options}
            icon={IconBox}
        />
    )
}