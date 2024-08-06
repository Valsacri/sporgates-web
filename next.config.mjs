/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'sporgates.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'images.squarespace-cdn.com',
			},
			{
				protocol: 'https',
				hostname: 'www.jagranimages.com',
			},
			{
				protocol: 'https',
				hostname: 'doers.ma',
			},
		],
	},
};

export default nextConfig;
