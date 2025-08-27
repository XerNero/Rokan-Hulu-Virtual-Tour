## Rokan Hulu Virtual Tour 360

Situs satu halaman (SPA) untuk menjelajah ikon wisata Kabupaten Rokan Hulu melalui pratinjau panorama 360° dan tur penuh per‑lokasi.

### ✨ Fitur Utama
- Navbar sticky, smooth scroll, dan penanda menu aktif.
- Hero bergambar dengan overlay lembut dan sudut membulat.
- Tiga destinasi (MAMIC, Hapanasan, Makam Raja Rambah) dirender dari `js/data.js`.
- Pratinjau panorama 360° inline menggunakan Pannellum (drag, zoom, fullscreen) — auto‑load.
- Tombol “Mulai Tour” menuju tur penuh di folder `3sixty/` (berbasis Three.js).
- Peta lokasi per‑section memakai Leaflet (layer control, marker, fullscreen, scale bar).
- Aksesibilitas: semantic HTML, fokus jelas, kontras memadai, dukung `prefers-reduced-motion`.
- Responsif dan performa: lazy resources, CSS ringan, CDN.

### 🛠️ Teknologi
- HTML, CSS, JavaScript murni.
- CDN: Pannellum 2.5.6, Leaflet 1.9.4 (+ leaflet.fullscreen 2.4.0), AOS 2.3.4.

### 📦 Struktur Proyek (ringkas)
```
.
├─ index.html                 # Halaman utama (SPA)
├─ assets/                    # Gambar & ikon (hero, preview 360, favicon)
│  ├─ hero-mamic.jpg
│  ├─ mamic-360.jpg
│  ├─ hapanasan-360.jpg
│  ├─ rambah-360.jpg
│  └─ icon.png
├─ css/
│  └─ styles.css              # Seluruh gaya situs
├─ js/
│  ├─ data.js                 # Data destinasi (title, desc, gambar, koordinat)
│  ├─ script.js               # Render UI, init Pannellum & Leaflet, interaksi
│  └─ three-sixty-init.js     # Utilitas tur 3D bila diperlukan
└─ 3sixty/                    # Tur penuh per-lokasi (Three.js)
```

### 🚀 Menjalankan Secara Lokal
Tidak ada build step.
1) Clone/pindahkan project ini.
2) Buka `index.html` di browser modern.

Tips: gunakan ekstensi “Live Server” (VS Code) untuk auto‑reload.

### ⚙️ Konfigurasi Konten
- Edit `js/data.js` untuk judul, deskripsi, sumber, gambar pratinjau, koordinat, tautan tur penuh.
- Ganti gambar hero di `assets/hero-mamic.jpg` (opsional sesuaikan overlay di `.hero-overlay`).
- Favicon: `assets/icon.png` sudah ditautkan pada `<head>`.
- Tinggi pratinjau 360: ubah `.viewer-aspect { height: … }` (mis. `40vh`) di `css/styles.css`.

### 🧭 Pannellum (Pratinjau 360)
- Inisialisasi di `initPannellumViewer` (`js/script.js`).
- Opsi: `autoLoad`, `mouseZoom`, `touchEnabled`, `showControls`, `showFullscreenCtrl`.
- Pastikan CSS dan JS Pannellum ter‑load dari CDN pada `index.html`.

### 🗺️ Leaflet (Peta Per‑Lokasi)
- Dipanggil saat tombol “Lokasi” ditekan.
- Memiliki beberapa tile layer + marker kustom + fullscreen + scale bar.

### ☁️ Deploy ke GitHub Pages
1) Push repo ke GitHub.
2) Settings → Pages → Source: `Deploy from a branch`, branch: `main`, folder: `/ (root)`.
3) Akses URL Pages yang diberikan.

### 🔍 Troubleshooting Singkat
- Pratinjau 360 tidak bisa digeser/zoom: cek CDN Pannellum; pastikan overlay tidak menutup canvas.
- Tampilan terlalu tinggi/pendek: ubah `.viewer-aspect { height: … }` di CSS.
- Gambar hero terlalu gelap: sesuaikan intensitas `.hero-overlay`.

### 📄 Lisensi & Kredit
- Kode sumber: MIT (opsional sesuaikan kebutuhan).
- Konten ringkas: publikasi Pemkab Rokan Hulu & media setempat (Bisnis.com, RiauMagz, Media Center Riau, Riau Pos, Neliti, Rokapress, dll.).

—
Dibuat untuk demo tur virtual 360 Rokan Hulu.


