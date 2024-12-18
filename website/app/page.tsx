import { Download, FeaturesGallery, Footer, Hero, Privacy } from "@/lib/components";

export default function Home() {
    return (
        <div>
            <Hero />
            <FeaturesGallery />
            <Privacy />
            <Download />
            <Footer />
        </div>
    )
}