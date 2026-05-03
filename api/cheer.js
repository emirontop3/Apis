export default function handler(request, response) {
  // CORS ayari: Her yerden erisime izin ver
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  const { name } = request.query;
  const userName = name || 'Misafir';

  // Turkce karakter kullanmadan yanit veriyoruz
  response.status(200).json({
    mesaj: `Hello ${userName}`,
    durum: "Basarili"
  });
}
