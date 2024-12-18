import useSynced from "@lib/hooks/useSynced";
import { createContext, useState } from "react";

type EnvVariable = {
    key: string;
    value: string;
    isSecret: boolean;
}

type Environment = {
    id: string;
    label: string;
    variables: EnvVariable[];
}

type EnvContextType = {
    currentEnv: string;
    setCurrentEnv: React.Dispatch<React.SetStateAction<string>>;
    environments: Environment[];
}

const initialEnvs: Environment[] = [
    {
        id: '_empty',
        label: 'No Environment',
        variables: []
    }
]

export const EnvContext = createContext<EnvContextType>({
    currentEnv: '_empty',
    setCurrentEnv: () => { },
    environments: initialEnvs,
});

export default function EnvProvider({ children }: { children: React.ReactNode }) {
    const [currentEnv, setCurrentEnv] = useState('');

    const [envs, setEnvs] = useState<Environment[]>(initialEnvs);

    useSynced('currentEnv', currentEnv, setCurrentEnv);

    // TODO: Add fetching ENVs

    return (
        <EnvContext.Provider value={{ environments: envs, currentEnv, setCurrentEnv }}>
            {children}
        </EnvContext.Provider>
    )
}