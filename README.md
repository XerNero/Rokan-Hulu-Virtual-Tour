## Rokan Hulu Virtual Tour 360

Website tur virtual interaktif untuk menjelajahi destinasi wisata unggulan Kabupaten Rokan Hulu, Riau melalui teknologi panorama 360° yang memukau.

### ✨ Fitur Utama

#### 🎯 Tur Virtual 360°
- **Auto-loading Pannellum viewer** dengan kontrol drag, zoom, dan fullscreen
- **Tiga destinasi utama**: MAMIC, Air Panas Hapanasan, Kompleks Makam Raja-Raja Rambah
- **Tur penuh interaktif** di folder `3sixty/` dengan navigasi antar ruang
- **Responsive viewer** dengan tinggi optimal untuk semua device

#### 🗺️ Sistem Peta Interaktif
- **Leaflet Maps** dengan multiple tile layers (OpenStreetMap, Satellite, Terrain)
- **Marker custom** dengan popup informasi lokasi
- **Fullscreen support** dan scale bar
- **Koordinat akurat** untuk setiap destinasi wisata

#### 📱 QR Code Generator
- **QR Code modal** untuk setiap destinasi wisata
- **Download QR Code** dalam format PNG
- **Copy to Clipboard** dengan fallback support
- **Mobile-friendly** untuk sharing langsung

#### 🎨 User Interface Modern
- **Gradient themes** unik per destinasi (Hijau-MAMIC, Biru-Hapanasan, Oranye-Rambah)
- **Consistent button sizing** dengan CSS Grid layout
- **Parallax hero background** dengan rounded corners
- **Smooth animations** menggunakan AOS (Animate On Scroll)
- **Dark/light adaptive** dengan backdrop blur effects

#### ♿ Aksesibilitas & Performa
- **Semantic HTML5** dengan proper ARIA labels
- **Keyboard navigation** support
- **Lazy loading** untuk gambar dan resources
- **Prefers-reduced-motion** support
- **SEO optimized** dengan meta tags lengkap

### 🛠️ Teknologi Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **360° Viewer**: Pannellum 2.5.6
- **Maps**: Leaflet 1.9.4 + Fullscreen Plugin 2.4.0
- **Animations**: AOS (Animate On Scroll) 2.3.4
- **Fonts**: Google Fonts (Poppins, Lato, Amiri)
- **Icons**: Font Awesome 6.0.0

### 📦 Struktur Proyek

```
Projek Pak Octa/
├─ index.html                 # Halaman utama (SPA)
├─ assets/                    # Media files
│  ├─ hero-mamic.jpg          # Hero background image
│  ├─ mamic-360.jpg           # MAMIC preview
│  ├─ hapanasan-360.jpg       # Hapanasan preview
│  ├─ rambah-360.jpg          # Rambah preview
│  ├─ mamic-qr.png           # QR Code MAMIC
│  ├─ hapanasan-qr.png       # QR Code Hapanasan
│  ├─ rambah-qr.png          # QR Code Rambah
│  └─ icon.png               # Site favicon
├─ css/
│  └─ styles.css              # Complete stylesheet (1500+ lines)
├─ js/
│  ├─ data.js                 # Destinations data & configuration
│  ├─ script.js               # Main application logic
│  └─ three-sixty-init.js     # 360° tour utilities
└─ 3sixty/                    # Full tour experiences
   ├─ mamic/
   │  ├─ home.html            # MAMIC tour landing
   │  └─ index.html           # MAMIC 360° experience
   ├─ hapanasan/
   │  ├─ home.html            # Hapanasan tour landing
   │  └─ index.html           # Hapanasan 360° experience
   └─ rambah/
      ├─ home.html            # Rambah tour landing
      └─ index.html           # Rambah 360° experience
```

### 🚀 Cara Menjalankan

#### Lokal Development
1. **Clone repository** atau download project
2. **Buka dengan browser**: Langsung buka `index.html` di browser modern
3. **Rekomendasi**: Gunakan VS Code + Live Server extension untuk auto-reload

#### Production Deploy
Tidak memerlukan build process, ready untuk deploy ke GitHub Pages, Netlify, Vercel, atau shared hosting.

### ⚙️ Konfigurasi & Customization

#### 🎯 Mengedit Konten
Edit file `js/data.js` untuk mengubah:
- Judul dan deskripsi destinasi
- Koordinat GPS lokasi
- Link gambar preview 360°
- URL tur penuh

#### 🎨 Styling Custom
File `css/styles.css` mengatur:
- **Color themes** per destinasi (`--mamic-main`, `--hapanasan-main`, `--rambah-main`)
- **Viewer height**: ubah `.viewer-aspect { height: 40vh }`
- **Button sizes**: sudah unified dengan CSS Grid
- **Responsive breakpoints**: 768px dan 480px

#### 🖼️ Asset Management
- **Hero image**: ganti `assets/hero-mamic.jpg`
- **Preview 360°**: ganti file di `assets/*-360.jpg`
- **QR Codes**: update file di `assets/*-qr.png`
- **Favicon**: ganti `assets/icon.png`

### 🧭 Fitur Pannellum

Auto-loading viewer dengan konfigurasi optimal:
- Drag, zoom, dan touch support
- Fullscreen controls
- Auto-rotate untuk preview menarik
- Responsive untuk semua device

### 🗺️ Sistem Peta Leaflet

Multiple tile layers dengan koordinat akurat:
- **MAMIC**: Jl. Tuanku Tambusai Km 4, Pasir Pengaraian
- **Hapanasan**: Desa Hapanasan, Kec. Rambah (±15 km dari kota)
- **Rambah**: Kompleks Makam Raja-Raja Rambah (±20 km dari kota)

### 📱 QR Code System

- **Auto-generation**: QR codes untuk direct access ke tur
- **Download**: Format PNG untuk sharing offline
- **Copy**: Clipboard support dengan graceful fallback
- **Mobile optimized**: Touch-friendly modal

### ☁️ Deploy ke GitHub Pages

1. **Push ke GitHub**: Upload semua file ke repository
2. **Enable Pages**: Settings → Pages → Deploy from main branch
3. **Access**: Website akan tersedia di `username.github.io/repository-name`

### 🔧 Troubleshooting

#### Masalah Umum
- **360° tidak bisa di-drag**: Periksa CDN Pannellum dan koneksi internet
- **Peta tidak muncul**: Cek koneksi untuk Leaflet tiles
- **QR Code tidak bisa di-copy**: Browser mungkin tidak support Clipboard API
- **Hero image abu-abu**: Periksa path `assets/hero-mamic.jpg`

#### Performance Tips
- Gambar 360° sebaiknya ukuran < 2MB untuk loading cepat
- Gunakan format WebP jika memungkinkan
- Enable browser caching untuk production

### 📊 Features Checklist

- ✅ **Responsive Design** (Mobile-first approach)
- ✅ **SEO Optimized** (Meta tags lengkap)
- ✅ **Accessibility** (WCAG compliant)
- ✅ **Performance** (Lazy loading, optimized assets)
- ✅ **Cross-browser** (Modern browser support)
- ✅ **Touch Support** (Mobile gestures)
- ✅ **Keyboard Navigation** (Tab, Enter, Escape)

### 📄 Lisensi & Credits

#### Lisensi
- **Code**: MIT License - bebas digunakan dan dimodifikasi
- **Content**: Berdasarkan publikasi resmi Pemkab Rokan Hulu

#### Sumber Konten
- **Pemkab Rokan Hulu** - Data resmi destinasi wisata
- **Media Partner**: Bisnis.com, RiauMagz, Media Center Riau, Riau Pos, Neliti, Rokapress

#### Technology Credits
- **Pannellum** - Matthew Petroff (360° viewer)
- **Leaflet** - Vladimir Agafonkin (maps)
- **AOS** - Michał Sajnóg (scroll animations)
- **Font Awesome** - Dave Gandy (icons)

---

**Dibuat dengan ❤️ untuk memajukan pariwisata Rokan Hulu**

*Last updated: 2025*


