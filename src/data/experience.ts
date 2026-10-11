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
        role: "Game Developer",
        company: "Gamelab.ID / Educa Studio",
        location: "Remote / 6 Month",
        period: "Agustus 2025 - Januari 2026",
        description: "Merancang dan mengembangkan game edukasi interaktif berbasis Phaser.js dengan penanganan logika permainan yang kompleks.",
        achievements: [
            "Merancang dan mengembangkan 4 proyek game edukasi, termasuk Game Edukasi Menghitung Biji, Menyusun Boneka, Menghitung Bola Baseball, dan Aljabar.",
            "Meraih nominasi 'Game of the Week' untuk proyek Game Edukasi Menghitung Biji dan Game Edukasi Aljabar.",
            "Menyelesaikan program magang dengan predikat Sangat Baik (Nilai A, rata-rata 86.0)."
        ],
        techStack: ["Phaser.js", "JavaScript", "HTML"]
    },
    {
        role: "Fullstack Web Developer",
        company: "Freelance / Client Projects",
        location: "Remote",
        period: "Agustus 2024 - Januari 2026",
        description: "Merancang dan mengembangkan berbagai aplikasi web dengan fokus pada arsitektur backend, perancangan skema database mandiri, pembuatan REST API, dan penanganan logika bisnis kompleks.",
        achievements: [
            "Merancang skema database mandiri untuk berbagai sistem manajemen: absensi, rental barang (inventory), pre-order kuliner, dan manajemen catatan — termasuk relasi antar-tabel dan normalisasi.",
            "Membangun dan menstrukturisasi RESTful API sebagai jembatan komunikasi data yang aman dan efisien antara server dan sisi klien.",
            "Mengembangkan dashboard admin dengan panel pengelolaan real-time (monitoring pesanan, approval transaksi, tracking riwayat) untuk kebutuhan operasional klien.",
            "Memastikan fungsionalitas, optimasi performa, dan integritas data pada sisi backend dalam berbagai proyek dengan tenggat waktu yang ketat."
        ],
        techStack: ["Laravel", "PHP", "RESTful API", "MySQL", "Tailwind CSS"]
    },
];