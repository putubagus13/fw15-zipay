/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/dxs0yxeyr/image/upload/v1686543270/fazzpay-master/**"
            }
        ]
    }
};

module.exports = nextConfig;
