# 🎯 Folder 3Sixty - Tur Virtual 360°

Folder ini berisi halaman-halaman tur virtual 360° untuk setiap destinasi wisata di Rokan Hulu.

## 📁 Struktur Folder

```
3sixty/
├── README.md                 # File dokumentasi ini
├── mamic/                    # Tur Virtual MAMIC
│   ├── index.html           # Halaman utama MAMIC
│   ├── panoramas/           # File panorama 360°
│   ├── css/                 # Stylesheet khusus
│   ├── js/                  # JavaScript khusus
│   └── images/              # Gambar pendukung
├── hapanasan/               # Tur Virtual Hapanasan
│   └── index.html           # Halaman utama Hapanasan
└── rambah/                  # Tur Virtual Kompleks Makam Raja-Raja Rambah
    └── index.html           # Halaman utama Rambah
```

## 🌟 Fitur Setiap Halaman

### ✨ **Tombol Kembali ke Beranda**
- **Lokasi**: Posisi kiri atas
- **Fungsi**: Kembali ke halaman utama website
- **Desain**: Gradient merah-oranye dengan icon arrow

### 🗺️ **Tombol Tampilkan Peta**
- **Lokasi**: Posisi kanan atas
- **Fungsi**: Menampilkan modal dengan informasi lokasi
- **Desain**: Gradient sesuai tema masing-masing destinasi

### 📱 **Responsive Design**
- **Mobile First**: Optimized untuk perangkat mobile
- **Grid Layout**: Adaptif untuk berbagai ukuran layar
- **Touch Friendly**: Tombol dan elemen yang mudah disentuh

### 🎨 **Tema Warna Unik**
- **MAMIC**: Tema emas-oranye (#FFD700, #FFA500)
- **Hapanasan**: Tema biru-ungu (#667eea, #764ba2)
- **Rambah**: Tema ungu (#8E24AA, #6A1B9A)

## 🚀 Cara Penggunaan

### 1. **Akses Halaman**
```
Website Utama → Klik "Mulai Tour" → Masuk ke folder 3sixty
```

### 2. **Navigasi**
- **Tombol Kembali**: Kembali ke beranda utama
- **Tombol Peta**: Lihat informasi lokasi lengkap
- **Viewer 360°**: Area untuk menampilkan panorama virtual

### 3. **Fitur Peta**
- **Informasi Lokasi**: Alamat, koordinat, jarak, akses
- **Placeholder Maps**: Siap untuk integrasi Google Maps
- **Modal Responsive**: Tampil optimal di semua perangkat

## 🔧 Integrasi Google Maps

Untuk menambahkan Google Maps yang sebenarnya:

1. **Dapatkan API Key** dari Google Cloud Console
2. **Ganti placeholder** di modal peta dengan embed Google Maps
3. **Tambahkan script** Google Maps API

Contoh integrasi:
```html
<div id="map" style="width: 100%; height: 300px;"></div>
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (Grid 2 kolom)
- **Tablet**: 768px (Grid 1 kolom)
- **Mobile**: < 480px (Layout vertikal)

## 🎭 Animasi dan Efek

- **Fade In Up**: Animasi loading konten
- **Hover Effects**: Transform dan shadow pada tombol
- **Smooth Transitions**: Transisi halus antar elemen
- **Backdrop Filter**: Efek blur pada modal

## 🌐 Browser Support

- **Chrome**: ✅ Full Support
- **Firefox**: ✅ Full Support
- **Safari**: ✅ Full Support
- **Edge**: ✅ Full Support
- **Mobile Browsers**: ✅ Responsive Support

## 📝 Customization

### **Mengubah Warna Tema**
```css
:root {
    --primary-color: #FFD700;    /* Warna utama */
    --secondary-color: #FFA500;  /* Warna sekunder */
    --accent-color: #B8860B;     /* Warna aksen */
}
```

### **Mengubah Font**
```css
body {
    font-family: 'Poppins', sans-serif;  /* Font utama */
}

.header h1 {
    font-family: 'Amiri', serif;         /* Font judul */
}
```

### **Mengubah Animasi**
```css
.feature {
    animation: fadeInUp 0.8s ease-out;
    animation-delay: 0.1s;               /* Delay animasi */
}
```

## 🚀 Deployment

1. **Upload semua file** ke hosting
2. **Pastikan struktur folder** tetap sama
3. **Test responsive design** di berbagai perangkat
4. **Optimize gambar** untuk loading yang cepat

## 📞 Support

Jika ada pertanyaan atau masalah:
- **Email**: support@rokanhulu-tourism.com
- **WhatsApp**: +62 812-3456-7890
- **Website**: www.rokanhulu-tourism.com

---

**Dibuat dengan ❤️ untuk kemajuan pariwisata Rokan Hulu**
