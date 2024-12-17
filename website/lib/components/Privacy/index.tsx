import { IconGitMerge } from "@tabler/icons-react";
import { FeatureIcon } from "../FeatureIcon";
import { privacy, privacyHeader, privacySubtitle, privacyTitle } from "./styles";

export function Privacy() {
    return (
        <div className={privacy}>
            <div className={privacyHeader}>
                <FeatureIcon icon={IconGitMerge} variant="gradient" />
                <div className={privacyTitle}>Local-First, Seamlessly Collaborative</div>
                <div className={privacySubtitle}>Agin Requests ensures your data stays securely on-device. Choose to save it in your workspace and enable Git sync for seamless collaboration — keeping privacy and control in your hands.</div>
            </div>
        </div>
    )
}