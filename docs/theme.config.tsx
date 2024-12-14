import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Image from 'next/image'

const config: DocsThemeConfig = {
  logo: <>
    <Image src="/logo.svg" alt="Logo" height={30} width={163} />
    <span style={{ marginLeft: '15px', fontWeight: 500, opacity: .6 }}>
      Documentation
    </span>
  </>,
  footer: {
    content: 'Agin Requests'
  },
  head: <>

  </>,
  docsRepositoryBase: 'https://github.com/TymekV/agin-requests/tree/main/docs',
  // hsl(217deg, 100%, 51.8%)
  color: {
    hue: {
      dark: 217,
      light: 217,
    },
    saturation: {
      dark: 100,
      light: 100,
    },
    lightness: {
      dark: 51.8,
      light: 51.8
    }
  },
  project: {
    link: 'https://github.com/TymekV/agin-requests',
  },
}

export default config
