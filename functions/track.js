exports.handler = async (event, context) => {
  const uid = event.queryStringParameters.uid || "unknown";
  const ip = event.headers["x-forwarded-for"] || "unknown";
  const userAgent = event.headers["user-agent"] || "unknown";
  const timestamp = new Date().toISOString();

  console.log(`\n📩 Mail ouvert :
  ➤ UID : ${uid}
  ➤ IP : ${ip}
  ➤ User-Agent : ${userAgent}
  ➤ Date : ${timestamp}
  `);

  // Image PNG 1x1 transparent (base64)
  const pixelBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/P9fDDwAAAABJRU5ErkJggg==";

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
    body: pixelBase64,
    isBase64Encoded: true,
  };
};
