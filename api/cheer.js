module.exports = (req, res) => {
  // CORS ayarlarini en basa ekliyoruz
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS isteklerini (on kontrol) hemen cevapla
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { name } = req.query;
  const isim = name || 'Misafir';

  res.status(200).json({
    mesaj: `Hello ${isim}`,
    durum: "Basarili"
  });
};
