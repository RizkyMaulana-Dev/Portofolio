export interface Experience {
    role: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    techStack: string[];
}

export const Experiences: Experience[] = [
    {
        role: "Backend / Full-Stack Developer",
        company: "Freelance",
        location: "Remote",
        period: "Agustus 2024 - Januari 2026",
        description: "Merancang dan mengembangkan berbagai aplikasi web serta mobile dengan fokus utama pada arsitektur backend, pembuatan API, dan penanganan logika bisnis yang kompleks.",
        achievements: [
            "Membangun dan menstrukturisasi database untuk berbagai sistem manajemen, termasuk aplikasi absensi mobile, platform rental barang, dan sistem peminjaman buku perpustakaan.",
            "Merancang RESTful API mandiri (lokal dan online) sebagai jembatan komunikasi data yang aman dan efisien antara server dan *client-side*.",
            "Mengintegrasikan API pihak ketiga secara dinamis pada aplikasi komik untuk menarik dan menampilkan data buku secara *real-time* tanpa membebani *storage* lokal.",
            "Memprioritaskan fungsionalitas, performa, dan integritas data pada sisi backend di berbagai proyek yang memiliki tenggat waktu ketat."
        ],
        techStack: ["Laravel", "PHP", "RESTful API", "MySQL/SQLite", "Git", "Postman"]
    },
];