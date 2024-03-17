/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [  // Correct usage as an array
            {
                protocol: 'https',
                hostname: 'utfs.io'
            }
        ]
    }
};

export default nextConfig;
