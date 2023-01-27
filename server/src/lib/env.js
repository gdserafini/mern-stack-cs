export const isDev = () => process.env.NODE_ENV === 'dev';
export const isCI = () => process.env.NODE_ENV === 'ci';
export const isProd = () => process.env.NODE_ENV === 'prod';
export const isStaging = () => !isProd();