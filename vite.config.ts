import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [
			{
				name: "add-random-suffix",
				transformIndexHtml(html) {
					return html
						.replace(/src="(.*?)"/g, (_, p1) => {
							const randomSuffix = getRandomSuffix();
							return `src="${p1}?v=${randomSuffix}"`;
						})
						.replace(/srcset="(.*?)"/g, (_, p1) => {
							const transformedSrcset = p1
								.split(",")
								.map((src) => {
									const [url, descriptor] = src.trim().split(/\s+/);
									const randomSuffix = getRandomSuffix();
									return descriptor
										? `${url}?v=${randomSuffix} ${descriptor}`
										: `${url}?v=${randomSuffix}`;
								})
								.join(", ");
							return `srcset="${transformedSrcset}"`;
						});
				},
				transform(code, id) {
					if (id.endsWith(".css")) {
						return code.replace(/url\(["']?(.*?)["']?\)/g, (match, p1) => {
							if (!p1.startsWith("http") && !p1.startsWith("data:")) {
								const randomSuffix = getRandomSuffix();
								return `url("${p1}?v=${randomSuffix}")`;
							}
							return match;
						});
					}
					return code;
				},
			},
		],
	};
});

function getRandomSuffix() {
	return Math.random().toString(36).substring(2, 8);
}
