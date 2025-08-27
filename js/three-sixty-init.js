/**
 * initThreeSixty
 * Inisialisasi viewer 3sixty di container target (placeholder aman).
 * - Jika lib 3sixty tersedia (window.ThreeSixty atau serupa), gunakan itu.
 * - Jika belum ada sprite/berkas 360, tetap tampilkan preview statis dan status.
 *
 * @param {string|HTMLElement} containerSelector
 * @param {string} imageOrSpritePath
 * @param {object} options
 */
(function () {
  function resolveElement(sel) {
    if (typeof sel === "string") return document.querySelector(sel);
    if (sel instanceof HTMLElement) return sel;
    return null;
  }

  function markInitialized(container) {
    container.setAttribute("data-initialized", "true");
    container.classList.add("three-sixty--active");
  }

  function createStatus(text) {
    const el = document.createElement("div");
    el.textContent = text;
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    el.style.position = "absolute";
    el.style.left = "8px";
    el.style.bottom = "8px";
    el.style.background = "rgba(0,0,0,.55)";
    el.style.color = "#fff";
    el.style.padding = "6px 8px";
    el.style.borderRadius = "8px";
    el.style.fontSize = "12px";
    return el;
  }

  window.initThreeSixty = function initThreeSixty(containerSelector, imageOrSpritePath, options = {}) {
    try {
      const container = resolveElement(containerSelector);
      if (!container) return;

      if (container.getAttribute("data-initialized") === "true") return;

      const aspect = container.querySelector(".viewer-aspect");
      if (!aspect) return;

      if (window.ThreeSixty && typeof window.ThreeSixty === "function") {
        // Contoh inisialisasi (sesuaikan dengan API lib yang digunakan)
        // const viewer = new window.ThreeSixty(aspect, { image: imageOrSpritePath, ...options });
        // aspect.appendChild(viewer.canvas);
        // markInitialized(container);
        // aspect.appendChild(createStatus("Mode 360 aktif"));
        // Placeholder sementara:
        markInitialized(container);
        aspect.appendChild(createStatus("Mode 360 (mock) - ganti dengan sprite 3sixty"));
        return;
      }

      // Fallback aman: tampilkan preview statis + status
      markInitialized(container);
      aspect.appendChild(createStatus("Preview statis — file 360 belum tersedia"));

    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("initThreeSixty fallback:", err);
    }
  };
})();


