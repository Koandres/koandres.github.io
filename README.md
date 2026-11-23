# koandres.github.io

Portofolio pribadi Koandres (Web Developer): proyek, keahlian teknis, pengalaman, dan form kontak. Situs statis dua bahasa (ID/EN) tanpa build step, dipublikasikan lewat GitHub Pages.

**Demo:** https://koandres.github.io/

## Tech stack
HTML5, CSS3, dan JavaScript native. Tanpa framework, bundler, atau dependency.

## Struktur folder
```
index.html            Halaman tunggal
assets/css/           variables.css, style.css, mobile-style.css
assets/js/            main.js, i18n.js, skills-manager.js, form-validation.js, theme-toggle.js
assets/images/        Foto profil, ikon, gambar proyek (projects/)
data/projects.json    Daftar proyek
data/skills.json      Daftar skill (frontend, backend, tools)
```

## Jalan lokal
```
python3 -m http.server 8000
```
Buka http://localhost:8000 (harus lewat server, bukan file://, karena data dimuat dengan `fetch`).

## Memperbarui konten
- **Proyek / skill:** edit `data/projects.json` atau `data/skills.json`. Field `description` berbentuk `{ "en": "...", "id": "..." }`. Skill tidak memakai angka persentase; cantumkan `years` hanya jika datanya jelas.
- **Teks halaman:** edit kamus `I18N` di `assets/js/i18n.js` (kunci sama untuk `en` dan `id`); elemen HTML memakai atribut `data-i18n`.
- **Form kontak:** isi `FORM_ENDPOINT` di `assets/js/form-validation.js` dengan URL Formspree. Jika kosong, form membuka aplikasi email (mailto).
- **CV:** tombol di hero otomatis memakai `assets/CV_English_Koandres_20261123.pdf` saat EN dan `assets/CV_Koandres_20261123.pdf` saat ID.
- **Arah visual:** lihat `DESIGN.md`.
