import { useDisclosure } from "@mantine/hooks"
import { inputContainer } from "../Input/styles"
import Menu from "../Menu"
import { select } from "./styles"
import { Option, OptionProps } from "../Menu/Option"
import { useMemo } from "react"
import { IconChevronDown } from "@tabler/icons-react"

export interface SelectProps {
    options: OptionProps[],
    withLeftBorder?: boolean,
    withRightBorder?: boolean,
    withLeftRadius?: boolean,
    withRightRadius?: boolean,
    value: string;
    onChange: (value: string, option: OptionProps) => void;
};

export default function Select({ options, withLeftBorder, withRightBorder, withLeftRadius, withRightRadius, value, onChange, ...props }: SelectProps) {
    const [opened, { open, close, toggle }] = useDisclosure(false);
    const selectedOption = useMemo(() => options.find(o => o.value == value), [options, value]);

    return (
        <div className={inputContainer({ withLeftBorder, withRightBorder, withLeftRadius, withRightRadius })}>
            <Menu
                target={<div className={select} onClick={toggle}>
                    {selectedOption?.label}
                    <IconChevronDown size={16} />
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
            {/* <select {...props} className={select}>
            </select> */}
        </div>
    )
}