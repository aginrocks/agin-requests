import { MessagesLibraryContext } from "@lib/providers/MessagesLibraryProvider";
import { useContext } from "react";

export default function useMessagesLibrary() {
    return useContext(MessagesLibraryContext);
}