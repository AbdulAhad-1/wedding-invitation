const WEDDING_DETAILS = {
  "abdul-ahad": {
    groom: {
      name: "Abdul Ahad",
      longName: "Abdul Ahad",
      fatherName: "Ashraf Ali",
      order: "1st Son",
      image: "https://picsum.photos/500/500?random=1",
    },
    bride: {
      name: "Zara",
      longName: "Zara Binte Mukhtar Ahmad",
      fatherName: "Mukhtar Ahmad",
      order: "2nd Daughter",
      image: "https://picsum.photos/500/500?random=1",
    },
    events: [
      {
        name: "Mehndi",
        startDate: new Date("2026-10-31T18:00:00"),
        endDate: new Date("2026-10-31T22:00:00"),
        formatedDate: "Saturday, October 31, 2026",
        location: "",
        image: "https://picsum.photos/1000/1000?random=7",
      },
      {
        name: "Barat",
        startDate: new Date("2026-11-01T18:00:00"),
        endDate: new Date("2026-11-01T22:00:00"),
        formatedDate: "Sunday, November 01, 2026",
        location: "",
        image: "https://picsum.photos/1000/1000?random=8",
      },
      {
        name: "Walima",
        startDate: new Date("2026-11-03T18:00:00"),
        endDate: new Date("2026-11-03T22:00:00"),
        formatedDate: "Tuesday, November 03, 2026",
        location: "",
        image: "https://picsum.photos/1000/1000?random=9",
      },
    ],
  },
  subhan: {
    groom: {
      name: "Subhan",
      longName: "Subhan Ashraf",
      fatherName: "Ashraf Ali",
      order: "2nd Son",
      image: "https://picsum.photos/500/500?random=2",
    },
    bride: {
      name: "Syeda Areesha",
      longName: "Areesha Binte Abid Ali",
      fatherName: "Syed Abid Ali",
      order: "2nd Daughter",
      image: "https://picsum.photos/500/500?random=2",
    },
    events: [
      {
        name: "Mehndi",
        startDate: new Date("2026-10-31T18:00:00"),
        endDate: new Date("2026-10-31T22:00:00"),
        formatedDate: "Saturday, October 31, 2026",
        location: "",
        image: "https://picsum.photos/1000/1000?random=7",
      },
      {
        name: "Barat",
        startDate: new Date("2026-11-02T18:00:00"),
        endDate: new Date("2026-11-02T22:00:00"),
        formatedDate: "Monday, November 02, 2026",
        location: "",
        image: "https://picsum.photos/1000/1000?random=8",
      },
      {
        name: "Walima",
        startDate: new Date("2026-11-03T18:00:00"),
        endDate: new Date("2026-11-03T22:00:00"),
        formatedDate: "Tuesday, November 03, 2026",
        location: "",
        image: "https://picsum.photos/1000/1000?random=9",
      },
    ],
  },
};

const GALLERY = [
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

const LOVE_STORY = [
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

const COMMENTS_DATA = [
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

export const data = {
  audio: "/musics/pure-love-304010.mp3",
  weddingDate: new Date("2026-10-31T18:00:00"),
  heroImage: "https://picsum.photos/600/600?random=12",
  weddingDetails: WEDDING_DETAILS,
  gallery: GALLERY,
  loveStory: LOVE_STORY,
  comments: COMMENTS_DATA,
};
