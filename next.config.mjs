/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: 'https',
            hostname: 'store.istad.co', 
            // Add your hostname here
            port: '',
            pathname: '/media/product_images/**', 
        },
    ],
        domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com" , ""],
      },
     
};

export default nextConfig;
