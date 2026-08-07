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
        year: "2024",
        image: `${base}images/projects/Main-Page-Web-Pemesanan.svg`,
        liveUrl: "",
        githubUrl: "https://github.com/RizkyMaulana-Dev/website-pemesanan"
    },
    {
        title: "Multi-Module Operations & Management Suite",
        problem: "Aplikasi operasional internal (absensi, inventaris, tiket, & event) sering mengalami masalah data usang (stale data) pada antarmuka, yang mengharuskan pengguna melakukan refresh manual setiap kali terjadi penambahan atau pembaruan data.",
        solution: "Merancang arsitektur aplikasi modular dengan sinkronisasi state reaktif (React Hooks & Lifecycle Management) untuk menjamin pembaruan data secara otomatis (auto re-render) secara realtime setelah operasi mutasi data berhasil.",
        techStack: ["React Native", "JavaScript", "REST API", "State Management", "Git"],
        category: "MOBILE APPLICATION",
        role: "Full-Stack Developer",
        year: "2025",
        image: "/images/projects/multi-app-suite.png",
        liveUrl: "",
        githubUrl: ""
    },
    {
        title: "RESTful API & Engine Manajemen Terpusat (Rental Barang & Perpustakaan)",
        problem: "Kebutuhan pengelolaan inventaris barang sewa dan transaksi peminjaman buku yang memerlukan kalkulasi otomatis batas waktu, penalti denda, serta validasi stok ketat dalam lingkungan relasional.",
        solution: "Membangun RESTful API berbasis Laravel dengan alur transaksi berprinsip ACID, serta mengintegrasikan pipeline CI/CD untuk otomatisasi pengujian dan deployment terpusat ke server hosting.",
        techStack: ["Laravel", "MySQL", "RESTful API"],
        category: "BACKEND ARCHITECTURE",
        role: "Backend Engineer",
        year: "2025",
        image: "/images/projects/rental-library-api.png",
        liveUrl: "",
        githubUrl: ""
    }
];