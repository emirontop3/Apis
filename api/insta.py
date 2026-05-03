import instaloader
from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = parse_qs(urlparse(self.path).query)
        user = query.get('user', [''])[0]
        password = query.get('pass', [''])[0]
        target = query.get('target', [''])[0] # Bakılacak hesap

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        if not user or not password:
            self.wfile.write(json.dumps({"hata": "Giris bilgileri eksik"}).encode())
            return

        L = instaloader.Instaloader()

        try:
            # Instagram'a giris yapiyoruz
            L.login(user, password)
            
            # Hedef profili yukluyoruz
            profile = instaloader.Profile.from_username(L.context, target if target else user)
            
            sonuc = {
                "kullanici": profile.username,
                "takip_edilen": profile.followees,
                "takipci_sayisi": profile.followers,
                "durum": "Basarili"
            }
        except Exception as e:
            sonuc = {"hata": "Giris yapilamadi veya hesap bulunamadi", "detay": str(e)}

        self.wfile.write(json.dumps(sonuc).encode('utf-8'))
        return
