export interface CaseStudy {
    title: string;
    slug: string;
    description?: string;
    problem: string;
    solution: string;
    techStack: string[];
    category: string;
    role: string;
    year: string;
    images?: string[];
    image?: string; // Legacy: single image for backward compatibility
    videos?: string[]; // Preview videos (mp4/webm), rendered as gallery slides + card hover
    liveUrl?: string;
    githubUrl?: string;
    status?: "completed" | "in-progress" | "planned";
    duration?: string;
    features?: string[];
    challenges?: string[];
    approach?: string[];
    results?: string[];
}
const base = import.meta.env.BASE_URL;
export const Projects: CaseStudy[] = [
    {
        title: "School Management System API",
        slug: "school-management-system",
        description: "Centralized REST API service for school administration with granular role-based access control and realtime relational automation.",
        problem: "Pengelolaan administrasi sekolah yang mencakup data akademik, presensi, perpustakaan, dan inventaris seringkali tidak terpusat, rentan terhadap inkonsistensi data, serta memiliki sistem manajemen hak akses (otorisasi) yang tidak terstruktur untuk berbagai entitas pengguna (Siswa, Guru, Admin).",
        solution: "Membangun layanan Backend REST API yang terpusat dan modular dengan menerapkan Role-Based Access Control (RBAC) yang granular. Sistem ini dilengkapi validasi data yang ketat (Zod), keamanan token (JWT), serta otomatisasi relasional seperti pembaruan stok inventaris dan perhitungan denda perpustakaan secara realtime.",
        techStack: ["Node.js", "Express.js", "TypeScript", "Prisma ORM", "PostgreSQL", "JWT", "Zod"],
        category: "Web",
        role: "Fullstack Developer",
        year: "2026",
        images: [
            `${base}/images/project/school-management-system/01-admin-manajemen-buku.png`,
            `${base}/images/project/school-management-system/02-presensi-siswa.png`,
            `${base}/images/project/school-management-system/03-rekap-kehadiran.png`,
            `${base}/images/project/school-management-system/04-kelola-siswa.png`,
            `${base}/images/project/school-management-system/05-kelola-guru.png`,
            `${base}/images/project/school-management-system/06-perpustakaan.png`,
            `${base}/images/project/school-management-system/07-inventaris.png`,
            `${base}/images/project/school-management-system/08-portal-siswa.png`,
        ],
        liveUrl: "https://rizkymaulana-dev.github.io/school-dashboard-starter/",
        githubUrl: "https://github.com/RizkyMaulana-Dev/school-dashboard-starter",
        status: "completed",
        features: [
            "Role-Based Access Control (RBAC) granular untuk Siswa, Guru, dan Admin",
            "Validasi data ketat dengan Zod di setiap endpoint",
            "Keamanan token berbasis JWT",
            "Otomatisasi relasional: pembaruan stok inventaris realtime",
            "Perhitungan denda perpustakaan secara realtime",
        ],
        approach: [
            "Arsitektur REST API terpusat dan modular",
            "Pemisahan otorisasi per entitas pengguna",
            "Relasional automation untuk stok & denda",
        ],
    },
    {
        title: "Platform Pre-Order & Sistem Manajemen Pesanan Kuliner (Team Project)",
        slug: "web-preorder-system",
        description: "Full-stack food-ordering platform with an interactive product catalog for buyers and a dedicated admin panel for real-time delivery tracking.",
        problem: "Usaha kuliner kelas membutuhkan sistem terpusat untuk menampilkan katalog produk yang siap beli (ready) dan sistem pre-order tanpa terjadi kesalahan pencatatan pesanan manual.",
        solution: "Membuat platform web full-stack dengan katalog produk interaktif untuk pembeli dan Admin Panel khusus bagi pengelola untuk memantau pesanan masuk serta memperbarui status pengiriman secara real-time.",
        techStack: ["Laravel", "Filament", "PHP", "MySQL", "JavaScript", "Tailwind"],
        category: "Web",
        role: "Fullstack Developer",
        year: "2025",
        images: [
            `${base}/images/project/web-preorder-system/01-admin-orders.png`,
            `${base}/images/project/web-preorder-system/02-admin-dashboard.png`,
            `${base}/images/project/web-preorder-system/03-admin-products.png`,
            `${base}/images/project/web-preorder-system/04-admin-users.png`,
            `${base}/images/project/web-preorder-system/05-admin-waktu-pos.png`,
            `${base}/images/project/web-preorder-system/06-admin-income.png`,
            `${base}/images/project/web-preorder-system/07-mobile-invoice.png`,
            `${base}/images/project/web-preorder-system/08-mobile-menu.png`,
            `${base}/images/project/web-preorder-system/09-mobile-hero.png`,
            `${base}/images/project/web-preorder-system/10-mobile-keranjang.png`,
            `${base}/images/project/web-preorder-system/11-mobile-checkout.png`,
            `${base}/images/project/web-preorder-system/12-mobile-order.png`,
        ],
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/website-pemesanan",
        status: "completed",
        features: [
            "Katalog produk interaktif untuk pembeli",
            "Sistem pre-order terpusat",
            "Admin Panel untuk memantau pesanan masuk",
            "Pembaruan status pengiriman real-time",
        ],
        approach: [
            "Pemisahan peran pembeli vs pengelola",
            "Admin panel berbasis Filament untuk alur pesanan",
        ],
    },
    {
        title: "Equipment Rental & Inventory Management System",
        slug: "equipment-rental-system",
        description: "Integrated full-stack web app automating equipment rental workflows from request, approval, to real-time tracking and Excel reporting.",
        problem: "Pencatatan inventaris dan transaksi peminjaman barang yang manual seringkali memicu kehilangan data, sulitnya melacak status barang (dipinjam/dikembalikan), serta proses pembuatan laporan yang tidak efisien.",
        solution: "Membangun aplikasi web full-stack terintegrasi dengan pemisahan akses untuk Admin dan User. Sistem ini mengotomatisasi alur pengajuan peminjaman, persetujuan (approval) transaksi, pelacakan riwayat secara real-time, dan fitur ekspor data transaksi ke format Excel untuk kebutuhan pelaporan.",
        techStack: ["Laravel 12", "PHP", "JavaScript", "MySQL"],
        category: "Web",
        role: "Fullstack Developer",
        year: "2025",
        images: [
            `${base}/images/project/equipment-rental-system/01-main-user.png`,
            `${base}/images/project/equipment-rental-system/02-dashboard-item.png`,
            `${base}/images/project/equipment-rental-system/03-dashboard-transaction.png`,
            `${base}/images/project/equipment-rental-system/04-dashboard-user.png`,
            `${base}/images/project/equipment-rental-system/05-export-excel.png`,
            `${base}/images/project/equipment-rental-system/06-apply-loan.png`,
        ],
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/rental-barang",
        status: "completed",
        features: [
            "Alur pengajuan peminjaman otomatis",
            "Approval transaksi oleh Admin",
            "Pelacakan riwayat real-time",
            "Ekspor data transaksi ke Excel",
        ],
        approach: [
            "Pemisahan akses Admin vs User",
            "Otomatisasi alur peminjaman hingga pelaporan",
        ],
    },
    {
        title: "Web-Based Note Management App",
        slug: "note-management-app",
        description: "Lightweight, responsive web app for structured daily note-taking with a PHP native backend and MySQL persistence.",
        problem: "Diperlukannya sebuah platform digital yang ringan dan responsif untuk menyimpan dan mengelola catatan harian secara terstruktur, guna menggantikan pencatatan manual yang datanya rentan hilang atau sulit dicari.",
        solution: "Merancang alur sistem (flowchart) dan membangun arsitektur Backend menggunakan PHP Native dan database MySQL untuk persistensi data catatan. Aplikasi ini juga diintegrasikan dengan antarmuka responsif berbasis Tailwind CSS agar dapat diakses dengan baik di berbagai perangkat.",
        techStack: [
            "PHP",
            "MySQL",
            "Tailwind CSS",
            "Node.js (npm)"
        ],
        category: "Web",
        role: "Backend Developer & System Analyst",
        year: "2024",
        images: [
            `${base}/images/project/note-management-app/01-main.png`,
            `${base}/images/project/note-management-app/02-note-detail.png`,
            `${base}/images/project/note-management-app/03-note-management.png`,
            `${base}/images/project/note-management-app/04-add-note.png`,
            `${base}/images/project/note-management-app/05-footer.png`,
        ],
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/note-app-bootstrap",
        status: "completed",
        features: [
            "Penyimpanan catatan harian terstruktur",
            "Alur sistem dirancang dari flowchart",
            "Antarmuka responsif berbasis Tailwind",
            "Persistensi data via PHP Native + MySQL",
        ],
    },
    {
        title: "Authentic Dimsum E-Commerce App",
        slug: "authentic-dimsum",
        description: "Full-stack e-commerce food ordering app with interactive menu management and a dynamic selective-checkout cart.",
        problem: "Kebutuhan akan platform pemesanan makanan online yang tidak hanya fungsional, tetapi juga mampu menyajikan visual produk yang menarik (appetizing) dengan pengalaman pengelolaan keranjang belanja yang interaktif dan mudah digunakan oleh pelanggan.",
        solution: "Membangun aplikasi web e-commerce full-stack dengan antarmuka UI/UX yang bersih dan responsif menggunakan Tailwind CSS. Sistem ini dilengkapi autentikasi pengguna, manajemen menu interaktif (rating, stok, counter pesanan), serta keranjang belanja dinamis dengan fitur selective checkout yang diintegrasikan menggunakan backend PHP Native dan MySQL.",
        techStack: [
            "PHP",
            "MySQL",
            "Tailwind CSS",
            "JavaScript"
        ],
        category: "Web",
        role: "Fullstack Developer",
        year: "2025",
        images: [
            `${base}/images/project/authentic-dimsum/01-hero.png`,
            `${base}/images/project/authentic-dimsum/02-why-choose.png`,
            `${base}/images/project/authentic-dimsum/03-testimoni.png`,
            `${base}/images/project/authentic-dimsum/04-menu.png`,
            `${base}/images/project/authentic-dimsum/05-keranjang.png`,
        ],
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/CodeX_Bites",
        status: "completed",
        features: [
            "Autentikasi pengguna",
            "Manajemen menu interaktif: rating, stok, counter pesanan",
            "Keranjang belanja dinamis dengan selective checkout",
            "UI/UX bersih & responsif berbasis Tailwind",
        ],
    },
    {
        title: "OpenProgress — Transparent Project Tracking untuk Freelancer",
        slug: "openprogress",
        description: "Freelancer project-tracking platform with public status lookup, service price list, and a booking calendar, backed by an admin panel for projects, pricing, and testimonial moderation.",
        problem: "Freelancer sering kewalahan answering clients yang menanyakan \"proyeknya sampai mana?\", sehingga harus melaporkan progress secara manual melalui chat. Klien tidak memiliki satu tempat yang transparan untuk melihat status, harga layanan, dan jadwal ketersediaan, sementara sisi freelancer tidak punya alat terpusat untuk mengelola proyek, paket harga, dan testimoni.",
        solution: "Membangun platform Next.js dengan dua sisi: halaman publik yang menampilkan daftar layanan beserta rentang harga, kalender ketersediaan slot yang memvalidasi bentrok tanggal, serta fitur Cek Status Project berdasarkan kode proyek (PRJ-YYYY-XXXX). Sisi admin memakai Supabase dengan Row Level Security dan peran admin/super_admin untuk mengelola proyek, tugas, paket harga, serta moderasi testimoni. Status deployment disinkronkan otomatis dari GitHub lewat Octokit.",
        techStack: [
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Supabase",
            "Tailwind CSS 4",
            "Base UI",
            "React Hook Form",
            "Zod",
        ],
        category: "Web",
        role: "Fullstack Developer",
        year: "2026",
        videos: [
            `${base}/images/project/openprogress/preview-landing.mp4`,
            `${base}/images/project/openprogress/preview-full.mp4`,
        ],
        liveUrl: "https://openprogress.vercel.app",
        githubUrl: "https://github.com/RizkyMaulana-Dev/OpenProgress",
        status: "in-progress",
        features: [
            "Cek Status Project berdasarkan kode unik (PRJ-YYYY-XXXX)",
            "Sinkronisasi status deployment otomatis dari GitHub via Octokit",
            "Kalender ketersediaan slot dengan validasi rentang tanggal yang sudah diblokir",
            "Manajemen paket harga (rentang harga, durasi, kategori, fitur)",
            "Antrean moderasi testimoni dengan aksi sembunyikan per item",
            "Otorisasi berbasis peran admin & super_admin melalui Row Level Security",
        ],
        challenges: [
            "Memastikan tidak ada bentrok jadwal saat klien memilih slot booking",
            "Menjaga sinkronisasi GitHub tetap ringan tanpa membebani rate limit API",
        ],
        approach: [
            "Pemisahan tegas antara halaman publik dan dashboard admin",
            "Validasi bentrok tanggal di sisi server, bukan hanya di antarmuka",
            "RLS Supabase sebagai lapisan otorisasi kedua di samping pemeriksaan peran",
        ],
    },
    {
        title: "Peyysupply — Streetwear & Thrift Store",
        slug: "peyysupply",
        description: "Full-stack streetwear and thrift storefront with multi-facet catalog filtering, a New Drop showcase, and a product-management admin panel.",
        problem: "Penjual streetwear dan thrift lokal umumnya mengandalkan Instagram dan WhatsApp untuk berjualan, sehingga pembeli tidak punya cara terstruktur untuk menelusuri barang berdasarkan brand, kategori, atau ukuran. Stok, varian, dan harga pun ikut dikelola manual sehingga rawan tidak sinkron dengan produk yang sudah terjual.",
        solution: "Membangun storefront Next.js dengan katalog yang mendukung filter multi-facet (brand, kategori, ukuran), section New Drop, serta carousel testimoni. Data produk, kategori, dan pengguna disimpan lewat Prisma ORM dengan autentikasi JWT dan refresh token. Panel admin terpisah mengelola siklus hidup produk, sementara Zustand menangani state katalog dan sesi di sisi klien.",
        techStack: [
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Prisma ORM",
            "MariaDB",
            "Tailwind CSS 4",
            "Zustand",
            "Zod",
        ],
        category: "Web",
        role: "Fullstack Developer",
        year: "2026",
        videos: [
            `${base}/images/project/peyysupply/preview.mp4`,
        ],
        liveUrl: "https://peyysupply.vercel.app",
        githubUrl: "https://github.com/RizkyMaulana-Dev/peyysupply",
        status: "completed",
        features: [
            "Filter katalog multi-facet: brand, kategori, dan ukuran",
            "Section New Drop untuk showcase produk terbaru",
            "Carousel testimoni pelanggan",
            "Panel admin untuk mengelola produk",
            "Autentikasi JWT dengan refresh token",
            "Optimasi media gambar melalui ImageKit",
        ],
        approach: [
            "Struktur berbasis fitur (features/product) agar state katalog terpisah dari auth",
            "Pemisahan route admin dari storefront publik",
            "Validasi input konsisten melalui Zod di sisi server",
        ],
    }
];
