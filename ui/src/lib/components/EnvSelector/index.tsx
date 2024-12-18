import { useState } from "react";
import CompactSelect from "../CompactSelect";
import { IconBox } from "@tabler/icons-react";

export default function EnvSelector() {
    const [environments, setEnvironments] = useState([
        {
            label: 'No Environment',
            value: '_empty',
        },
        {
            label: 'Test Env',
            value: '1',
        },
    ]);

    // TODO: Move to context
    const [env, setEnv] = useState('_empty');

    return (
        <CompactSelect
            value={env}
            onChange={setEnv}
            options={environments}
            icon={IconBox}
        />
    )
}