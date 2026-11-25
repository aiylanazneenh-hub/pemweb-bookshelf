export const categories = [
  {
    id: 1,
    nama_kategori: "Thriller & Aksi",
  },
  {
    id: 2,
    nama_kategori: "Romansa & Drama Keluarga",
  },
  {
    id: 3,
    nama_kategori: "Biografi & Catatan Tokoh",
  },
  {
    id: 4,
    nama_kategori: "Sosiologi & Kesejahteraan Sosial",
  },
  {
    id: 5,
    nama_kategori: "Politik & Kewarganegaraan",
  },
  {
    id: 6,
    nama_kategori: "Persiapan Ujian Masuk",
  },
  {
    id: 7,
    nama_kategori: "Riset & Statistik",
  },
  {
    id: 8,
    nama_kategori: "Bimbingan & Konseling",
  },
  {
    id: 9,
    nama_kategori: "Kimia & Sains",
  },
  {
    id: 10,
    nama_kategori: "Bahasa Inggris",
  },
  {
    id: 11,
    nama_kategori: "Sistem Informasi",
  },
  {
    id: 12,
    nama_kategori: "Microsoft Office",
  },
  {
    id: 13,
    nama_kategori: "Linux & Sistem Operasi",
  },
  {
    id: 14,
    nama_kategori: "Ekonomi Islam",
  },
  {
    id: 15,
    nama_kategori: "Akuntansi & Keuangan",
  },
  {
    id: 16,
    nama_kategori: "Hukum & Kontrak",
  },
  {
    id: 17,
    nama_kategori: "Manajemen & Administrasi",
  },
  {
    id: 18,
    nama_kategori: "Olahraga",
  },
  {
    id: 19,
    nama_kategori: "Komik Anak & Humor",
  },
  {
    id: 20,
    nama_kategori: "Manga Aksi & Remaja",
  },
  {
    id: 21,
    nama_kategori: "Komik Detektif",
  },
  {
    id: 22,
    nama_kategori: "Komik Silat",
  },
  {
    id: 23,
    nama_kategori: "Komik Fantasi Laga",
  },
  {
    id: 24,
    nama_kategori: "Renungan & Spiritual",
  },
];


// ---------- BUKU (urut berdasarkan id) ----------
// kategori_id mengacu ke id pada daftar categories di atas
export const books = [
  {
    id: 1,
    judul: "Sang Eksekutor",
    penulis: "Tere Liye",
    cover_img: "/img/sang-eksekutor.jpg",
    deskripsi:
      "Novel aksi-thriller karya Tere Liye tentang seorang eksekutor dan permainan berbahaya di dunia bawah tanah.",
    harga: 55000,
    kategori_id: 1,
    stok: 1,
    tahun_terbit: 2021,
    created_at: "2025-01-10 08:00:00",
  },

  {
    id: 2,
    judul: "Sosiologi Jilid 2 (Edisi Keenam)",
    penulis: "Paul B. Horton, Chester L. Hunt",
    cover_img: "/img/sosiologi-jilid-2.jpg",
    deskripsi:
      "Buku teks sosiologi klasik yang membahas masyarakat, lembaga sosial, dan perubahan sosial.",
    harga: 25000,
    kategori_id: 4,
    stok: 1,
    tahun_terbit: 1993,
    created_at: "2025-01-12 10:00:00",
  },

  {
    id: 3,
    judul: "Pengantar Kesejahteraan Sosial",
    penulis: "Adi Fahrudin",
    cover_img: "/img/pengantar-kesejahteraan-sosial.jpg",
    deskripsi:
      "Pengantar konsep, ruang lingkup, dan praktik kesejahteraan sosial.",
    harga: 20000,
    kategori_id: 4,
    stok: 1,
    tahun_terbit: 2012,
    created_at: "2025-01-12 10:05:00",
  },

  {
    id: 4,
    judul: "Pemahaman Individu: Teknik Nontes (Edisi Revisi)",
    penulis: "Susilo Rahardjo, Gudnanto",
    cover_img: "/img/pemahaman-individu-teknik-nontes.jpg",
    deskripsi:
      "Panduan teknik nontes untuk memahami individu dalam layanan bimbingan dan konseling.",
    harga: 15000,
    kategori_id: 8,
    stok: 1,
    tahun_terbit: 2015,
    created_at: "2025-01-12 10:10:00",
  },

  {
    id: 5,
    judul: "Ilmu Sosial Dasar (Edisi Revisi)",
    penulis: "M. Munandar Sulaeman",
    cover_img: "/img/ilmu-sosial-dasar.jpg",
    deskripsi:
      "Teori dan konsep ilmu sosial dari pemikiran klasik, modern, hingga postmodern.",
    harga: 25000,
    kategori_id: 4,
    stok: 1,
    tahun_terbit: 2012,
    created_at: "2025-01-12 10:15:00",
  },

  {
    id: 6,
    judul: "Pengantar Sosiologi Ekonomi (Edisi Kedua)",
    penulis: "Damsar, Indrayani",
    cover_img: "/img/pengantar-sosiologi-ekonomi.jpg",
    deskripsi:
      "Pengantar memahami perilaku ekonomi dalam konteks sosial, pasar, dan budaya.",
    harga: 20000,
    kategori_id: 4,
    stok: 1,
    tahun_terbit: 2015,
    created_at: "2025-01-12 10:20:00",
  },

  {
    id: 7,
    judul:
      "Sosiologi Ekonomi: Kapitalisme dan Konsumsi di Era Masyarakat Post-Modernisme",
    penulis: "Bagong Suyanto",
    cover_img: "/img/sosiologi-ekonomi.jpg",
    deskripsi:
      "Kajian tentang kapitalisme dan budaya konsumsi dalam masyarakat postmodern.",
    harga: 25000,
    kategori_id: 4,
    stok: 1,
    tahun_terbit: 2013,
    created_at: "2025-01-12 10:25:00",
  },

  {
    id: 8,
    judul: "Filsafat Ekonomi Islam",
    penulis: "Muhammad Arif",
    cover_img: "/img/filsafat-ekonomi-islam.jpg",
    deskripsi:
      "Landasan filosofis dan prinsip ekonomi dalam perspektif Islam.",
    harga: 15000,
    kategori_id: 14,
    stok: 1,
    tahun_terbit: 2018,
    created_at: "2025-01-13 11:00:00",
  },

  {
    id: 9,
    judul: "Panduan Praktis Menyusun Proposal",
    penulis: "Happy Susanto",
    cover_img: "/img/panduan-menyusun-proposal.jpg",
    deskripsi:
      "Cara menyusun proposal dana, usaha, kredit, penelitian, kegiatan, dan pengadaan barang/jasa.",
    harga: 15000,
    kategori_id: 17,
    stok: 1,
    tahun_terbit: 2007,
    created_at: "2025-01-13 11:05:00",
  },

  {
    id: 10,
    judul: "Analisis dan Perancangan Kontrak (Contract Analysis and Drafting)",
    penulis: "Budiono Kusumohamidjojo",
    cover_img: "/img/analisis-perancangan-kontrak.jpg",
    deskripsi:
      "Panduan menganalisis dan merancang kontrak secara sistematis.",
    harga: 20000,
    kategori_id: 16,
    stok: 1,
    tahun_terbit: 2019,
    created_at: "2025-01-13 11:10:00",
  },

  {
    id: 11,
    judul: "Manajemen Perkantoran & Bisnis",
    penulis: "Jaenudin Akhmad",
    cover_img: "/img/manajemen-perkantoran-bisnis.jpg",
    deskripsi:
      "Dasar-dasar pengelolaan kegiatan perkantoran dan bisnis.",
    harga: 15000,
    kategori_id: 17,
    stok: 1,
    tahun_terbit: 2012,
    created_at: "2025-01-13 11:15:00",
  },

  {
    id: 12,
    judul: "Bandit-Bandit Berkelas",
    penulis: "Tere Liye",
    cover_img: "/img/bandit-bandit-berkelas.jpg",
    deskripsi:
      "Petualangan para bandit lintas negara dengan aksi penuh strategi dan ketegangan.",
    harga: 50000,
    kategori_id: 1,
    stok: 1,
    tahun_terbit: 2022,
    created_at: "2025-01-10 08:05:00",
  },

  {
    id: 13,
    judul: "Catatan Seorang Demonstran",
    penulis: "Soe Hok Gie",
    cover_img: "/img/catatan-seorang-demonstran.jpg",
    deskripsi:
      "Catatan harian aktivis mahasiswa Soe Hok Gie tentang idealisme, politik, dan zamannya.",
    harga: 15000,
    kategori_id: 3,
    stok: 1,
    tahun_terbit: 1983,
    created_at: "2025-01-10 08:10:00",
  },

  {
    id: 14,
    judul: "Laut Pasang 2: 1994",
    penulis: "Lilpudu",
    cover_img: "/img/laut-pasang-2.jpg",
    deskripsi:
      "Lanjutan kisah Laut Pasang dengan latar tahun 1994 yang sarat suasana pantai dan perjalanan batin tokohnya.",
    harga: 45000,
    kategori_id: 2,
    stok: 1,
    tahun_terbit: 2023,
    created_at: "2025-01-10 08:15:00",
  },

  {
    id: 15,
    judul: "Bedebah di Ujung Tanduk",
    penulis: "Tere Liye",
    cover_img: "/img/bedebah-di-ujung-tanduk.jpg",
    deskripsi:
      "Kisah konsultan keuangan Thomas yang terjebak dalam krisis perbankan dan intrik kekuasaan.",
    harga: 50000,
    kategori_id: 1,
    stok: 1,
    tahun_terbit: 2018,
    created_at: "2025-01-10 08:20:00",
  },

  {
    id: 16,
    judul: "Tanah Para Bandit",
    penulis: "Tere Liye",
    cover_img: "/img/tanah-para-bandit.jpg",
    deskripsi:
      "Cerita aksi tentang perebutan kekuasaan dan permainan para bandit di balik layar.",
    harga: 55000,
    kategori_id: 1,
    stok: 1,
    tahun_terbit: 2023,
    created_at: "2025-01-10 08:25:00",
  },

  {
    id: 17,
    judul: "Negeri Para Bedebah",
    penulis: "Tere Liye",
    cover_img: "/img/negeri-para-bedebah.jpg",
    deskripsi:
      "Thriller politik dan ekonomi tentang jaringan elite dan upaya menyelamatkan sebuah bank.",
    harga: 50000,
    kategori_id: 1,
    stok: 1,
    tahun_terbit: 2012,
    created_at: "2025-01-10 08:30:00",
  },

  {
    id: 18,
    judul: "Aku Tersentuh Cinta",
    penulis: "Arif Rahman Lubis",
    cover_img: "/img/aku-tersentuh-cinta.jpg",
    deskripsi:
      "Renungan tentang menerima perpisahan dengan ikhlas dan menjaga cinta lewat doa.",
    harga: 10000,
    kategori_id: 24,
    stok: 1,
    tahun_terbit: 2019,
    created_at: "2025-01-15 09:00:00",
  },

  {
    id: 19,
    judul:
      "Pendidikan Kewarganegaraan: Dalam Rangka Pengembangan Kepribadian Bangsa",
    penulis: "Mardenis",
    cover_img: "/img/pendidikan-kewarganegaraan.jpg",
    deskripsi:
      "Buku ajar kewarganegaraan tentang wawasan kebangsaan dan pembentukan kepribadian bangsa.",
    harga: 15000,
    kategori_id: 5,
    stok: 1,
    tahun_terbit: 2018,
    created_at: "2025-01-12 10:30:00",
  },

  {
    id: 20,
    judul: "The Switch (Tertukar)",
    penulis: "Sandra Brown",
    cover_img: "/img/the-switch.jpg",
    deskripsi:
      "Novel romantis-thriller tentang dua perempuan yang bertukar identitas dengan konsekuensi tak terduga.",
    harga: 33000,
    kategori_id: 2,
    stok: 1,
    tahun_terbit: 2005,
    created_at: "2025-01-10 08:35:00",
  },

  {
    id: 21,
    judul: "Accounting Information System: Sistem Informasi Akuntansi Buku 1",
    penulis: "Marshall B. Romney, Paul John Steinbart",
    cover_img: "/img/accounting-information-system.jpg",
    deskripsi:
      "Buku teks sistem informasi akuntansi tentang pengolahan data dan pengendalian transaksi bisnis.",
    harga: 25000,
    kategori_id: 15,
    stok: 1,
    tahun_terbit: 2009,
    created_at: "2025-01-13 11:20:00",
  },

  {
    id: 22,
    judul: "Pengantar Sistem Informasi (Edisi 16 Buku 1)",
    penulis: "George M. Marakas, James A. O'Brien",
    cover_img: "/img/pengantar-sistem-informasi.jpg",
    deskripsi:
      "Pengantar konsep dan penerapan sistem informasi dalam organisasi dan bisnis.",
    harga: 35000,
    kategori_id: 11,
    stok: 1,
    tahun_terbit: 2013,
    created_at: "2025-01-11 09:00:00",
  },

  {
    id: 23,
    judul: "Membuat Laporan Keuangan Menggunakan MYOB Versi 19.6",
    penulis: "Paidi, Yusmaniarti, Dian Wulan Sari",
    cover_img: "/img/laporan-keuangan-myob.jpg",
    deskripsi:
      "Panduan praktis membuat laporan keuangan dengan aplikasi akuntansi MYOB.",
    harga: 20000,
    kategori_id: 15,
    stok: 1,
    tahun_terbit: 2016,
    created_at: "2025-01-13 11:25:00",
  },

  {
    id: 24,
    judul: "The Powerpuff Girls: Blossom vs. the Blasteroid",
    penulis: "Cartoon Network",
    cover_img: "/img/blossom-vs-blasteroid.jpg",
    deskripsi:
      "Buku cerita interaktif Powerpuff Girls, pilih jalur petualangan versi Blossom.",
    harga: 5000,
    kategori_id: 19,
    stok: 1,
    tahun_terbit: 2003,
    created_at: "2025-01-14 08:00:00",
  },

  {
    id: 25,
    judul: "UUD '45 Hasil Amandemen I, II, III dan IV",
    penulis: "Cahaya Agency",
    cover_img: "/img/uud-45.jpg",
    deskripsi:
      "Naskah UUD 1945 hasil amandemen lengkap dengan susunan pimpinan MPR, DPR, DPD, dan Kabinet Merah Putih 2024-2029.",
    harga: 10000,
    kategori_id: 5,
    stok: 1,
    tahun_terbit: 2024,
    created_at: "2025-01-12 10:35:00",
  },

  {
    id: 26,
    judul: "Paman Gober: Raja Iseng",
    penulis: "Walt Disney",
    cover_img: "/img/paman-gober-raja-iseng.jpg",
    deskripsi:
      "Majalah komik Paman Gober edisi Raja Iseng dengan petualangan si bebek kaya.",
    harga: 5000,
    kategori_id: 19,
    stok: 1,
    tahun_terbit: 2004,
    created_at: "2025-01-14 08:05:00",
  },

  {
    id: 27,
    judul: "Lulus PTN",
    penulis: "Ripayandi David A J Pasaribu",
    cover_img: "/img/lulus-ptn.jpg",
    deskripsi:
      "Panduan strategi dan tips lolos seleksi masuk perguruan tinggi negeri.",
    harga: 10000,
    kategori_id: 6,
    stok: 1,
    tahun_terbit: 2019,
    created_at: "2025-01-12 10:40:00",
  },

  {
    id: 28,
    judul: "J Vol. 2",
    penulis: "Nanatsuki Kyouichi, Fujiwara Yoshihide",
    cover_img: "/img/j-vol-2.jpg",
    deskripsi:
      "Komik aksi bernuansa kriminal terbitan Elex Media Komputindo.",
    harga: 5000,
    kategori_id: 20,
    stok: 1,
    tahun_terbit: 2002,
    created_at: "2025-01-14 08:10:00",
  },

  {
    id: 29,
    judul: "Mim Si Ratu Hape",
    penulis: "Cho Jung Hwa",
    cover_img: "/img/mim-si-ratu-hape.jpg",
    deskripsi:
      "Buku bergambar lucu tentang Mim, gadis yang tak bisa lepas dari ponselnya, ilustrasi Funny Eve.",
    harga: 5000,
    kategori_id: 19,
    stok: 1,
    tahun_terbit: 2013,
    created_at: "2025-01-14 08:15:00",
  },

  {
    id: 30,
    judul: "Growing Up Nuts Vol. 4",
    penulis: "Haruka Fukushima",
    cover_img: "/img/growing-up-nuts-4.jpg",
    deskripsi:
      "Komik remaja romantis-komedi tentang kisah tumbuh dewasa yang kocak.",
    harga: 5000,
    kategori_id: 20,
    stok: 1,
    tahun_terbit: 2005,
    created_at: "2025-01-14 08:20:00",
  },

  {
    id: 31,
    judul: "Paman Gober (Goofy)",
    penulis: "Walt Disney",
    cover_img: "/img/paman-gober-goofy.jpg",
    deskripsi:
      "Majalah komik Paman Gober dengan cerita-cerita kocak Goofy dan kawan-kawan.",
    harga: 5000,
    kategori_id: 19,
    stok: 1,
    tahun_terbit: 2003,
    created_at: "2025-01-14 08:25:00",
  },

  {
    id: 32,
    judul: "Dasar-dasar Manajemen Olahraga",
    penulis: "Toni Daryusman",
    cover_img: "/img/dasar-dasar-manajemen-olahraga.jpg",
    deskripsi:
      "Pengantar prinsip manajemen dalam pengelolaan organisasi dan kegiatan olahraga.",
    harga: 10000,
    kategori_id: 18,
    stok: 1,
    tahun_terbit: 2019,
    created_at: "2025-01-13 11:30:00",
  },

  {
    id: 33,
    judul: "Kindaichi Case Kasus 3B: Legenda Harta Karun Amakusa",
    penulis: "Elex Media Komputindo",
    cover_img: "/img/kindaichi-case-3b.jpg",
    deskripsi:
      "Komik detektif Kindaichi mengungkap misteri harta karun Amakusa.",
    harga: 5000,
    kategori_id: 21,
    stok: 1,
    tahun_terbit: 2002,
    created_at: "2025-01-14 08:30:00",
  },

  {
    id: 34,
    judul: "Legend of the Condor Heroes (射雕英雄传) No. 24",
    penulis: "Jin Yong, Huang Yulang",
    cover_img: "/img/condor-heroes-24.jpg",
    deskripsi:
      "Komik silat adaptasi novel Jin Yong edisi nomor 24.",
    harga: 5000,
    kategori_id: 22,
    stok: 1,
    tahun_terbit: 2006,
    created_at: "2025-01-14 08:35:00",
  },

  {
    id: 35,
    judul:
      "The Impeccable Twins: Knights of Kangouw 09 - Dendam Yu Lok Yan (Bagian Tengah)",
    penulis: "Khu Lung, Cai Jing Dong",
    cover_img: "/img/impeccable-twins-9.jpg",
    deskripsi:
      "Komik silat tentang dendam Yu Lok Yan dalam kisah Knights of Kangouw.",
    harga: 5000,
    kategori_id: 22,
    stok: 1,
    tahun_terbit: 2005,
    created_at: "2025-01-14 08:40:00",
  },

  {
    id: 36,
    judul: "Paman Gober Edisi Ulang Tahun ke-12: Kereta Hadiah",
    penulis: "Walt Disney",
    cover_img: "/img/paman-gober-kereta-hadiah.jpg",
    deskripsi:
      "Edisi spesial ulang tahun Paman Gober dengan cerita Kereta Hadiah.",
    harga: 5000,
    kategori_id: 19,
    stok: 1,
    tahun_terbit: 2003,
    created_at: "2025-01-14 08:45:00",
  },

  {
    id: 37,
    judul: "Lapak Budha Vol. 32",
    penulis: "Tony Wong",
    cover_img: "/img/lapak-budha-32.jpg",
    deskripsi:
      "Komik laga fantasi Lapak Budha karya Tony Wong volume 32.",
    harga: 5000,
    kategori_id: 23,
    stok: 1,
    tahun_terbit: 2008,
    created_at: "2025-01-14 08:50:00",
  },

  {
    id: 38,
    judul: "Akatsuki!! Otoko (Darah Satria II) Vol. 32",
    penulis: "Miyashita Akira",
    cover_img: "/img/akatsuki-otoko-32.jpg",
    deskripsi:
      "Komik laga pertarungan tentang para pria tangguh, edisi Darah Satria II volume 32.",
    harga: 5000,
    kategori_id: 20,
    stok: 1,
    tahun_terbit: 2002,
    created_at: "2025-01-14 08:55:00",
  },

  {
    id: 39,
    judul: "Lapak Budha Vol. 36",
    penulis: "Tony Wong",
    cover_img: "/img/lapak-budha-36.jpg",
    deskripsi:
      "Komik laga fantasi Lapak Budha karya Tony Wong volume 36.",
    harga: 5000,
    kategori_id: 23,
    stok: 1,
    tahun_terbit: 2008,
    created_at: "2025-01-14 09:00:00",
  },

  {
    id: 40,
    judul:
      "Buku Paten Top Best Drilling SPMB Politeknik Statistika STIS CAT 2025/2026",
    penulis: "Tim Akademia Nusantara",
    cover_img: "/img/spmb-stis-cat-2025.jpg",
    deskripsi:
      "Rangkuman materi, paket drilling, dan prediksi soal untuk tes masuk Politeknik Statistika STIS berbasis CAT.",
    harga: 40000,
    kategori_id: 6,
    stok: 1,
    tahun_terbit: 2025,
    created_at: "2025-01-12 10:45:00",
  },

  {
    id: 41,
    judul: "Top Modul Bedah Soal SPCP IPDN",
    penulis: "Tim Pustaka Cerdas",
    cover_img: "/img/spcp-ipdn.jpg",
    deskripsi:
      "Modul materi TKD, TWK, TIU, dan TKP beserta latihan dan prediksi soal seleksi calon praja IPDN.",
    harga: 35000,
    kategori_id: 6,
    stok: 1,
    tahun_terbit: 2023,
    created_at: "2025-01-12 10:50:00",
  },

  {
    id: 42,
    judul: "The King: Bedah Tuntas SNBT TPS 2026",
    penulis: "Forum Tentor Indonesia",
    cover_img: "/img/the-king-snbt-2026.jpg",
    deskripsi:
      "Pembahasan lengkap Tes Potensi Skolastik SNBT 2026 dengan soal dan bonus tryout online.",
    harga: 40000,
    kategori_id: 6,
    stok: 1,
    tahun_terbit: 2025,
    created_at: "2025-01-12 10:55:00",
  },

  {
    id: 43,
    judul: "Wangsit SKD: Pawang Soal Sulit HOTS",
    penulis: "Tim Pusat Karier Salemba",
    cover_img: "/img/wangsit-skd.jpg",
    deskripsi:
      "Bedah materi dan soal HOTS TWK, TIU, TKP untuk seleksi masuk sekolah kedinasan.",
    harga: 30000,
    kategori_id: 6,
    stok: 1,
    tahun_terbit: 2024,
    created_at: "2025-01-12 11:00:00",
  },

  {
    id: 44,
    judul: "The King: Bedah Soal & Materi TPS UTBK SBMPTN",
    penulis: "Forum Tentor Indonesia",
    cover_img: "/img/the-king-tps-utbk.jpg",
    deskripsi:
      "18 paket soal dan pembahasan Tes Potensi Skolastik UTBK SBMPTN dengan tips dan trik.",
    harga: 35000,
    kategori_id: 6,
    stok: 1,
    tahun_terbit: 2022,
    created_at: "2025-01-12 11:05:00",
  },

  {
    id: 45,
    judul: "Metode Penelitian Kuantitatif, Kualitatif, dan R&D",
    penulis: "Sugiyono",
    cover_img: "/img/metode-penelitian-sugiyono.jpg",
    deskripsi:
      "Rujukan utama metodologi penelitian kuantitatif, kualitatif, dan research and development.",
    harga: 20000,
    kategori_id: 7,
    stok: 1,
    tahun_terbit: 2013,
    created_at: "2025-01-12 11:10:00",
  },

  {
    id: 46,
    judul:
      "Kimia Dasar: Prinsip-Prinsip & Aplikasi Modern Jilid 1 (Edisi Kesembilan)",
    penulis: "Petrucci, Harwood, Herring, Madura",
    cover_img: "/img/kimia-dasar-jilid-1.jpg",
    deskripsi:
      "Buku teks kimia dasar yang menjelaskan prinsip dan aplikasi modern disertai CD interaktif.",
    harga: 25000,
    kategori_id: 9,
    stok: 1,
    tahun_terbit: 2007,
    created_at: "2025-01-12 11:15:00",
  },

  {
    id: 47,
    judul: "Dasar-Dasar Ilmu Politik (Edisi Revisi)",
    penulis: "Miriam Budiardjo",
    cover_img: "/img/dasar-dasar-ilmu-politik.jpg",
    deskripsi:
      "Buku pengantar ilmu politik tentang negara, kekuasaan, demokrasi, dan sistem politik.",
    harga: 25000,
    kategori_id: 5,
    stok: 1,
    tahun_terbit: 2008,
    created_at: "2025-01-12 11:20:00",
  },

  {
    id: 48,
    judul: "Aplikasi Excel dalam Statistik dan Riset Terapan",
    penulis: "Johar Arifin",
    cover_img: "/img/aplikasi-excel-statistik.jpg",
    deskripsi:
      "Panduan mengolah statistik dan riset terapan memakai Microsoft Excel dengan studi kasus.",
    harga: 15000,
    kategori_id: 7,
    stok: 1,
    tahun_terbit: 2008,
    created_at: "2025-01-11 09:05:00",
  },

  {
    id: 49,
    judul: "Super Easy English Grammar",
    penulis: "Tim Garda Cendekia",
    cover_img: "/img/super-easy-english-grammar.jpg",
    deskripsi:
      "Belajar grammar bahasa Inggris dengan materi rinci, contoh, latihan soal, dan kunci jawaban.",
    harga: 20000,
    kategori_id: 10,
    stok: 1,
    tahun_terbit: 2020,
    created_at: "2025-01-12 11:25:00",
  },

  {
    id: 50,
    judul: "2000 Most Frequently Used Words",
    penulis: "Tim Pare Academy",
    cover_img: "/img/2000-most-frequently-used-words.jpg",
    deskripsi:
      "Kosakata bahasa Inggris yang paling sering dipakai dan wajib dihafal.",
    harga: 20000,
    kategori_id: 10,
    stok: 1,
    tahun_terbit: 2021,
    created_at: "2025-01-12 11:30:00",
  },

  {
    id: 51,
    judul:
      "Langkah Cepat Menguasai Microsoft Office 2016: Word, Excel, Power Point dan Access (Edisi Revisi)",
    penulis: "Hasrian Rudi Setiawan, Hardiansah Dermawan",
    cover_img: "/img/menguasai-office-2016.jpg",
    deskripsi:
      "Panduan praktis Word, Excel, PowerPoint, dan Access pada Microsoft Office 2016.",
    harga: 25000,
    kategori_id: 12,
    stok: 1,
    tahun_terbit: 2017,
    created_at: "2025-01-11 09:10:00",
  },

  {
    id: 52,
    judul: "Administrasi Sistem Linux RedHat",
    penulis:
      "Richardus Eko Indrajit, Bambang Nurcahyo Prastowo, Dudy Rudianto",
    cover_img: "/img/administrasi-sistem-linux-redhat.jpg",
    deskripsi:
      "Panduan lengkap administrasi Linux RedHat pada komputer stand-alone.",
    harga: 30000,
    kategori_id: 13,
    stok: 1,
    tahun_terbit: 2003,
    created_at: "2025-01-11 09:15:00",
  },

  {
    id: 53,
    judul: "Mutiara Keluarga",
    penulis: "Eddy D. Iskandar",
    cover_img: "/img/mutiara-keluarga.jpg",
    deskripsi:
      "Novel keluarga yang hangat tentang cinta, nilai-nilai religius, dan hubungan antaranggota keluarga.",
    harga: 15000,
    kategori_id: 2,
    stok: 1,
    tahun_terbit: 2016,
    created_at: "2025-01-10 08:40:00",
  },

  {
    id: 54,
    judul: "Cinta Abnormal: Saat Kewarasan Cinta Dipertanyakan",
    penulis: "Sifah Nur",
    cover_img: "/img/cinta-abnormal.jpg",
    deskripsi:
      "Novel remaja Teen Spirit tentang cinta yang tidak biasa dan pertanyaan seputar kewarasan dalam mencintai.",
    harga: 15000,
    kategori_id: 2,
    stok: 1,
    tahun_terbit: 2014,
    created_at: "2025-01-10 08:45:00",
  },

  {
    id: 55,
    judul: "Crazy Rich Asians: Kaya Tujuh Turunan",
    penulis: "Kevin Kwan",
    cover_img: "/img/crazy-rich-asians.jpg",
    deskripsi:
      "Komedi satir tentang kehidupan keluarga super kaya di Asia yang penuh gengsi dan drama.",
    harga: 15000,
    kategori_id: 2,
    stok: 1,
    tahun_terbit: 2018,
    created_at: "2025-01-10 08:50:00",
  },
];


// ---------- USER (dummy, password asli akan di-hash di backend) ----------
export const users = [
  {
    id: 1,
    nama: "Admin Bookshelf",
    email: "admin@bookshelf.test",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    nama: "Budi Pelanggan",
    email: "budi@bookshelf.test",
    password: "budi123",
    role: "pelanggan",
  },
];