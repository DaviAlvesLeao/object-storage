export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    MINIO: {
        endPoint: process.env.MINIO_HOST,
        port: parseInt(process.env.MINIO_PORT, 10),
        useSSL: process.env.MINIO_USE_SSL === 'true' ? true: false ,
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey: process.env.MINIO_SECRET_KEY
    }
});