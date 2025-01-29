import { Icon, IconChevronDown } from "@tabler/icons-react";
import { Option, OptionProps } from "../Menu/Option";
import { compactSelect } from "./styles";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import Menu from "../Menu";
import { select } from "../Select/styles";

type CompactSelectVaraints = Exclude<Parameters<typeof compactSelect>[0], undefined>;
export interface CompactSelectProps extends CompactSelectVaraints {
    options: OptionProps[],
    value: string;
    onChange: (value: string, option: OptionProps) => void;
    icon?: Icon;
}

export default function CompactSelect({ options, value, onChange, icon: Icon, variant = 'default', radius = 'default', size, padding }: CompactSelectProps) {
    const [opened, { open, close, toggle }] = useDisclosure(false);
    const selectedOption = useMemo(() => options.find(o => o.value == value), [options, value]);

    // TODO: Add selected state
    return (
        <Menu
            target={<div className={compactSelect({ variant, radius, size, padding })} onClick={toggle}>
                {Icon && <Icon size={size === 'sm' ? 12 : 16} />}
                {selectedOption?.label}
                <IconChevronDown size={16} color="color-mix(in srgb, var(--vscode-foreground), black 50%)" />
            </div>}
            opened={opened}
            onClose={close}
            position="bottomStart"
        >
            {options.map((o) => <Option {...o} key={o.value} onClick={() => {
                onChange(o.value, o);
                close();
            }} />)}
        </Menu>

    )
}