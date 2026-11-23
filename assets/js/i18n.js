/**
 * Multi-language support (EN / ID)
 * - Static text: elements with data-i18n="key" or data-i18n-attr="attr:key"
 * - Dynamic text (JS): t('key', { var: value })
 * - Bilingual JSON fields ({ "en": "...", "id": "..." }): pick(value)
 * To add a language, add a block to I18N and its code to LANGS.
 */

const LANGS = ['en', 'id'];

const I18N = {
    en: {
        'skip': 'Skip to main content',
        'nav.homeLabel': 'Home',
        'nav.menu': 'Toggle menu',
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.experience': 'Experience',
        'nav.contact': 'Contact',
        'nav.lang': 'Switch language',
        'nav.theme': 'Toggle dark mode',
        'hero.greeting': "Hello, I'm",
        'hero.subtitle': 'Web Developer',
        'hero.desc': 'I build ERP systems, REST APIs, and dashboards with PHP, CodeIgniter, and MySQL.',
        'hero.projects': 'View Projects',
        'hero.cv': 'Download CV (PDF)',
        'hero.contact': 'Contact Me',
        'hero.image': 'Photo of Koandres, Web Developer',
        'projects.title': 'Featured Projects',
        'filter.all': 'All',
        'filter.frontend': 'Frontend',
        'filter.backend': 'Backend',
        'filter.fullstack': 'Full Stack',
        'project.demo': 'Live Demo',
        'project.demoNA': 'Demo N/A',
        'project.github': 'GitHub',
        'project.private': 'Code Private',
        'project.demoLabel': 'View live demo of {title}',
        'project.demoNALabel': 'Live demo not available for {title}',
        'project.codeLabel': 'View source code of {title} on GitHub',
        'project.codeNALabel': 'Source code not available for {title}',
        'project.alt': '{title} project screenshot',
        'project.error': 'Failed to load projects. Please try again later.',
        'retry': 'Retry',
        'skills.title': 'Technical Skills',
        'skills.subtitle': 'Technologies I work with',
        'skills.tablist': 'Skills categories',
        'skills.tools': 'Tools & DevOps',
        'skills.error': 'Skills data could not be loaded.',
        'skills.empty': 'No skills in this category yet.',
        'skill.year': 'year',
        'skill.years': 'years',
        'exp.title': 'Experience & Education',
        'exp.subtitle': 'My professional journey',
        'exp.askara.date': 'Feb 2026 - Aug 2026',
        'exp.askara.b1': 'Developed, maintained, and enhanced 4 core enterprise applications using native PHP, CodeIgniter 3, MySQL, and PostgreSQL.',
        'exp.askara.b2': 'Investigated and optimized complex queries across a 20+ related-table architecture, resolving staging/production server bottlenecks and cutting dashboard load time from 30+ seconds to 1 second.',
        'exp.askara.b3': 'Built REST API endpoints for 7 ERP business modules with very low latency (response time < 500ms) using token-based authentication and OAuth 2.0.',
        'exp.askara.b4': 'Took part in routine database maintenance to keep queries stable on logistics data holding hundreds of thousands of rows.',
        'exp.askara.b5': 'Added two-wheeler vehicle support to the SITA Legacy Checksheet module through a database schema change, without disrupting existing data.',
        'exp.askara.b6': 'Worked closely with the System Analyst to implement features, fix cross-functional bugs, and ensure the system passed testing before deployment.',
        'exp.poltek.date': 'Mar 2024 - Oct 2024',
        'exp.poltek.b1': 'Developed an internal evaluation website using CodeIgniter 3 and MySQL.',
        'exp.poltek.b2': 'Improved evaluation process efficiency through report automation and data visualization.',
        'exp.poltek.b3': 'Built APIs serving 200+ active users.',
        'exp.inti.date': 'Aug 2023 - Dec 2023',
        'exp.inti.b1': 'Developed backend systems for the Automated Forklift (AGV) project using Django and PostgreSQL.',
        'exp.inti.b2': 'Integrated an OpenCV-based computer vision system with a Django-based control system to process Automated Forklift navigation data in real time.',
        'exp.inti.b3': 'Built and optimized APIs for real-time integration between sensors, AI models, and control interfaces.',
        'edu.title': 'D4 Informatics Engineering (Applied Bachelor)',
        'edu.desc': 'GPA 3.94 / 4.00. Relevant coursework: Algorithms, Data Structures, Web Development, Database Systems, Machine Learning, Mobile Development.',
        'edu.t1': 'Algorithms',
        'edu.t2': 'Data Structures',
        'edu.t3': 'Web Development',
        'edu.t4': 'Mobile Development',
        'edu.t5': 'Machine Learning',
        'contact.title': 'Get In Touch',
        'contact.subtitle': "Let's work together!",
        'contact.infoTitle': 'Contact Information',
        'contact.infoText': "I'm currently open to new opportunities and interesting projects. Feel free to reach out if you'd like to collaborate!",
        'contact.location': 'Location',
        'contact.locationValue': 'Central Java, Indonesia',
        'contact.availability': 'Availability',
        'contact.availabilityValue': 'Open to opportunities',
        'form.name': 'Full Name *',
        'form.email': 'Email Address *',
        'form.subject': 'Subject',
        'form.message': 'Message *',
        'form.send': 'Send Message',
        'form.note': 'This form opens your email app; no message is stored on this site.',
        'form.sending': 'Sending...',
        'form.success': "Message sent successfully! I'll get back to you soon.",
        'form.required': 'This field is required',
        'form.emailInvalid': 'Please enter a valid email address',
        'form.nameInvalid': "Name must be 2-50 characters and contain only letters, spaces, and . ' -",
        'form.msgShort': 'Message must be at least 10 characters',
        'form.msgLong': 'Message must be less than 1000 characters',
        'form.fix': 'Please fix all errors before submitting.',
        'form.fail': 'Failed to send message. Please try again later.',
        'form.mailSubject': 'Contact from portfolio',
        'footer.rights': 'All rights reserved.',
        'footer.credits': 'Built with ❤️ using pure HTML, CSS, and JavaScript',
        'footer.top': 'Back to top'
    },
    id: {
        'skip': 'Lewati ke konten utama',
        'nav.homeLabel': 'Beranda',
        'nav.menu': 'Buka/tutup menu',
        'nav.home': 'Beranda',
        'nav.projects': 'Proyek',
        'nav.skills': 'Keahlian',
        'nav.experience': 'Pengalaman',
        'nav.contact': 'Kontak',
        'nav.lang': 'Ganti bahasa',
        'nav.theme': 'Ganti mode gelap',
        'hero.greeting': 'Halo, saya',
        'hero.subtitle': 'Web Developer',
        'hero.desc': 'Saya membangun sistem ERP, REST API, dan dashboard dengan PHP, CodeIgniter, dan MySQL.',
        'hero.projects': 'Lihat Proyek',
        'hero.cv': 'Unduh CV (PDF)',
        'hero.contact': 'Hubungi Saya',
        'hero.image': 'Foto Koandres, Web Developer',
        'projects.title': 'Proyek Unggulan',
        'filter.all': 'Semua',
        'filter.frontend': 'Frontend',
        'filter.backend': 'Backend',
        'filter.fullstack': 'Full Stack',
        'project.demo': 'Demo Langsung',
        'project.demoNA': 'Demo Tidak Tersedia',
        'project.github': 'GitHub',
        'project.private': 'Kode Privat',
        'project.demoLabel': 'Lihat demo langsung {title}',
        'project.demoNALabel': 'Demo langsung {title} tidak tersedia',
        'project.codeLabel': 'Lihat kode sumber {title} di GitHub',
        'project.codeNALabel': 'Kode sumber {title} tidak tersedia',
        'project.alt': 'Tangkapan layar proyek {title}',
        'project.error': 'Gagal memuat proyek. Silakan coba lagi nanti.',
        'retry': 'Coba lagi',
        'skills.title': 'Keahlian Teknis',
        'skills.subtitle': 'Teknologi yang saya gunakan',
        'skills.tablist': 'Kategori keahlian',
        'skills.tools': 'Tools & DevOps',
        'skills.error': 'Data keahlian gagal dimuat.',
        'skills.empty': 'Belum ada keahlian di kategori ini.',
        'skill.year': 'tahun',
        'skill.years': 'tahun',
        'exp.title': 'Pengalaman & Pendidikan',
        'exp.subtitle': 'Perjalanan profesional saya',
        'exp.askara.date': 'Feb 2026 - Agu 2026',
        'exp.askara.b1': 'Mengembangkan, memelihara, dan melakukan enhancement pada 4 aplikasi enterprise inti menggunakan PHP Native, CodeIgniter 3, MySQL, dan PostgreSQL.',
        'exp.askara.b2': 'Melakukan investigasi dan optimasi kueri kompleks pada arsitektur 20+ tabel berelasi, berhasil mengatasi bottleneck server staging/produksi dan memangkas waktu load dashboard dari 30+ detik menjadi 1 detik.',
        'exp.askara.b3': 'Membangun endpoint REST API untuk 7 modul bisnis ERP dengan latensi respons sangat rendah (waktu respons < 500ms) menggunakan token-based authentication dan OAuth 2.0.',
        'exp.askara.b4': 'Terlibat dalam pemeliharaan berkala database untuk mengelola kestabilan kueri data logistik yang menampung hingga ratusan ribu baris data.',
        'exp.askara.b5': 'Menambahkan dukungan kendaraan roda dua pada modul Checksheet SITA Legacy melalui perubahan skema database, tanpa mengganggu data existing.',
        'exp.askara.b6': 'Berkolaborasi erat dengan System Analyst untuk mengimplementasikan fitur, melakukan penanganan bug lintas fungsi, serta memastikan sistem lolos uji pengetesan sebelum deployment.',
        'exp.poltek.date': 'Mar 2024 - Okt 2024',
        'exp.poltek.b1': 'Mengembangkan website evaluasi internal menggunakan CodeIgniter 3 dan MySQL.',
        'exp.poltek.b2': 'Meningkatkan efisiensi proses evaluasi melalui otomatisasi laporan dan visualisasi data.',
        'exp.poltek.b3': 'Membangun API yang melayani 200+ pengguna aktif.',
        'exp.inti.date': 'Agu 2023 - Des 2023',
        'exp.inti.b1': 'Mengembangkan sistem backend untuk proyek Automated Forklift (AGV) menggunakan Django dan PostgreSQL.',
        'exp.inti.b2': 'Mengintegrasikan sistem computer vision menggunakan OpenCV dengan control system berbasis Django untuk memproses data navigasi Automated Forklift secara real-time.',
        'exp.inti.b3': 'Membangun dan mengoptimalkan API untuk integrasi real-time antara sensor, model AI, dan antarmuka kontrol.',
        'edu.title': 'D4 Teknik Informatika (Sarjana Terapan)',
        'edu.desc': 'IPK 3,94 / 4,00. Mata kuliah relevan: Algoritma, Struktur Data, Pengembangan Web, Sistem Basis Data, Machine Learning, Pengembangan Aplikasi Mobile.',
        'edu.t1': 'Algoritma',
        'edu.t2': 'Struktur Data',
        'edu.t3': 'Pengembangan Web',
        'edu.t4': 'Pengembangan Mobile',
        'edu.t5': 'Machine Learning',
        'contact.title': 'Mari Terhubung',
        'contact.subtitle': 'Mari bekerja sama!',
        'contact.infoTitle': 'Informasi Kontak',
        'contact.infoText': 'Saat ini saya terbuka untuk peluang baru dan proyek menarik. Silakan hubungi saya jika ingin berkolaborasi!',
        'contact.location': 'Lokasi',
        'contact.locationValue': 'Jawa Tengah, Indonesia',
        'contact.availability': 'Ketersediaan',
        'contact.availabilityValue': 'Terbuka untuk peluang',
        'form.name': 'Nama Lengkap *',
        'form.email': 'Alamat Email *',
        'form.subject': 'Subjek',
        'form.message': 'Pesan *',
        'form.send': 'Kirim Pesan',
        'form.note': 'Formulir ini membuka aplikasi email Anda; pesan tidak disimpan di situs ini.',
        'form.sending': 'Mengirim...',
        'form.success': 'Pesan berhasil terkirim! Saya akan segera membalas.',
        'form.required': 'Kolom ini wajib diisi',
        'form.emailInvalid': 'Masukkan alamat email yang valid',
        'form.nameInvalid': "Nama harus 2-50 karakter dan hanya berisi huruf, spasi, serta . ' -",
        'form.msgShort': 'Pesan minimal 10 karakter',
        'form.msgLong': 'Pesan harus kurang dari 1000 karakter',
        'form.fix': 'Perbaiki semua kesalahan sebelum mengirim.',
        'form.fail': 'Gagal mengirim pesan. Silakan coba lagi nanti.',
        'form.mailSubject': 'Kontak dari portofolio',
        'footer.rights': 'Hak cipta dilindungi.',
        'footer.credits': 'Dibangun dengan ❤️ menggunakan HTML, CSS, dan JavaScript murni',
        'footer.top': 'Kembali ke atas'
    }
};

let currentLang = (() => {
    try {
        const saved = localStorage.getItem('portfolio-lang');
        if (LANGS.includes(saved)) return saved;
    } catch (e) { /* storage tidak tersedia */ }
    return (navigator.language || '').toLowerCase().startsWith('id') ? 'id' : 'en';
})();

// Teks sesuai bahasa aktif; jatuh ke Inggris, lalu ke key itu sendiri
function t(key, vars = {}) {
    const text = (I18N[currentLang] && I18N[currentLang][key]) ?? I18N.en[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? vars[name] : m));
}

// Untuk field JSON dua bahasa: { "en": "...", "id": "..." } (string biasa dikembalikan apa adanya)
function pick(value) {
    return value && typeof value === 'object' ? (value[currentLang] ?? value.en) : value;
}

function applyI18n() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        el.dataset.i18nAttr.split(';').forEach(pair => {
            const [attr, key] = pair.split(':');
            el.setAttribute(attr.trim(), t(key.trim()));
        });
    });

    // Tombol menampilkan bahasa tujuan
    const toggle = document.querySelector('.lang-toggle');
    if (toggle) {
        toggle.textContent = LANGS.find(l => l !== currentLang).toUpperCase();
    }

    // CV mengikuti bahasa aktif
    const cvLink = document.querySelector('[data-cv]');
    if (cvLink) {
        cvLink.href = currentLang === 'id' ? cvLink.dataset.cvId : cvLink.dataset.cvEn;
    }
}

function setLang(lang) {
    if (!LANGS.includes(lang) || lang === currentLang) return;
    currentLang = lang;
    try {
        localStorage.setItem('portfolio-lang', lang);
    } catch (e) { /* storage tidak tersedia */ }
    applyI18n();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

document.addEventListener('DOMContentLoaded', () => {
    applyI18n();

    const toggle = document.querySelector('.lang-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            setLang(LANGS[(LANGS.indexOf(currentLang) + 1) % LANGS.length]);
        });
    }
});
