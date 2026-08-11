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
        techStack: ["Laravel", "Filament", "PHP", "MySQL", "JavaScript", "Tailwind"],
        category: "FULL-STACK WEB",
        role: "Full-Stack Dev",
        year: "2025",
        image: `${base}/images/projects/Main-Page-Web-Pemesanan.svg`,
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/website-pemesanan"
    },
    {
        title: "School Management System API",
        problem: "Pengelolaan administrasi sekolah yang mencakup data akademik, presensi, perpustakaan, dan inventaris seringkali tidak terpusat, rentan terhadap inkonsistensi data, serta memiliki sistem manajemen hak akses (otorisasi) yang tidak terstruktur untuk berbagai entitas pengguna (Siswa, Guru, Admin).",
        solution: "Membangun layanan Backend REST API yang terpusat dan modular dengan menerapkan Role-Based Access Control (RBAC) yang granular. Sistem ini dilengkapi validasi data yang ketat (Zod), keamanan token (JWT), serta otomatisasi relasional seperti pembaruan stok inventaris dan perhitungan denda perpustakaan secara realtime.",
        techStack: ["Node.js",  "Express.js",  "TypeScript",  "Prisma ORM",  "PostgreSQL",  "JWT",  "Zod"],
        category: "Full-Stack Dev",
        role: "Fullstack Developer",
        year: "2026",
        image: `${base}/images/projects/School-Management.svg`,
        liveUrl: "", 
        githubUrl: "https://github.com/RizkyMaulana-Dev/school-dashboard-starter"
    },
    {
        title: "Equipment Rental & Inventory Management System",
        problem: "Pencatatan inventaris dan transaksi peminjaman barang yang manual seringkali memicu kehilangan data, sulitnya melacak status barang (dipinjam/dikembalikan), serta proses pembuatan laporan yang tidak efisien.",
        solution: "Membangun aplikasi web full-stack terintegrasi dengan pemisahan akses untuk Admin dan User. Sistem ini mengotomatisasi alur pengajuan peminjaman, persetujuan (approval) transaksi, pelacakan riwayat secara real-time, dan fitur ekspor data transaksi ke format Excel untuk kebutuhan pelaporan.",
        techStack: ["Laravel 12",  "PHP",  "JavaScript",  "MySQL"],
        category: "FULL-STACK WEB DEVELOPMENT",
        role: "Full-Stack Developer",
        year: "2025",
        image: `${base}/images/projects/Rental-Barang.svg`,
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/rental-barang"
    },
    {
        title: "Web-Based Note Management App",
        problem: "Diperlukannya sebuah platform digital yang ringan dan responsif untuk menyimpan dan mengelola catatan harian secara terstruktur, guna menggantikan pencatatan manual yang datanya rentan hilang atau sulit dicari.",
        solution: "Merancang alur sistem (flowchart) dan membangun arsitektur Backend menggunakan PHP Native dan database MySQL untuk persistensi data catatan. Aplikasi ini juga diintegrasikan dengan antarmuka responsif berbasis Tailwind CSS agar dapat diakses dengan baik di berbagai perangkat.",
        techStack: [
            "PHP", 
            "MySQL", 
            "Tailwind CSS", 
            "Node.js (npm)"
        ],
        category: "WEB DEVELOPMENT",
        role: "Backend Developer & System Analyst",
        year: "2024",
        image: `${base}/images/projects/Scribble-Notes.svg`,
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/note-app-bootstrap"
    },
    {
        title: "Authentic Dimsum E-Commerce App",
        problem: "Kebutuhan akan platform pemesanan makanan online yang tidak hanya fungsional, tetapi juga mampu menyajikan visual produk yang menarik (appetizing) dengan pengalaman pengelolaan keranjang belanja yang interaktif dan mudah digunakan oleh pelanggan.",
        solution: "Membangun aplikasi web e-commerce full-stack dengan antarmuka UI/UX yang bersih dan responsif menggunakan Tailwind CSS. Sistem ini dilengkapi autentikasi pengguna, manajemen menu interaktif (rating, stok, counter pesanan), serta keranjang belanja dinamis dengan fitur selective checkout yang diintegrasikan menggunakan backend PHP Native dan MySQL.",
        techStack: [
            "PHP", 
            "MySQL", 
            "Tailwind CSS", 
            "JavaScript"
        ],
        category: "FULL-STACK WEB DEVELOPMENT",
        role: "Full-Stack Developer",
        year: "2025",
        image: `${base}/images/projects/Landing-Page-Dimsum.svg`,
        liveUrl: "", 
        githubUrl: "https://github.com/RizkyMaulana-Dev/CodeX_Bites"
    }
];