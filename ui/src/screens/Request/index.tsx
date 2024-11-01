import React, { useEffect, useState } from "react";
import { VSCodeButton, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import { css } from "@styled-system/css";
import Columns from "@lib/components/Columns";
import { useRequest } from "@lib/components/hooks/useRequest";
import UrlSelector from "@lib/components/UrlSelector";

export function Request() {
    const request = useRequest();

    return (
        <Columns
            left={<>
                <UrlSelector />
            </>}
            right={<>
                Response
            </>}
        />
    )
}