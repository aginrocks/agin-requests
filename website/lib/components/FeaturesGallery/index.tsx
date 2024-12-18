'use client';
import { IconNetwork } from "@tabler/icons-react";
import { FeatureIcon } from "../FeatureIcon";
import Feature, { FeatureProps } from "./Feature";
import { features, featuresHeader, gallery, gallerySubtitle, galleryTitle, image, imageContainer } from "./styles";
import { useEffect, useRef, useState } from "react";
import FeatureHighlight from "./Feature/Highlight";
import { AnimatePresence, motion } from "framer-motion";

const featuresList: FeatureProps[] = [
    {
        label: 'HTTP Requests',
        description: 'Make GET, POST, PATCH, PUT, DELETE requests',
        image: '/images/screenshot.png',
    },
    {
        label: 'Server-Sent Events',
        description: 'Listen for Server-Sent Events in real time',
        image: '/images/screenshot.png',
    },
    {
        label: 'WebSockets',
        description: 'Send and receive real time data with WebSockets',
        image: '/images/screenshot.png',
    },
    {
        label: 'Socket.IO',
        description: 'Send and receive real time data with Socket.IO',
        image: '/images/screenshot.png',
    },
];

export function FeaturesGallery() {
    const [feature, setFeature] = useState(0);

    const featuresRef = useRef<HTMLDivElement[]>([]);
    const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
        const element = featuresRef.current[feature];
        if (!element) return;

        const updatePositionAndSize = () => {
            const rect = element.getBoundingClientRect();
            setHighlightPosition({ x: rect.x + window.scrollX, y: rect.y + window.scrollY, width: rect.width, height: rect.height });
            console.log({ x: rect.x + window.scrollX, y: rect.y + window.scrollY, width: rect.width, height: rect.height });
        };

        updatePositionAndSize();

        const resizeObserver = new ResizeObserver(() => {
            updatePositionAndSize();
        });
        resizeObserver.observe(element);

        window.addEventListener('scroll', updatePositionAndSize);
        window.addEventListener('resize', updatePositionAndSize);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('scroll', updatePositionAndSize);
            window.removeEventListener('resize', updatePositionAndSize);
        };
    }, [feature]);


    return (
        <div className={gallery}>
            <div className={features}>
                <div className={featuresHeader}>
                    <FeatureIcon
                        icon={IconNetwork}
                        variant="gradient"
                    />
                    <div className={galleryTitle}>Versatile Network Protocols</div>
                    <div className={gallerySubtitle}>Agin Requests supports a wide range of real-time data interactions including HTTP requests, Server-Sent Events, WebSockets, and Socket.IO, allowing seamless exchange of data and testing various APIs.</div>
                </div>
                {featuresList.map((f, i) => <Feature
                    {...f}
                    key={i}
                    active={feature == i}
                    ref={(el) => {
                        if (el) featuresRef.current[i] = el;
                    }}
                    onMouseEnter={() => setFeature(i)}
                />)}
                <FeatureHighlight {...highlightPosition} />
            </div>
            <div className={imageContainer}>
                <AnimatePresence>
                    <motion.img
                        className={image}
                        src={featuresList[feature].image}
                        transition={{ opacity: { duration: 0.4 } }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            // visibility: loading ? 'hidden' : 'visible',
                        }}
                        key={featuresList[feature].image}
                        exit={{ opacity: 0 }}
                    />
                </AnimatePresence>
            </div>
        </div>
    )
}
