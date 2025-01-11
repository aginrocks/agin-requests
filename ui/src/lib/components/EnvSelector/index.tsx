import { useMemo, useState } from "react";
import CompactSelect from "../CompactSelect";
import { IconBox } from "@tabler/icons-react";
import { useEnv } from "@lib/hooks/useEnv";
import { OptionProps } from "../Menu/Option";
import { useEditMode } from "@lib/hooks";

export default function EnvSelector() {
    const { currentEnv, setCurrentEnv, environments } = useEnv();

    const options = useMemo(() => environments.map((e): OptionProps => ({
        label: e.label,
        value: e.id,
    })), [environments]);

    const [editMode] = useEditMode();

    return (
        <>
            {editMode == 'test' && <CompactSelect
                value={currentEnv}
                onChange={setCurrentEnv}
                options={options}
                icon={IconBox}
            />}

        </>
    )
}