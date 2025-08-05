const uaParser = require('ua-parser-js');
const https = require('https');

function geoLookup(ip) {
  return new Promise((resolve) => {
    const url = `https://ipapi.co/${ip}/json/`;
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const geo = JSON.parse(data);
            resolve({
              ip: geo.ip,
              city: geo.city,
              region: geo.region,
              country: geo.country_name,
              org: geo.org,
            });
          } catch (err) {
            resolve({});
          }
        });
      })
      .on('error', () => resolve({}));
  });
}

exports.handler = async (event) => {
  const uid = event.queryStringParameters.uid || 'unknown';
  const rawIp = event.headers['x-forwarded-for'] || 'unknown';
  const ip = rawIp.split(',')[0].trim();
  const userAgentString = event.headers['user-agent'] || 'unknown';

  const geo = await geoLookup(ip);
  const parsedUA = uaParser(userAgentString);

  const now = new Date();
  const timeFr = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(now);

  console.log(`📩 Mail ouvert :
  ➤ UID        : ${uid}
  ➤ IP         : ${geo.ip || ip}
  ➤ Ville      : ${geo.city || '-'}, ${geo.region || '-'}, ${geo.country || '-'}
  ➤ FAI        : ${geo.org || '-'}
  ➤ Heure (FR) : ${timeFr}
  ➤ OS         : ${parsedUA.os.name} ${parsedUA.os.version}
  ➤ Navigateur : ${parsedUA.browser.name} ${parsedUA.browser.version}
  ➤ Appareil   : ${parsedUA.device.model || 'Ordinateur'}
  ➤ Agent brut : ${userAgentString}
  `);

  // Pixel transparent base64
  const pixelBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/P9fDDwAAAABJRU5ErkJggg==';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store',
    },
    body: pixelBase64,
    isBase64Encoded: true,
  };
};
