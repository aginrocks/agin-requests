'use client';
import { useEffect, useState } from "react";
import { Title } from "../Title";
import { content, hero, heroSubtitle, heroTextBox, heroTitle, screenshot, screenshotContainer, secondaryGrid } from "./styles";
import { useMouse } from "@mantine/hooks";

export function Hero() {
    const { ref, x, y } = useMouse();

    return (
        <div className={hero} ref={ref}>
            <div className={secondaryGrid} style={{
                maskPosition: `${x - 200}px ${y - 200}px`,
            }}></div>
            <div className={content}>
                <div className={heroTextBox}>
                    <div className={heroTitle}>The Ultimate Client for APIs</div>
                    <div className={heroSubtitle}>Effortlessly send HTTP requests, listen to Server-Sent Events (SSE), connect to WebSocket (WS) endpoints, and communicate with Socket.IO servers — all from the comfort of your editor.</div>
                </div>
                <div className={screenshotContainer}>
                    <img src="/images/http.png" className={screenshot} />
                </div>
            </div>
        </div>
    )
}