// Konten situs diekspos ke global agar mudah diakses script.js
window.SITE_DATA = {
  hero: {
    image: "assets/hero-mamic.jpg"
  },
  sections: [
    {
      id: "mamic",
      slugClass: "mamic",
      category: "Religi",
      title: "Masjid Agung Madani – National Islamic Centre (MAMIC)",
      description: "Masjid Agung Madani – MAMIC adalah pusat kegiatan Islam dan ikon kabupaten Rokan Hulu. Berarsitektur modern bergaya Arab dengan kubah besar dan empat menara, kompleks masjid yang luas ini mampu menampung hingga 20 ribu jamaah.",
      facts: [
        "Area ±220.000 m², luas bangunan ±25.800 m²",
        "Kapasitas hingga ±20.000 jamaah",
        "Kubah utama Ø ±25 m, empat menara ±66,66 m",
        "Lokasi: Jl. Tuanku Tambusai Km 4, Pasir Pengaraian"
      ],
      source: "Sumber ringkas: Bisnis.com, laman kabupaten, dll.",
      image360: "assets/mamic-360.jpg",
      colors: {
        main: "var(--mamic-main)",
        accent: "var(--mamic-accent)"                                                       
      },
      fullTourHref: "3sixty/mamic/home.html",
      address: "Jl. Tuanku Tambusai Km 4, Pasir Pengaraian, Rokan Hulu, Riau",
      coordinates: "-0.1234, 100.5678",
      distance: "±4 km dari pusat kota Pasir Pengaraian"
    },
    {
      id: "hapanasan",
      slugClass: "hapanasan",
      category: "Alam",
      title: "Air Panas Hapanasan",
      description: "Air Panas Hapanasan menawarkan pengalaman rendam air panas alami di tengah hutan wisata Gunong Bonsu, hanya ±9 km dari pusat kota. Suhu kolamnya dapat diatur hingga sekitar 56,6°C sehingga nyaman untuk relaksasi.",
      facts: [
        "Jarak ±9 km dari Pasir Pengaraian",
        "Kawasan Wisata Gunong Bonsu, Kec. Rambah (Rambah Tengah Hulu)",
        "Fungsi rekreasi & terapi; suhu dapat diatur hingga ±56,6°C"
      ],
      source: "Sumber ringkas: laman kabupaten, RiauMagz/Neliti/Rokapress.",
      image360: "assets/hapanasan-360.jpg",
      colors: {
        main: "var(--hapanasan-main)",
        accent: "var(--hapanasan-accent)"
      },
      fullTourHref: "#",
      address: "Kawasan Wisata Gunong Bonsu, Kec. Rambah, Rambah Tengah Hulu, Rokan Hulu, Riau",
      coordinates: "-0.2345, 100.6789",
      distance: "±9 km dari pusat kota Pasir Pengaraian"
    },
    {
      id: "rambah",
      slugClass: "rambah",
      category: "Sejarah",
      title: "Makam Raja Rambah (Kompleks Makam Raja-Raja Rambah)",
      description: "Kompleks Makam Raja-Raja Rambah menjadi saksi sejarah Kerajaan Rambah. Berada tak jauh dari Sungai Rokan Kanan, kompleks ini memuat pusara para raja dan bangsawan dengan nilai historis tinggi bagi masyarakat Rokan Hulu.",
      facts: [
        "Situs sejarah terkait Kerajaan Rambah (salah satu dari lima kerajaan Melayu di Rokan Hulu)",
        "Dahulu di area kompleks istana di tepi Sungai Rokan Kanan",
        "Diperkirakan berpindah pada awal 1800-an"
      ],
      source: "Sumber ringkas: Media Center Riau, Riau Pos, dll.",
      image360: "assets/rambah-360.jpg",
      colors: {
        main: "var(--rambah-main)",
        accent: "var(--rambah-accent)"
      },
      fullTourHref: "#",
      address: "Kompleks Makam Raja-Raja Rambah, Kec. Rambah, Rokan Hulu, Riau",
      coordinates: "-0.3456, 100.7890",
      distance: "±12 km dari pusat kota Pasir Pengaraian"
    }
  ]
};


