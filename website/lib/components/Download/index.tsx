import { IconBook, IconDownload, IconFlame } from "@tabler/icons-react";
import { FeatureIcon } from "../FeatureIcon";
import { actions, blur, blurContainer, download, header, subtitle, title } from "./styles";
import { Button } from "../Button";
import { docsUrl, marketplaceUrl } from "@/lib/config";

export function Download() {
    return (
        <div className={download}>
            <div className={header}>
                <FeatureIcon icon={IconFlame} variant="gradient" />
                <div className={title}>Get Started with Agin Requests</div>
                <div className={subtitle}>Quickly get started with Agin Requests using the Visual Studio Code Marketplace or explore our documentation to learn more about optimizing your development workflow.</div>
            </div>
            <div className={actions}>
                <a href={marketplaceUrl} target="_blank">
                    <Button variant="primary" icon={IconDownload}>Download</Button>
                </a>
                <a href={docsUrl}>
                    <Button>Read the Docs</Button>
                </a>
            </div>
            <div className={blurContainer}>
                <div className={blur}></div>
            </div>
        </div>
    )
}