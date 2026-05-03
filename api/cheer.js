export default function handler(request, response) {
  // URL'den gelen 'name' parametresini alıyoruz
  // Örnek: /api/hello?name=Ahmet
  const { name } = request.query;

  // Eğer isim girilmemişse varsayılan bir isim belirleyelim
  const userName = name || 'Misafir';

  response.status(200).json({
    mesaj: `Hello ${userName}`,
    durum: "Başarılı"
  });
}
