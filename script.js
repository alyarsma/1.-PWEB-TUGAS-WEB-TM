"use strict";

// ===== DATA AWAL =====
const defaultData = [
  {
    kode: "NKY-001",
    nama: "Rem Re:Zero Maid Dress",
    kategori: "anime",
    jumlah: 3,
    satuan: "set",
    harga: 150000,
    tanggalMasuk: "2025-10-01",
    supplier: "NekoCraft Studio",
    daerah: "Jakarta",
    keterangan: "Kostum Rem lengkap dengan headdress dan aksesoris",
    foto: "picture/rem.jpg",
  },
  {
    kode: "NKY-002",
    nama: "Hololive Kobo Kanaeru",
    kategori: "vtuber",
    jumlah: 2,
    satuan: "set",
    harga: 200000,
    tanggalMasuk: "2025-11-15",
    supplier: "VTuber Costumes ID",
    daerah: "Surabaya",
    keterangan: "Full set Kobo Kanaeru ID gen3, termasuk topi dan aksesori",
    foto: "picture/Kobo Kanaeru.jpg",
  },
  {
    kode: "NKY-003",
    nama: "Genshin Impact Hu Tao",
    kategori: "game",
    jumlah: 4,
    satuan: "set",
    harga: 175000,
    tanggalMasuk: "2025-12-03",
    supplier: "GenshinWear",
    daerah: "Bandung",
    keterangan: "Kostum Hu Tao Genshin Impact, ukuran S/M/L tersedia",
    foto: "picture/hu tao.jpg",
  },
  {
    kode: "NKY-004",
    nama: "Demon Slayer Nezuko",
    kategori: "anime",
    jumlah: 1,
    satuan: "set",
    harga: 120000,
    tanggalMasuk: "2026-01-20",
    supplier: "AnimeWear Nusantara",
    daerah: "Yogyakarta",
    keterangan: "Kostum Nezuko lengkap dengan bamboo prop",
    foto: "picture/Nezuko.jpg",
  },
  {
    kode: "NKY-005",
    nama: "Hololive Ayunda Risu",
    kategori: "vtuber",
    jumlah: 2,
    satuan: "set",
    harga: 185000,
    tanggalMasuk: "2026-02-10",
    supplier: "VTuber Costumes ID",
    daerah: "Jember",
    keterangan: "Full set Risu ID gen1, eksklusif daerah Jember",
    foto: "picture/Ayunda Risu.jpg",
  },

  {
    kode: "NKY-006",
    nama: "Ai Hoshino",
    kategori: "anime",
    jumlah: 0,
    satuan: "set",
    harga: 190000,
    tanggalMasuk: "2026-04-10",
    supplier: "AnimeWear Nusantara",
    daerah: "Yogyakarta",
    keterangan: "kostum Ai Hoshino lengkap dengan aksesori bintang",
    foto: "picture/Ai Hoshino.jpg",
  },

  {
    kode: "NKY-007",
    nama: "Hololive Zeta",
    kategori: "anime",
    jumlah: 2,
    satuan: "set",
    harga: 190000,
    tanggalMasuk: "2026-04-10",
    supplier: "VTuber Costumes ID",
    daerah: "Yogyakarta",
    keterangan: "kostum Hololive Zeta lengkap dengan aksesoris dan wig",
    foto: "picture/Zeta.jpg",
  },

  {
    kode: "NKY-008",
    nama: "Anya Forger",
    kategori: "anime",
    jumlah: 11,
    satuan: "set",
    harga: 120000,
    tanggalMasuk: "2026-04-21",
    supplier: "AnimeWear Nusantara",
    daerah: "Yogyakarta",
    keterangan:
      "kostum Anya Forger lengkap dengan wig pink dan aksesori boneka",
    foto: "picture/Anya Forger.jpg",
  },

  {
    kode: "NKY-009",
    nama: "Luffy Gear 5",
    kategori: "anime",
    jumlah: 11,
    satuan: "set",
    harga: 160000,
    tanggalMasuk: "2026-04-21",
    supplier: "AnimeWear Nusantara",
    daerah: "Yogyakarta",
    keterangan:
      "kostum Luffy Gear 5 lengkap dengan aksesori topi jerami dan wig",
    foto: "picture/Luffy Gear 5.jpg",
  },

  {
    kode: "NKY-010",
    nama: "Elizabeth Gintama",
    kategori: "anime",
    jumlah: 0,
    satuan: "set",
    harga: 90000,
    tanggalMasuk: "2026-04-01",
    supplier: "Dextonasia Cosplay",
    daerah: "Bali",
    keterangan:
      "kostum om Elizabeth",
    foto: "picture/Elizabeth.jpg",
  },

  {
    kode: "NKY-010",
    nama: "Makima Chainsaw Man",
    kategori: "anime",
    jumlah: 0,
    satuan: "set",
    harga: 90000,
    tanggalMasuk: "2026-04-01",
    supplier: "Dextonasia Cosplay",
    daerah: "Bali",
    keterangan:
      "kostum Makima Chainsaw Man",
    foto: "picture/Makima.jpg",
  },

  {
    kode: "NKY-011",
    nama: "Ada Wong Resident Evil",
    kategori: "game",
    jumlah: 6,
    satuan: "set",
    harga: 90000,
    tanggalMasuk: "2026-04-09",
    supplier: "Dextonasia Cosplay",
    daerah: "Bali",
    keterangan:
      "Tidak dengan wig",
    foto: "picture/Ada Wong.jpg",
  },

];

const STORAGE_KEY = "nekoya_inventory";
let inventory = [];
let editIndex = null;
let deleteIndex = null;

const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    inventory = stored ? JSON.parse(stored) : [...defaultData];
  } catch {
    inventory = [...defaultData];
  }
};

const saveData = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
  } catch (e) {
    console.error("Storage error:", e);
  }
};

const emojiMap = { anime: "🌸", vtuber: "🎭", game: "🎮", original: "✨" };
const formatRp = (n) => "Rp" + Number(n).toLocaleString("id-ID");

const renderKatalog = (data) => {
  const grid = document.getElementById("cardGrid");
  if (!data.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--blue-glow);font-weight:700;">😿 Tidak ada kostum yang cocok dengan filter kamu.</div>`;
    document.getElementById("countLabel").textContent = "0 kostum ditemukan";
    return;
  }
  document.getElementById("countLabel").textContent =
    `Menampilkan ${data.length} kostum`;
  grid.innerHTML = data
    .map((item) => {
      const isLow = item.jumlah < 5;
      const emoji = emojiMap[item.kategori] || "🎀";
      const bgColors = {
        anime: "135deg,#1a3a8f,#7c3aed",
        vtuber: "135deg,#0f766e,#1a3a8f",
        game: "135deg,#7c2d12,#1a3a8f",
        original: "135deg,#4a1d96,#1a3a8f",
      };
      return `
      <article class="card" onclick="handleCardClick(${inventory.indexOf(item)})">
        <div class="card-img" style="background:linear-gradient(${bgColors[item.kategori] || bgColors.anime})">
          ${item.foto ? `<img src="${item.foto}" alt="${item.nama}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/>` : `<span style="font-size:3.5rem;position:relative;z-index:1;">${emoji}</span>`}
          <div class="card-badge">${item.kategori.toUpperCase()}</div>
        </div>
        <div class="card-body">
          <div class="card-name">${item.nama}</div>
          <div class="card-series">${item.daerah}</div>
          <div class="card-meta">
            <div class="card-price">${formatRp(item.harga)}<br/><small>/hari</small></div>
            <div class="card-loc">${item.daerah}</div>
          </div>
        </div>
        ${isLow ? `<div class="card-stock-low">⚠️ Stok Menipis (${item.jumlah} tersisa)</div>` : ""}
      </article>
    `;
    })
    .join("");
};

const handleCardClick = (i) => {
  localStorage.setItem("nekoya_edit_index", i);
  window.location.href = "tambah.html";
};

const filterKatalog = () => {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  const katFilter = document.getElementById("filterKategori").value;
  const daerahFilter = document.getElementById("filterDaerah").value;
  const maxPrice = parseInt(document.getElementById("priceRange").value);
  const cbAnime = document.getElementById("cb-anime").checked;
  const cbVtuber = document.getElementById("cb-vtuber").checked;
  const cbGame = document.getElementById("cb-game").checked;
  const cbOriginal = document.getElementById("cb-original").checked;
  const anyCbChecked = cbAnime || cbVtuber || cbGame || cbOriginal;

  const filtered = inventory.filter((item) => {
    const matchQ =
      !q ||
      item.nama.toLowerCase().includes(q) ||
      item.kode.toLowerCase().includes(q);
    const matchKat = !katFilter || item.kategori === katFilter;
    const matchDaerah = !daerahFilter || item.daerah === daerahFilter;
    const matchPrice = item.harga <= maxPrice;
    const matchCb =
      !anyCbChecked ||
      (cbAnime && item.kategori === "anime") ||
      (cbVtuber && item.kategori === "vtuber") ||
      (cbGame && item.kategori === "game") ||
      (cbOriginal && item.kategori === "original");
    return matchQ && matchKat && matchDaerah && matchPrice && matchCb;
  });
  renderKatalog(filtered);
};

const resetFilter = () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterKategori").value = "";
  document.getElementById("filterDaerah").value = "";
  document.getElementById("priceRange").value = 500000;
  document.getElementById("priceLabel").textContent = "Rp500rb";
  ["cb-anime", "cb-vtuber", "cb-game", "cb-original"].forEach(
    (id) => (document.getElementById(id).checked = false),
  );
  renderKatalog(inventory);
};

const updatePrice = (val) => {
  document.getElementById("priceLabel").textContent = `Rp${Number(val)
    .toLocaleString("id-ID")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`.replace(/,/g, ".");
  filterKatalog();
};

const renderTabel = (data) => {
  const tbody = document.getElementById("tabelBody");
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:2rem;color:var(--blue-glow);">Tidak ada data.</td></tr>`;
    return;
  }
  tbody.innerHTML = data
    .map((item) => {
      const realIdx = inventory.indexOf(item);
      const isLow = item.jumlah < 5;
      let statusClass = "badge-available",
        statusText = "Tersedia";
      if (isLow && item.jumlah > 0) {
        statusClass = "badge-limited";
        statusText = "Terbatas";
      }
      if (item.jumlah === 0) {
        statusClass = "badge-rented";
        statusText = "Habis";
      }
      return `
      <tr>
        <td style="font-family:'Orbitron',sans-serif;font-size:0.78rem;">${item.kode}</td>
        <td>${item.nama}</td>
        <td>${item.kategori}</td>
        <td style="${isLow ? "color:var(--accent-pink);font-weight:800;" : ""}">${item.jumlah} ${item.satuan}</td>
        <td style="font-weight:700;color:var(--accent-gold);">${formatRp(item.harga)}</td>
        <td>${item.supplier}</td>
        <td>${item.tanggalMasuk}</td>
        <td><span class="badge-status ${statusClass}">${statusText}</span></td>
        <td>
          <button class="btn-edit" onclick="editItem(${realIdx})">Edit</button>
          <button class="btn-del" onclick="hapusItem(${realIdx})">Hapus</button>
        </td>
      </tr>
    `;
    })
    .join("");
};

const filterTabel = () => {
  const q = document.getElementById("tabelSearch").value.toLowerCase();
  const filtered = inventory.filter(
    (item) =>
      item.nama.toLowerCase().includes(q) ||
      item.kode.toLowerCase().includes(q),
  );
  renderTabel(filtered);
};

const renderStats = () => {
  const total = inventory.length;
  const nilaiTotal = inventory.reduce(
    (acc, cur) => acc + cur.harga * cur.jumlah,
    0,
  );
  const stokMenipis = inventory.filter((i) => i.jumlah < 5).length;
  const totalUnit = inventory.reduce((acc, cur) => acc + cur.jumlah, 0);

  const statTotal = document.getElementById("statTotal");
  if (statTotal) {
    statTotal.textContent = total;
  }

  const statsGrid = document.getElementById("statsGrid");
  if (statsGrid) {
    statsGrid.innerHTML = `
  <div class="stat-card">
    <div class="number">${total}</div>
    <div class="label">Total Item</div>
  </div>

  <div class="stat-card">
    <div class="number">${(nilaiTotal / 1000000).toFixed(1)}jt</div>
    <div class="label">Nilai Inventaris</div>
  </div>

  <div class="stat-card">
    <div class="number">${totalUnit}</div>
    <div class="label">Total Unit</div>
  </div>

  <div class="stat-card ${stokMenipis > 0 ? "low-stock-warning" : ""}">
    <div class="number">${stokMenipis}</div>
    <div class="label">Stok Menipis</div>
  </div>
`;
  }

  const sidebarStat = document.getElementById("sidebarStat");
  if (sidebarStat) {
    sidebarStat.innerHTML = `
      <div class="sidebar-stat-item"><span class="key">Total Item</span><span class="val">${total}</span></div>
      <div class="sidebar-stat-item"><span class="key">Total Unit</span><span class="val">${totalUnit}</span></div>
      <div class="sidebar-stat-item"><span class="key">Nilai Total</span><span class="val">${(nilaiTotal / 1000000).toFixed(1)}jt</span></div>
      <div class="sidebar-stat-item"><span class="key">Stok Menipis</span><span class="val ${stokMenipis > 0 ? "danger" : ""}">${stokMenipis}</span></div>
    `;
  }
};

const fields = [
  "kodeBarang",
  "namaBarang",
  "kategori",
  "jumlah",
  "satuan",
  "harga",
  "tanggalMasuk",
  "supplier",
  "daerah",
];
const errIds = {
  kodeBarang: "err-kode",
  namaBarang: "err-nama",
  kategori: "err-kategori",
  jumlah: "err-jumlah",
  satuan: "err-satuan",
  harga: "err-harga",
  tanggalMasuk: "err-tanggal",
  supplier: "err-supplier",
  daerah: "err-daerah",
};

const validate = () => {
  let valid = true;
  fields.forEach((f) => {
    const el = document.getElementById(f);
    const errEl = document.getElementById(errIds[f]);
    const val = el.value.trim();
    if (!val) {
      el.classList.add("error");
      errEl.classList.add("show");
      valid = false;
    } else {
      el.classList.remove("error");
      errEl.classList.remove("show");
    }
  });
  return valid;
};

const getFormData = () => ({
  kode: document.getElementById("kodeBarang").value.trim(),
  nama: document.getElementById("namaBarang").value.trim(),
  kategori: document.getElementById("kategori").value,
  jumlah: parseInt(document.getElementById("jumlah").value),
  satuan: document.getElementById("satuan").value,
  harga: parseInt(document.getElementById("harga").value),
  tanggalMasuk: document.getElementById("tanggalMasuk").value,
  supplier: document.getElementById("supplier").value.trim(),
  daerah: document.getElementById("daerah").value,
  keterangan: document.getElementById("keterangan").value.trim(),
  foto: document.getElementById("fotoBarang").dataset.base64 || "",
});

const submitForm = () => {
  if (!validate()) {
    showToast("⚠️ Lengkapi semua field yang wajib diisi!", "error");
    return;
  }
  const data = getFormData();
  if (editIndex !== null) {
    inventory[editIndex] = data;
    showToast("✅ Kostum berhasil diperbarui!", "success");
    editIndex = null;
    document.getElementById("formTitle").textContent = "Tambah Kostum Baru";
    document.getElementById("submitBtn").textContent = "✨ Simpan Kostum";
  } else {
    const dupKode = inventory.find((i) => i.kode === data.kode);
    if (dupKode) {
      showToast("❌ Kode barang sudah ada!", "error");
      return;
    }
    inventory.push(data);
    showToast("🎉 Kostum baru berhasil ditambahkan!", "success");
  }
  saveData();
  refreshAll();
  resetForm();
};

const resetForm = () => {
  fields.forEach((f) => {
    const el = document.getElementById(f);
    el.value = "";
    el.classList.remove("error");
  });
  ["keterangan", "fotoBarang"].forEach(
    (f) => (document.getElementById(f).value = ""),
  );
  document.getElementById("fotoBarang").dataset.base64 = "";
  document.getElementById("fotoPreview").innerHTML =
    "<span>📷 Belum ada foto dipilih</span>";
  Object.values(errIds).forEach((id) =>
    document.getElementById(id).classList.remove("show"),
  );
  editIndex = null;
  document.getElementById("formTitle").textContent = "Tambah Kostum Baru";
  document.getElementById("submitBtn").textContent = "✨ Simpan Kostum";
};

const editItem = (i) => {
  editIndex = i;
  const item = inventory[i];
  document.getElementById("kodeBarang").value = item.kode;
  document.getElementById("namaBarang").value = item.nama;
  document.getElementById("kategori").value = item.kategori;
  document.getElementById("jumlah").value = item.jumlah;
  document.getElementById("satuan").value = item.satuan;
  document.getElementById("harga").value = item.harga;
  document.getElementById("tanggalMasuk").value = item.tanggalMasuk;
  document.getElementById("supplier").value = item.supplier;
  document.getElementById("daerah").value = item.daerah;
  document.getElementById("keterangan").value = item.keterangan || "";
  document.getElementById("formTitle").textContent = "✏️ Edit Kostum";
  document.getElementById("submitBtn").textContent = "💾 Update Kostum";
  if (item.foto) {
    document.getElementById("fotoPreview").innerHTML =
      `<img src="${item.foto}" alt="preview"/>`;
  }
  document
    .getElementById("form-section")
    .scrollIntoView({ behavior: "smooth" });
};

const hapusItem = (i) => {
  deleteIndex = i;
  document.getElementById("modalItemName").textContent =
    `"${inventory[i].nama}"`;
  document.getElementById("modalHapus").classList.add("active");
};

const closeModal = () => {
  document.getElementById("modalHapus").classList.remove("active");
  deleteIndex = null;
};

const confirmHapus = () => {
  if (deleteIndex !== null) {
    const nama = inventory[deleteIndex].nama;
    inventory.splice(deleteIndex, 1);
    saveData();
    refreshAll();
    closeModal();
    showToast(`🗑️ "${nama}" telah dihapus.`, "success");
  }
};

const modalHapus = document.getElementById("modalHapus");
if (modalHapus) {
  modalHapus.addEventListener("click", (e) => {
    if (e.target === modalHapus) closeModal();
  });
}

const previewFoto = (input) => {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const src = e.target.result;
    document.getElementById("fotoPreview").innerHTML =
      `<img src="${src}" alt="preview"/>`;
    document.getElementById("fotoBarang").dataset.base64 = src;
  };
  reader.readAsDataURL(file);
};

const showToast = (msg, type = "success") => {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove("show"), 3500);
};

const refreshAll = () => {
  if (document.getElementById("cardGrid")) renderKatalog(inventory);
  if (document.getElementById("tabelBody")) renderTabel(inventory);
  if (
    document.getElementById("statsGrid") ||
    document.getElementById("sidebarStat") ||
    document.getElementById("statTotal")
  ) {
    renderStats();
  }
};

const toggleMenu = () => {
  document.getElementById("navMenu").classList.toggle("open");
  document.getElementById("hamburger").classList.toggle("open");
};

document.querySelectorAll(".nav-menu a").forEach((a) =>
  a.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("open");
  }),
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const generateStars = () => {
  const container = document.getElementById("stars");
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 4}s;
      animation-duration: ${2 + Math.random() * 3}s;
      opacity: ${0.1 + Math.random() * 0.5};
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
    `;
    container.appendChild(star);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  refreshAll();

  if (document.getElementById("stars")) {
    generateStars();
  }

  const tanggalMasuk = document.getElementById("tanggalMasuk");
  if (tanggalMasuk) {
    const today = new Date().toISOString().split("T")[0];
    tanggalMasuk.value = today;
  }

  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (nav) {
      nav.style.background =
        window.scrollY > 50 ? "rgba(5,8,23,0.98)" : "rgba(10,15,46,0.92)";
    }
  });
});

const footerYear = document.getElementById("footerYear");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// const footer = document.getElementById("footer");

// if (footer) {
//   footer.innerHTML = `
//     <div class="container">
//       <div class="footer-main">
//         <div class="footer-brand-card">
//           <a href="index.html" class="footer-brand-top">
//             <div class="logo-icon">
//               <img src="picture/Logo Nekoya.png" alt="Logo Nekoya" />
//             </div>
//             <div>
//               <span class="logo-text">NEKOYA</span>
//               <span class="logo-sub">Cosplay Rental</span>
//             </div>
//           </a>

//           <p class="footer-brand-desc">
//             Platform rental cosplay anime, Vtuber, dan karakter game terbesar di
//             Indonesia. Terpercaya, berkualitas, dan tersebar di berbagai daerah.
//           </p>

//           <div class="footer-social">
//             <a href="#" class="social-btn" aria-label="Instagram">
//               <img src="picture/instagram.png" alt="Instagram" class="social-icon" />
//             </a>
//             <a href="#" class="social-btn" aria-label="TikTok">
//               <img src="picture/tiktok.png" alt="TikTok" class="social-icon" />
//             </a>
//             <a href="#" class="social-btn" aria-label="Discord">
//               <img src="picture/discord.png" alt="Discord" class="social-icon" />
//             </a>
//             <a href="#" class="social-btn" aria-label="Twitter">
//               <img src="picture/twitter.png" alt="Twitter" class="social-icon" />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div class="footer-bottom-bar">
//         <p>© 2026 <span>NEKOYA Cosplay Rental</span>. All rights reserved.</p>

//         <div class="footer-bottom-links">
//           <a href="#">Privacy Policy</a>
//           <a href="#">Terms of Service</a>
//           <a href="kontak.html">Contact Us</a>
//           <a href="#">Version 1.0</a>
//         </div>
//       </div>
//     </div>
//   `;
// }
