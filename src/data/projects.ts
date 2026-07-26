export interface CaseStudy {
    title: string;
    problem: string;
    solution: string;
    techStack: string[];
    category: string;
    role: string;
    year: string;
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
}
const base = import.meta.env.BASE_URL;
export const Projects: CaseStudy[] = [
    {
        title: "Platform Pre-Order & Sistem Manajemen Pesanan Kuliner (Team Project)",
        problem: "Usaha kuliner kelas membutuhkan sistem terpusat untuk menampilkan katalog produk yang siap beli (ready) dan sistem pre-order tanpa terjadi kesalahan pencatatan pesanan manual.",
        solution: "Membuat platform web full-stack dengan katalog produk interaktif untuk pembeli dan Admin Panel khusus bagi pengelola untuk memantau pesanan masuk serta memperbarui status pengiriman secara real-time.",
        techStack: ["Laravel", "Filament", "PHP", "MySQL", "JavaScript", "Bootstrap / Tailwind"],
        category: "FULL-STACK WEB",
        role: "Full-Stack Dev",
        year: "2025",
        image: `${base}images/projects/Main-Page-Web-Pemesanan.svg`,
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/website-pemesanan"
    },
    {
        title: "Arsitektur Offline-First & Sinkronisasi State Aplikasi Absensi Mobile",
        problem: "Aplikasi absensi sering mengalami kegagalan kirim data dan konflik state saat pegawai melakukan check-in di lokasi dengan koneksi internet yang tidak stabil.",
        solution: "Merancang mekanisme offline-first berbasis penyimpanan lokal SQLite dan antrean sekuensial yang otomatis melakukan sinkronisasi data ke server pusat ketika koneksi kembali terhubung.",
        techStack: ["Mobile Framework", "SQLite", "REST API", "Git"],
        category: "MOBILE APPLICATION",
        role: "Full-Stack Dev",
        year: "2025",
        image: "/images/projects/attendance-app.png",
        liveUrl: "",
        githubUrl: "https://github.com/yourusername/attendanceApp-mobile"
    },
    {
        title: "RESTful API & Engine Manajemen Terpusat (Rental Barang & Perpustakaan)",
        problem: "Kebutuhan pengelolaan inventaris barang sewa dan transaksi peminjaman buku perpustakaan yang memerlukan penanganan logika batas waktu, denda, dan validasi ketersediaan stok yang ketat.",
        solution: "Membangun arsitektur backend RESTful API yang menangani pemrosesan transaksi relasional, skema database terisolasi, dan validasi data secara efisien di sisi server.",
        techStack: ["Laravel", "PHP", "MySQL", "RESTful API", "Postman"],
        category: "BACKEND ARCHITECTURE",
        role: "Backend Eng",
        year: "2025",
        image: "/images/projects/rental-library-api.png",
        liveUrl: "",
        githubUrl: "https://github.com/yourusername/rental-library-api"
    },
    {
        title: "Integrasi API Third-Party pada Pembaca Komik Web & Mobile",
        problem: "Memuat dan menampilkan katalog komik dalam jumlah besar dapat menyebabkan konsumsi penyimpanan server membengkak jika data disimpan secara lokal.",
        solution: "Mengintegrasikan API publik/online secara dinamis untuk menarik metadata dan gambar komik secara real-time, dikombinasikan dengan teknik caching sementara untuk menghemat pemakaian bandwidth.",
        techStack: ["PHP / Laravel", "REST API Integration", "JSON Parser", "JavaScript"],
        category: "WEB DEVELOPMENT",
        role: "Full-Stack Dev",
        year: "2024",
        image: "/images/projects/comic-reader.png",
        liveUrl: "",
        githubUrl: "https://github.com/yourusername/comic-api-app"
    },
    {
        title: "Engine Logika Game & Manajemen Save-State Persisten",
        problem: "Membutuhkan struktur data dan algoritma yang stabil untuk memproses mekanika game real-time seperti perhitungan kalkulasi status karakter, sistem skor, dan penyimpanan progres permainan.",
        solution: "Merancang logika internal game menggunakan pendekatan Object-Oriented Programming (OOP) untuk menangani kalkulasi Health Points (HP), damage, dan sistem save-state file yang persisten.",
        techStack: ["Game Logic Engine", "Data Structures", "Algorithms", "OOP"],
        category: "GAME DEVELOPMENT",
        role: "Game Logic Dev",
        year: "2025",
        image: "/images/projects/game-logic.png",
        liveUrl: "",
        githubUrl: "https://github.com/yourusername/game-logic-portfolio"
    },
    {
        title: "Sistem Otomasi Screen-Interaction Berbasis Vision-Language Model Lokal",
        problem: "Skrip otomasi berbasis koordinat statis sering gagal ketika terdapat perubahan tata letak (layout) antarmuka aplikasi target atau perbedaan resolusi layar.",
        solution: "Mengintegrasikan AI Model visual (VLM) via LM Studio dengan skrip Python untuk mendeteksi elemen UI secara dinamis sebelum mengeksekusi aksi klik atau input teks.",
        techStack: ["Python", "Local AI / Gemma", "PyAutoGUI", "LM Studio"],
        category: "ARTIFICIAL INTELLIGENCE",
        role: "Automation Eng",
        year: "2025",
        image: "/images/projects/ai-automation.png",
        liveUrl: "",
        githubUrl: "https://github.com/yourusername/local-vlm-pyautogui"
    },
    {
        title: "Refactoring Arsitektur Database & Optimasi Eager Loading (Laravel)",
        problem: "Aplikasi monolith mengalami masalah *bottleneck* performa akibat query N+1 saat memuat relasi data yang kompleks pada dashboard admin.",
        solution: "Melakukan indeksasi skema database, memindahkan manajemen session ke tabel terpisah, dan mengimplementasikan Eager Loading yang berhasil mempercepat loading halaman secara signifikan.",
        techStack: ["PHP", "Laravel", "MySQL", "Query Optimization"],
        category: "BACKEND ARCHITECTURE",
        role: "Backend Eng",
        year: "2026",
        image: "/images/projects/laravel-portfolio.png",
        liveUrl: "",
        githubUrl: "https://github.com/yourusername/Portofolio-laravel"
    }
];