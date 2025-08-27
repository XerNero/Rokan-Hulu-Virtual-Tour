(function () {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  function setYear() {
    const y = new Date().getFullYear();
    const el = qs("#year");
    if (el) el.textContent = y;
  }

  function setupNavToggle() {
    const btn = qs(".nav-toggle");
    const nav = qs("#primary-nav");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("active");
    });

    qsa(".nav-link", nav).forEach((a) => {
      a.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          nav.classList.remove("active");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    });

    function onResize() {
      if (window.innerWidth > 768) {
        nav.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      }
      
      // Adjust text for responsive navbar
      const rambahLink = qs('a[href="#rambah"]');
      if (rambahLink) {
        if (window.innerWidth <= 900) {
          rambahLink.textContent = "Makam Raja";
        } else {
          rambahLink.textContent = "Makam Raja Rambah";
        }
      }
    }
    
    window.addEventListener("resize", onResize);
    onResize(); // Call immediately to set initial state
  }

  function initAOSOrFallback() {
    if (window.AOS && typeof window.AOS.init === "function") {
      window.AOS.init({ duration: 700, once: true, easing: "ease-out" });
      return;
    }
    document.documentElement.classList.add("aos-fallback");
    const obs = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("aos-inview");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 }) : null;

    qsa("[data-aos]").forEach((el) => {
      if (obs) obs.observe(el);
      else el.classList.add("aos-inview");
    });
  }

  function parallaxHero() {
    const heroBg = qs(".hero-bg");
    if (!heroBg) return;
    
    let ticking = false;
    function update() {
      const scrolled = window.scrollY;
      // Batasi offset agar gambar tidak meninggalkan area (muncul abu-abu)
      const offset = Math.min(Math.max(Math.round(scrolled * 0.15), 0), 120);
      heroBg.style.transform = "none";
      heroBg.style.backgroundPosition = `center calc(50% - ${offset}px)`;
      ticking = false;
    }
    
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  function preloadHeroImage() {
    const heroPath = (window.SITE_DATA && window.SITE_DATA.hero && window.SITE_DATA.hero.image) || "assets/hero-mamic.jpg";
    const heroBg = qs(".hero-bg");
    if (!heroBg) return;
    const img = new Image();
    img.onload = () => { heroBg.style.backgroundImage = `url('${heroPath}')`; };
    img.onerror = () => { /* fallback: biarkan gradient saja */ };
    img.src = heroPath;
  }

  function renderSections() {
    const data = window.SITE_DATA;
    const root = qs("#sections-root");
    if (!data || !Array.isArray(data.sections) || !root) return;

    data.sections.forEach((s) => {
      const section = document.createElement("section");
      section.id = s.id;
      section.className = `section section--${s.slugClass}`;
      section.setAttribute("role", "region");
      section.setAttribute("aria-label", s.title);

      const inner = document.createElement("div");
      inner.className = "section-inner";
      inner.innerHTML = `
        <header class="section-header" data-aos="fade-up">
          <small class="section-kicker">${s.category}</small>
          <h2 class="section-title">${s.title}</h2>
          <p class="section-desc">${s.description}</p>
          <p class="u-source">${s.source}</p>
        </header>

        <!-- Section Card dengan Viewer 360 dan Tombol -->
        <div class="section-card" data-aos="fade-up">
          <div class="viewer three-sixty" data-id="${s.id}" data-tour-url="${s.fullTourHref}">
            <div class="viewer-aspect">
              <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="${s.image360}" alt="Pratinjau 360 ${s.title}" loading="lazy" />
            </div>
          </div>
          
          <!-- Tombol Mulai Tour dan Map -->
          <div class="section-actions" style="margin-top: 1rem;">
            <a class="btn btn-primary" href="${s.fullTourHref}" target="_blank" rel="noopener">Mulai Tour</a>
            <button class="btn btn-secondary map-toggle" type="button" aria-expanded="false" aria-controls="map-${s.id}">Lokasi</button>
          </div>
          
          <!-- Container Map -->
          <div id="map-${s.id}" class="map-container" hidden>
            <div class="map-content" aria-hidden="true">
              <div class="map-content-inner">
                <!-- Leaflet Map akan ditampilkan di sini -->
                <div id="leaflet-map-${s.id}" class="leaflet-map" style="height: 300px; border-radius: var(--radius-md); margin: 1rem 0;"></div>
                
                <!-- Info Alamat -->
                <div class="address-info" style="background: var(--surface); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid rgba(255, 255, 255, 0.3);">
                  <h4 style="color: var(--accent); margin-bottom: 1rem; font-size: 1.1rem;">📍 Informasi Lokasi</h4>
                  <div style="color: var(--text-muted); line-height: 1.6;">
                    <p><strong>Alamat:</strong> ${s.address || 'Alamat akan ditampilkan di sini'}</p>
                    <p><strong>Koordinat:</strong> ${s.coordinates || 'Koordinat akan ditampilkan di sini'}</p>
                    <p><strong>Jarak dari Pusat Kota:</strong> ${s.distance || 'Jarak akan ditampilkan di sini'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      `;
      section.appendChild(inner);
      root.appendChild(section);
    });
  }

  function setupAccordion() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".accordion-toggle");
      if (!btn) return;

      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));

      const acc = btn.parentElement?.nextElementSibling;
      if (!acc || !acc.classList.contains("accordion")) return;

      const content = acc.querySelector(".accordion-content");
      if (!content) return;

      if (expanded) {
        content.style.maxHeight = `${content.scrollHeight}px`;
        requestAnimationFrame(() => { content.style.maxHeight = "0px"; });
        setTimeout(() => {
          acc.hidden = true;
          content.setAttribute("aria-hidden", "true");
        }, 300);
      } else {
        acc.hidden = false;
        content.setAttribute("aria-hidden", "false");
        content.style.maxHeight = "0px";
        requestAnimationFrame(() => { content.style.maxHeight = `${content.scrollHeight}px`; });
      }
    });
  }

  function setupMapToggle() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".map-toggle");
      if (!btn) return;

      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));

      const mapContainer = btn.parentElement?.nextElementSibling;
      if (!mapContainer || !mapContainer.classList.contains("map-container")) return;

      const mapContent = mapContainer.querySelector(".map-content");
      if (!mapContent) return;

      if (expanded) {
        mapContent.style.maxHeight = `${mapContent.scrollHeight}px`;
        requestAnimationFrame(() => { mapContent.style.maxHeight = "0px"; });
        setTimeout(() => {
          mapContainer.hidden = true;
          mapContent.setAttribute("aria-hidden", "true");
        }, 300);
      } else {
        mapContainer.hidden = false;
        mapContent.setAttribute("aria-hidden", "false");
        mapContent.style.maxHeight = "0px";
        requestAnimationFrame(() => { mapContent.style.maxHeight = `${mapContent.scrollHeight}px`; });
        
        // Initialize Leaflet map when expanded
        const sectionId = mapContainer.id.replace('map-', '');
        initLeafletMap(sectionId);
      }
    });
  }

  function ensurePreviewImage(el) {
    const img = qs("img", el);
    if (!img) return;
    const ds = img.getAttribute("data-src");
    if (img.dataset.loaded === "true") return;
    if (!ds) return;
    img.onload = () => { img.dataset.loaded = "true"; };
    img.onerror = () => { img.removeAttribute("src"); };
    img.src = ds;
  }

  function setupThreeSixtyLazy() {
    const containers = qsa(".three-sixty");
    if (!containers.length) return;

    containers.forEach((c) => {
      const img = qs("img", c);
      const tourUrl = c.getAttribute("data-tour-url");
      
      // Make image clickable to open full tour
      if (img && tourUrl && tourUrl !== "#") {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
          window.open(tourUrl, "_blank", "noopener");
        });
        
        // Add title for accessibility
        img.title = "Klik untuk membuka tur 360 lengkap";
      }

      // Auto-initialize Pannellum without requiring a button click
      ensurePreviewImage(c);
      const src = img?.getAttribute("data-src") || img?.src || "";
      if (src && window.pannellum) {
        initPannellumViewer(c, src);
      }
    });
  }

  function initPannellumViewer(container, imageSrc) {
    if (!window.pannellum) {
      alert("[ERROR] Pannellum tidak tersedia di window. Pastikan script Pannellum sudah termuat di <head> sebelum script.js!");
      console.error('[ERROR] window.pannellum tidak tersedia di initPannellumViewer!');
      return;
    }
    if (container.getAttribute("data-initialized") === "true") {
      console.log('[DEBUG] Pannellum sudah diinisialisasi untuk container ini.');
      return;
    }
    console.log('[DEBUG] Memanggil initPannellumViewer dengan imageSrc:', imageSrc);
    
    const viewerElement = container.querySelector(".viewer-aspect");
    if (!viewerElement) return;

    // Pastikan container memiliki dimensi yang tepat untuk Pannellum
    viewerElement.style.cssText = `
      width: 100% !important;
      height: 40vh !important;
      position: relative !important;
      overflow: hidden !important;
      border-radius: 8px !important;
    `;
    // Pastikan gesture sentuh diarahkan ke canvas Pannellum
    viewerElement.style.touchAction = "none";

    // Create Pannellum viewer menggunakan library resmi dari pannellum.org
    const viewer = pannellum.viewer(viewerElement, {
      type: 'equirectangular',
      panorama: imageSrc,
      autoLoad: true,
      autoRotate: false, // Matikan auto-rotate agar pengguna dapat mengontrol
      compass: true,
      showZoomCtrl: true,
      showFullscreenCtrl: true,
      showControls: true,
      mouseZoom: true, // Aktifkan zoom dengan mouse
      touchEnabled: true, // Aktifkan touch untuk mobile
      draggable: true, // Aktifkan drag untuk memutar
      friction: 0.15, // Kurangi friction untuk kontrol yang lebih responsif
      hotSpots: [],
      onLoad: function() {
        container.setAttribute("data-initialized", "true");
        // Hide the activate button
        const activateBtn = container.querySelector(".activate-btn");
        if (activateBtn) activateBtn.style.display = "none";
        // Sembunyikan gambar pratinjau dan overlay agar drag/scroll sampai ke viewer
        const previewImg = container.querySelector("img");
        if (previewImg) {
          previewImg.style.display = "none";
          previewImg.style.pointerEvents = "none";
          previewImg.removeAttribute("title");
        }
        const overlay = container.querySelector(".viewer-overlay");
        if (overlay) overlay.style.display = "none";
        
        // Tambahkan instruksi untuk pengguna
        const instruction = document.createElement('div');
        instruction.style.cssText = `
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 14px;
          z-index: 1000;
          pointer-events: none;
          opacity: 0.9;
        `;
        instruction.innerHTML = '🖱️ Geser untuk memutar • 🔍 Scroll untuk zoom';
        viewerElement.appendChild(instruction);
        
        // Hilangkan instruksi setelah 5 detik
        setTimeout(() => {
          if (instruction.parentNode) {
            instruction.style.opacity = '0';
            setTimeout(() => {
              if (instruction.parentNode) {
                instruction.parentNode.removeChild(instruction);
              }
            }, 500);
          }
        }, 5000);
      }
    });

    // Store viewer instance
    container.pannellumViewer = viewer;
    
    // Tambahkan event listener untuk instruksi tambahan
    viewerElement.addEventListener('mousedown', function() {
      const instruction = viewerElement.querySelector('div[style*="position: absolute"]');
      if (instruction) {
        instruction.style.opacity = '0';
        setTimeout(() => {
          if (instruction.parentNode) {
            instruction.parentNode.removeChild(instruction);
          }
        }, 300);
      }
    });

    // Tambahkan CSS untuk memastikan viewer berfungsi dengan baik
    if (!document.getElementById('pannellum-custom-styles')) {
      const style = document.createElement('style');
      style.id = 'pannellum-custom-styles';
      style.textContent = `
        .pannellum-container {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
        }
        .pannellum-render-container {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
        }
        .pannellum-canvas-container {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
        }
        .pannellum-canvas {
          width: 100% !important;
          height: 100% !important;
          cursor: grab !important;
        }
        .pannellum-canvas:active {
          cursor: grabbing !important;
        }
        .pannellum-controls-container {
          z-index: 1000 !important;
        }
        .pannellum-control {
          background: rgba(0, 0, 0, 0.7) !important;
          color: white !important;
          border: none !important;
          border-radius: 4px !important;
          padding: 8px !important;
          margin: 4px !important;
          cursor: pointer !important;
        }
        .pannellum-control:hover {
          background: rgba(0, 0, 0, 0.9) !important;
        }
        .viewer-aspect {
          overflow: hidden !important;
          border-radius: 8px !important;
        }
        .viewer-aspect .pannellum-container {
          border-radius: 8px !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  function initLeafletMap(sectionId) {
    const mapContainer = document.getElementById(`leaflet-map-${sectionId}`);
    if (!mapContainer || mapContainer.leafletMap) return;

    // Koordinat yang benar untuk setiap tempat wisata (format desimal)
    const coordinatesData = {
      'mamic': {
        coords: [0.8956111111111111, 100.30888888888889],      // 0°53'44.2"N 100°18'32.4"E
        title: 'Masjid Agung Islamic Centre Rokan Hulu',
        address: 'Jl. Pembangunan, Pasir Pengaraian, Rokan Hulu, Riau',
        distance: '± 0.5 km dari pusat kota'
      },
      'hapanasan': {
        coords: [0.8302222222222222, 100.27050000000001],      // 0°49'48.8"N 100°16'13.8"E
        title: 'Air Panas Hapanasan',
        address: 'Desa Hapanasan, Kecamatan Rambah, Rokan Hulu, Riau',
        distance: '± 15 km dari pusat kota'
      },
      'rambah': {
        coords: [0.9234444444444444, 100.34013888888889],      // 0°55'24.4"N 100°20'24.5"E
        title: 'Makam Raja Rambah',
        address: 'Desa Rambah, Kecamatan Rambah, Rokan Hulu, Riau',
        distance: '± 20 km dari pusat kota'
      }
    };

    // Ambil data koordinat berdasarkan sectionId
    const locationData = coordinatesData[sectionId];
    if (!locationData) {
      console.error('Location data not found for:', sectionId);
      return;
    }

    const coords = locationData.coords;
    console.log(`Initializing map for ${sectionId} with coordinates:`, coords);
    console.log(`Location: ${locationData.title}`);
    console.log(`Coordinates DMS: ${convertToDMS(coords[0], 'lat')} ${convertToDMS(coords[1], 'lng')}`);

    try {
      // Pastikan Leaflet sudah dimuat
      if (typeof L === 'undefined') {
        console.error('Leaflet not loaded');
        return;
      }

      // Hapus map yang sudah ada jika ada
      if (mapContainer.leafletMap) {
        mapContainer.leafletMap.remove();
        mapContainer.leafletMap = null;
      }
                  
      // Buat map baru dengan konfigurasi yang lebih detail
      const map = L.map(`leaflet-map-${sectionId}`, {
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true,
        zoomSnap: 0.1,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 60
      }).setView(coords, 16); // Zoom level 16 untuk detail yang lebih baik

      // Tambahkan multiple tile layers untuk detail yang lebih baik
      
      // 1. OpenStreetMap (default) - detail jalan dan nama tempat
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 3
      }).addTo(map);

      // 2. Satellite view untuk konteks visual
      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19,
        minZoom: 3
      });

      // 3. Terrain view untuk topografi
      const terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap',
        maxZoom: 17,
        minZoom: 3
      });

      // Layer control untuk beralih antara berbagai jenis peta
      const baseMaps = {
        "Peta Jalan": osmLayer,
        "Satelit": satelliteLayer,
        "Topografi": terrainLayer
      };

      L.control.layers(baseMaps).addTo(map);

      // Tambahkan marker dengan popup yang lebih informatif
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background: #22c55e;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">📍</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(coords, {
        title: locationData.title,
        draggable: false,
        icon: customIcon
      }).addTo(map);

      // Buat popup content yang lebih detail dengan format DMS
      const popupContent = `
        <div style="text-align: center; min-width: 280px; padding: 15px;">
          <h4 style="margin: 0 0 15px 0; color: #22c55e; font-size: 18px; font-weight: 600;">${locationData.title}</h4>
          
          <div style="text-align: left; margin-bottom: 15px;">
            <p style="margin: 8px 0; font-size: 14px; display: flex; align-items: center;">
              <span style="color: #22c55e; margin-right: 8px;">📍</span>
              <strong>Alamat:</strong>
            </p>
            <p style="margin: 5px 0; font-size: 13px; color: #666; padding-left: 32px;">
              ${locationData.address}
            </p>
          </div>

          <div style="text-align: left; margin-bottom: 15px;">
            <p style="margin: 8px 0; font-size: 14px; display: flex; align-items: center;">
              <span style="color: #22c55e; margin-right: 8px;">🌍</span>
              <strong>Koordinat:</strong>
            </p>
            <p style="margin: 5px 0; font-size: 13px; color: #666; padding-left: 32px;">
              <strong>Desimal:</strong> ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}
            </p>
            <p style="margin: 5px 0; font-size: 13px; color: #666; padding-left: 32px;">
              <strong>DMS:</strong> ${convertToDMS(coords[0], 'lat')} ${convertToDMS(coords[1], 'lng')}
            </p>
          </div>

          <div style="text-align: left; margin-bottom: 15px;">
            <p style="margin: 8px 0; font-size: 14px; display: flex; align-items: center;">
              <span style="color: #22c55e; margin-right: 8px;">📏</span>
              <strong>Jarak dari Pusat Kota:</strong>
            </p>
            <p style="margin: 5px 0; font-size: 13px; color: #666; padding-left: 32px;">
              ${locationData.distance}
            </p>
          </div>

          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;">
            <small style="color: #999; font-style: italic;">
              💡 Gunakan kontrol di pojok kanan atas untuk beralih antara peta jalan, satelit, dan topografi
            </small>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 400,
        className: 'custom-popup',
        closeButton: true,
        autoClose: false
      });

      // Tambahkan custom popup styles
      if (!document.getElementById('leaflet-popup-styles')) {
        const style = document.createElement('style');
        style.id = 'leaflet-popup-styles';
        style.textContent = `
          .custom-popup .leaflet-popup-content-wrapper {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            border: 1px solid rgba(0,0,0,0.1);
          }
          .custom-popup .leaflet-popup-tip {
            background: white;
            border: 1px solid rgba(0,0,0,0.1);
          }
          .custom-popup .leaflet-popup-close-button {
            color: #666;
            font-size: 18px;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.2s ease;
          }
          .custom-popup .leaflet-popup-close-button:hover {
            color: #22c55e;
            background: rgba(34, 197, 94, 0.1);
          }
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Fit bounds untuk memastikan marker terlihat dengan padding yang cukup
      map.fitBounds([coords], { padding: [30, 30] });

      // Tambahkan scale bar untuk referensi jarak
      L.control.scale({
        maxWidth: 200,
        metric: true,
        imperial: false,
        position: 'bottomleft'
      }).addTo(map);

      // Tambahkan fullscreen control
      L.control.fullscreen({
        position: 'topleft',
        title: {
          'false': 'Lihat Fullscreen',
          'true': 'Keluar Fullscreen'
        }
      }).addTo(map);

      // Store map instance
      mapContainer.leafletMap = map;

      // Trigger resize event untuk memastikan map render dengan benar
      setTimeout(() => {
        map.invalidateSize();
        
        // Tambahkan event listener untuk popup
        marker.on('click', function() {
          // Auto-open popup
          this.openPopup();
        });
      }, 100);

      console.log(`Map initialized successfully for ${sectionId} with enhanced features`);
      console.log(`Marker placed at: ${coords[0]}, ${coords[1]}`);

    } catch (error) {
      console.error('Error initializing Leaflet map for', sectionId, error);
      
      // Fallback: tampilkan pesan error yang informatif
      mapContainer.innerHTML = `
        <div style="background: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 8px; padding: 40px; text-align: center; color: #6c757d;">
          <i class="fas fa-exclamation-triangle" style="font-size: 24px; color: #dc3545; margin-bottom: 10px;"></i>
          <p style="margin: 0; font-size: 14px;">Gagal memuat peta</p>
          <small style="color: #adb5bd;">Coba refresh halaman atau periksa koneksi internet</small>
          <br><br>
          <small style="color: #6c757d;">Koordinat: ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}</small>
          <br>
          <small style="color: #6c757d;">DMS: ${convertToDMS(coords[0], 'lat')} ${convertToDMS(coords[1], 'lng')}</small>
        </div>
      `;
    }
  }

  // Fungsi untuk mengkonversi koordinat desimal ke format DMS
  function convertToDMS(decimal, type) {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);

    let direction = '';
    if (type === 'lat') {
      direction = decimal >= 0 ? 'N' : 'S';
    } else if (type === 'lng') {
      direction = decimal >= 0 ? 'E' : 'W';
    }

    return `${degrees}°${minutes}'${seconds}"${direction}`;
  }

  function setupActiveNavHighlight() {
    const linkMap = new Map();
    qsa(".nav-link").forEach((a) => {
      const id = a.getAttribute("href")?.replace("#", "");
      if (id) linkMap.set(id, a);
    });

    const sections = ["hero", ...(window.SITE_DATA?.sections?.map(s => s.id) || []), "about"]
      .map(id => qs(`#${id}`))
      .filter(Boolean);

    const header = qs(".site-header");
    
    const setActive = (id) => {
      qsa(".nav-link").forEach(a => a.classList.remove("active"));
      const link = linkMap.get(id);
      if (link) link.classList.add("active");
      
      // Change navbar background based on active section
      if (header) {
        header.classList.remove("nav-mamic", "nav-hapanasan", "nav-rambah", "nav-about");
        if (id === "mamic") {
          header.classList.add("nav-mamic");
        } else if (id === "hapanasan") {
          header.classList.add("nav-hapanasan");
        } else if (id === "rambah") {
          header.classList.add("nav-rambah");
        } else if (id === "about") {
          header.classList.add("nav-about");
        }
      }
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      }, { threshold: 0.3 });
      sections.forEach(sec => io.observe(sec));
    } else {
      window.addEventListener("scroll", () => {
        let nearest = { id: "hero", dist: Infinity };
        sections.forEach((sec) => {
          const rect = sec.getBoundingClientRect();
          const dist = Math.abs(rect.top);
          if (dist < nearest.dist) nearest = { id: sec.id, dist };
        });
        setActive(nearest.id);
      }, { passive: true });
    }
  }

  function init() {
    setYear();
    setupNavToggle();
    initAOSOrFallback();
    parallaxHero();
    preloadHeroImage();
    renderSections();
    setupAccordion();
    setupMapToggle();
    setupThreeSixtyLazy();
    setupActiveNavHighlight();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


