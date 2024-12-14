import Drawer from "@lib/components/Drawer";

export type MessagesLibraryProps = {
    opened: boolean;
    onClose: () => void;
}

export default function MessagesLibrary({ opened, onClose }: MessagesLibraryProps) {
    return (
        <Drawer
            onClose={onClose}
            opened={opened}
            title="Messages Library"
            subtitle="Messages are saved per request."
        >

        </Drawer>
    )
}