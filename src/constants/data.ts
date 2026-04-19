export const WEDDING_DATE = new Date("2026-10-31T18:00:00");

export const GROOM_IMG = "https://picsum.photos/400/400?random=10";
export const BRIDE_IMG = "https://picsum.photos/400/400?random=11";
export const HERO_IMG = "https://picsum.photos/600/600?random=12";

// Personal Details
export const PERSONAL_DETAILS = {
  "abdul-ahad": {
    groom: {
      name: "Abdul Ahad",
      longName: "Abdul Ahad",
      fatherName: "Ashraf Ali",
      order: "1st Son",
    },
    bride: {
      name: "Zara",
      longName: "Zara Binte Mukhtar",
      fatherName: "Mukhtar Ahmad",
      order: "2nd Daughter",
    },
  },
  subhan: {
    groom: {
      name: "Subhan",
      longName: "Subhan Ashraf",
      fatherName: "Ashraf Ali",
      order: "2nd Son",
    },
    bride: {
      name: "Areesha",
      longName: "Areesha Binte Abid",
      fatherName: "Abid Ali",
      order: "2nd Daughter",
    },
  },
};

// ── Google Calendar ────────────────────────────────────────
export const CALENDAR_EVENT = {
  title: "The Wedding of Wahyu & Riski",
  description: "Wedding reception of Wahyu and Riski. You are cordially invited!",
  location: "207, Block 15-B1 Township, Lahore",
  startDateTime: new Date("2026-10-31T18:00:00").toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
  endDateTime: new Date("2026-10-31T21:00:00").toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
  timezone: "Asia/Karachi",
};

export const GALLERY = [
  [
    "https://picsum.photos/1280/720?random=1",
    "https://picsum.photos/1280/720?random=2",
    "https://picsum.photos/1280/720?random=3",
  ],
  [
    "https://picsum.photos/1280/720?random=4",
    "https://picsum.photos/1280/720?random=5",
    "https://picsum.photos/1280/720?random=6",
  ],
];
export const DESKTOP_IMGS_V2 = [
  {
    name: "Mehndi Ceremony",
    date: "Saturday, October 31, 2026",
    image: "https://picsum.photos/1000/1000?random=7",
  },
  {
    name: "Barat & Nikah",
    date: "Monday, November 01, 2026",
    image: "https://picsum.photos/1000/1000?random=8",
  },
  {
    name: "Walima",
    date: "Tuesday, November 03, 2026",
    image: "https://picsum.photos/1000/1000?random=9",
  },
];
export const DESKTOP_IMGS = [
  "https://picsum.photos/1000/1000?random=7",
  "https://picsum.photos/1000/1000?random=8",
  "https://picsum.photos/1000/1000?random=9",
];

export const LOVE_STORY = [
  {
    icon: "💼",
    title: "Awal Pertemuan Sederhana",
    text: "Pada Januari 2025, Wahyu, seorang desainer grafis berusia 28 tahun, bertemu Riski, copywriter yang dikenal cerdas dan pendiam, dalam proyek branding perusahaan. Interaksi mereka di ruang rapat terbatas pada urusan kerja, penuh adab dan profesional.",
  },
  {
    icon: "💞",
    title: "Benih Cinta dalam Ujian",
    text: "Memasuki Februari 2025, proyek mereka menghadapi krisis. Di tengah tekanan, Riski tampil dengan solusi kreatif yang menyelamatkan proyek, membuat Wahyu terkesan dengan ketenangan dan kecerdasannya.",
  },
  {
    icon: "💍",
    title: "Langkah Menuju Ridha Allah",
    text: "Proses taaruf berjalan penuh keikhlasan. Wahyu dan Riski saling terbuka tentang impian membangun keluarga yang diridhai Allah. Pada Maret 2025, setelah istikharah dan mendapat restu keluarga, Wahyu melamar Riski.",
  },
];

export const COMMENTS_DATA = [
  {
    name: "Fajar",
    presence: 1,
    time: "5 min ago",
    msg: "Selamat ya kak! Semoga menjadi keluarga yang sakinah mawaddah warahmah 🤍",
    likes: 4,
  },
  { name: "Bagas W", presence: 1, time: "10 min ago", msg: "Alhamdulillah, barakallahu lakuma 💕", likes: 2 },
  {
    name: "Sindy Wulan",
    presence: 2,
    time: "1 hrs ago",
    msg: "Selamat menempuh hidup baru, semoga langgeng!",
    likes: 7,
  },
  {
    name: "Tomas Iskandar",
    presence: 1,
    time: "1 hrs ago",
    msg: "Wihh akhirnya jadian juga, selamat kakk ✨",
    likes: 3,
  },
];

export const AUDIO_SRC = "/musics/pure-love-304010.mp3";
