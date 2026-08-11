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
        location: "Remote",
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
        role: "Fullstack Web dan Mobile Developer",
        company: "Freelance",
        location: "Remote/Onsite",
        period: "Agustus 2024 - Januari 2025",
        description: "Merancang dan mengembangkan berbagai aplikasi web dan mobile dengan fokus utama pada arsitektur backend, pembuatan API, dan penanganan logika bisnis yang kompleks.",
        achievements: [
            "Membangun dan menstrukturisasi database untuk berbagai sistem manajemen, termasuk aplikasi absensi, manajemen film, manajemen komik, rental barang, dan perpustakaan.",
            "Merancang RESTful API mandiri (lokal) sebagai jembatan komunikasi data yang aman dan efisien antara server dan sisi klien (client-side).",
            "Memastikan fungsionalitas, optimasi performa, dan integritas data pada sisi backend dalam berbagai proyek dengan tenggat waktu yang ketat."
        ],
        techStack: ["Laravel", "PHP", "RESTful API", "MySQL"]
    },
];