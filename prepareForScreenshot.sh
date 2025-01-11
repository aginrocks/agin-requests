#!/bin/bash

# Check if the script is running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "This script can only be run on macOS."
    exit 1
fi

# Resize the Extension Development Host window
osascript -e 'tell application "System Events"
    tell application process "Code"
        set frontmost to true
        repeat with win in windows
            if name of win starts with "[Extension Development Host]" then
                set size of win to {1500, 900}
                exit repeat
            end if
        end repeat
    end tell
end tell'