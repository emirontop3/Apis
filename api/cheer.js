module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { name, limit } = req.query;
  const isim = name || 'Misafir';
  
  // Eger bir limit girilmemisse varsayilan olarak 1 milyon yapalim
  // Dikkat: Bu sayiyi 10 milyondan fazla yaparsan Vercel "Timeout" verebilir!
  const max = parseInt(limit) || 1000000;

  // AGIR ISLEM: Asal Sayi Adedi Bulma (Sieve of Eratosthenes algoritmasi)
  const baslangic = Date.now();
  
  const asalMi = new Uint8Array(max + 1).fill(1);
  asalMi[0] = asalMi[1] = 0;

  for (let i = 2; i * i <= max; i++) {
    if (asalMi[i]) {
      for (let j = i * i; j <= max; j += i) {
        asalMi[j] = 0;
      }
    }
  }

  let sayac = 0;
  for (let i = 2; i <= max; i++) {
    if (asalMi[i]) sayac++;
  }

  const bitis = Date.now();
  const sure = (bitis - baslangic) / 1000; // Saniye cinsinden

  res.status(200).json({
    mesaj: `Hello ${isim}`,
    islem_detayi: `${max} sayisina kadar olan tum asal sayilar bulundu.`,
    bulunan_asal_sayi_adedi: sayac,
    gecen_sure: `${sure} saniye`,
    durum: "Basarili"
  });
};
