module.exports = {
  allowedDevOrigins: process.env.NEXT_PUBLIC_ALLOWED_ORIGINS
    ? process.env.NEXT_PUBLIC_ALLOWED_ORIGINS.split(',')
    : [
        'http://127.0.0.1:3000',
        'http://localhost:3000'
      ],
}
