import { cva } from "@/styled-system/css"

type LogoVariants = Exclude<Parameters<typeof logo>[0], undefined>;


export default function Logo({ size }: LogoVariants) {
    return (
        <img src="/logo.svg" className={logo({ size })} />
    )
}

const logo = cva({
    base: {

    },
    variants: {
        size: {
            xs: {
                height: '20px',
            },
            sm: {
                height: '25px',
            },
            md: {
                height: '30px',
            },
            lg: {
                height: '35px',
            },
            xl: {
                height: '40px',
            },
        },
    }
})