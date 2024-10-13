/** @type {import('next').NextConfig} */
import nextra from 'nextra'
 
const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

export default withNextra({
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true // mandatory, otherwise won't export
  }
});
