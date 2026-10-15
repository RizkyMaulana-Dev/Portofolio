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
        image: `${base}/images/projects/School-Management.svg`,
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
        image: `${base}/images/projects/Main-Page-Web-Pemesanan.svg`,
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
        image: `${base}/images/projects/Rental-Barang.svg`,
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
        image: `${base}/images/projects/Scribble-Notes.svg`,
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
        title: "NITRO STATION — Gaming Station Booking Website",
        slug: "nitro-station",
        description: "Multi-page landing + booking site for a premium gaming-station brand, built pixel-faithful from Figma designs with a fully responsive layout and interactive booking flow.",
        problem: "Brand gaming station premium membutuhkan website yang mampu menampilkan paket gaming (Core Squad, Nitro Elite, Family Plan), memfasilitasi registrasi member, dan proses reservasi unit secara online — dengan tampilan yang konsisten mengikuti desain Figma di semua ukuran layar, termasuk mobile.",
        solution: "Membangun website statis multi-halaman (landing, register/login, unit reservation) yang mereplikasi desain Figma secara akurat: hero dengan ilustrasi isometric gaming setup, pricing tier dengan highlight Nitro Elite, testimoni, serta form reservasi interaktif dengan pemilihan paket, slider durasi, dan kuitansi akses yang menghitung total secara real-time. Seluruhnya responsif dari 320px hingga desktop tanpa horizontal scroll.",
        techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Vercel"],
        category: "Web",
        role: "Frontend Developer",
        year: "2026",
        image: `${base}/images/projects/nitro-station.png`,
        liveUrl: "https://nitro-station-self.vercel.app",
        githubUrl: "",
        status: "completed",
        features: [
            "Landing page lengkap: hero, partner logos, features, pricing, testimoni, footer",
            "Halaman register/login split-screen dengan hexagon branding",
            "Halaman unit reservation dengan form, pemilihan paket, dan slider durasi",
            "Kuitansi akses real-time: total & jam main dihitung ulang saat paket/slider berubah",
            "Responsif 320px–2560px, hamburger menu di mobile",
        ],
        approach: [
            "Rekreasi pixel-accurate dari desain Figma",
            "Mobile-first CSS dengan breakpoint 480/768/1024/1280",
            "Zero dependency, static site, deploy langsung ke Vercel",
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
        image: `${base}/images/projects/Landing-Page-Dimsum.svg`,
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/CodeX_Bites",
        status: "completed",
        features: [
            "Autentikasi pengguna",
            "Manajemen menu interaktif: rating, stok, counter pesanan",
            "Keranjang belanja dinamis dengan selective checkout",
            "UI/UX bersih & responsif berbasis Tailwind",
        ],
    }
];
