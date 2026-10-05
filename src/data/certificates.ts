export interface Certificate {
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    credentialUrl?: string;
    image?: string;
    category: string;
}

const base = import.meta.env.BASE_URL;

export const Certificates: Certificate[] = [
    {
        title: "Sertifikat Magang Game Developer",
        issuer: "Gamelab.ID / Educa Studio",
        date: "Januari 2026",
        credentialId: "GL-XXXX-XXXX",
        credentialUrl: "#",
        image: `${base}/images/certificates/gamelab-internship.svg`,
        category: "Internship",
    },
    {
        title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
        issuer: "Dicoding Indonesia",
        date: "2025",
        credentialId: "DIC-XXXX-XXXX",
        credentialUrl: "#",
        image: `${base}/images/certificates/dicoding-backend.svg`,
        category: "Backend",
    },
    {
        title: "Belajar Dasar Pemrograman Web",
        issuer: "Dicoding Indonesia",
        date: "2025",
        credentialId: "DIC-XXXX-XXXX",
        credentialUrl: "#",
        image: `${base}/images/certificates/dicoding-web.svg`,
        category: "Web",
    },
    {
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        date: "2025",
        credentialId: "FCC-XXXX-XXXX",
        credentialUrl: "#",
        image: `${base}/images/certificates/freecodecamp-js.svg`,
        category: "Frontend",
    },
    {
        title: "Responsive Web Design Certification",
        issuer: "freeCodeCamp",
        date: "2024",
        credentialId: "FCC-XXXX-XXXX",
        credentialUrl: "#",
        image: `${base}/images/certificates/freecodecamp-rwd.svg`,
        category: "Frontend",
    },
    {
        title: "Database Design & SQL Fundamentals",
        issuer: "Coursera / Google",
        date: "2025",
        credentialId: "CRS-XXXX-XXXX",
        credentialUrl: "#",
        image: `${base}/images/certificates/coursera-sql.svg`,
        category: "Backend",
    },
];
