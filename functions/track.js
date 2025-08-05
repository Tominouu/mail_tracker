const fs = require("fs");
const path = require("path");

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

  // Renvoie une image PNG invisible
  const imagePath = path.join(__dirname, "..", "public", "pixel.png");
  const imageBuffer = fs.readFileSync(imagePath);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
    body: imageBuffer.toString("base64"),
    isBase64Encoded: true,
  };
};
