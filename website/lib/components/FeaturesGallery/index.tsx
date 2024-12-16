import Feature, { FeatureProps } from "./Feature";
import { features, gallery, image } from "./styles";


const featuresList: FeatureProps[] = [];

// TODO: Fix layout
export function FeaturesGallery() {
    return (
        <div className={gallery}>
            <div className={features}>
                {/* TODO: Add .map() */}
                <Feature
                    label="HTTP Requests"
                    description="Make GET, POST, PATCH, PUT, DELETE requests"
                    image=""
                    active
                />
                <Feature
                    label="Server-Sent Events"
                    description="Listen for Server-Sent Events in real time"
                    image=""
                />
                <Feature
                    label="WebSockets"
                    description="Send and receive real time data with WebSockets"
                    image=""
                />
                <Feature
                    label="Socket.IO"
                    description="Send and receive real time data with Socket.IO"
                    image=""
                />
            </div>
            {/* <div className={image}>
                TODO: IMAGE
            </div> */}
            <img className={image} src="/images/screenshot.png" />
        </div>
    )
}