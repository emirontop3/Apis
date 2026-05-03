export default function handler(request, response) {
  // CORS ayarlarini ekliyoruz ki tarayici engellemesin
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Content-Type', 'application/json');

  // URL'den ismi cekiyoruz (?name=isim)
  const { name } = request.query;
  
  // Isim girilmisse onu kullan, girilmemisse "Misafir" yaz
  const userName = name ? name : 'Misafir';

  // Yaniti JSON olarak donduruyoruz
  return response.status(200).json({
    mesaj: `Hello ${userName}`,
    durum: "Basarili"
  });
}
