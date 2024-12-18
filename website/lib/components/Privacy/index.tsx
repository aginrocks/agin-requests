'use client';
import { IconBrandGit, IconFileUpload, IconGitMerge, IconLock } from "@tabler/icons-react";
import { FeatureIcon } from "../FeatureIcon";
import { privacy, privacyHeader, privacySubtitle, privacyTitle } from "./styles";
import { FeatureCard } from "../FeatureCard";
import { FeaturesGrid } from "../FeaturesGrid";

export function Privacy() {
    return (
        <div className={privacy}>
            <div className={privacyHeader}>
                <FeatureIcon icon={IconGitMerge} variant="gradient" />
                <div className={privacyTitle}>Local-First, Seamlessly Collaborative</div>
                <div className={privacySubtitle}>Agin Requests ensures your data stays securely on-device. Choose to save it in your workspace and enable Git sync for seamless collaboration — keeping privacy and control in your hands.</div>
            </div>
            <FeaturesGrid>
                <FeatureCard
                    label="Importing"
                    description="You can import requests from a variety of sources including OpenAPI, Postman, Thunder Client, or cURL, allowing for seamless transitions and consistent workflow."
                    icon={IconFileUpload}
                />
                <FeatureCard
                    label="Git Sync"
                    description="Sync your workspace files with Git to keep your team updated and ensure data consistency."
                    icon={IconBrandGit}
                />
                <FeatureCard
                    label="Easily Mergable"
                    description="The saved files are designed to be easy to merge, making it simple to integrate changes and collaborate with your team."
                    icon={IconGitMerge}
                />
                <FeatureCard
                    label="Local Data Control"
                    description="All data remains on your device or in your workspace, putting you in full control and safeguarding your privacy."
                    icon={IconLock}
                />
            </FeaturesGrid>
        </div>
    )
}