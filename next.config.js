/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		// this will override the experiments config
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		return config;
	},
	experimental: {
		esmExternals: "loose", // <-- add this
		serverComponentsExternalPackages: ["mongoose"], // <-- and this
	},
};

module.exports = nextConfig;
