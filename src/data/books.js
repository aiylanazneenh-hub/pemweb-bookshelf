export const categories = [
  { id: 1, nama_kategori: "Novel", status_kategori: "aktif" },
  { id: 2, nama_kategori: "Pendidikan", status_kategori: "aktif" },
  { id: 3, nama_kategori: "Teknologi", status_kategori: "aktif" },
  { id: 4, nama_kategori: "Bisnis", status_kategori: "aktif" },
  { id: 5, nama_kategori: "Komik", status_kategori: "aktif" },
  { id: 6, nama_kategori: "Self-Growth", status_kategori: "aktif" },
];

export const books = [
  // ===== NOVEL =====
  { id: 1, judul: "Laut Bercerita", penulis: "Leila S. Chudori", cover_img: "/img/laut-bercerita.jpg", deskripsi: "Novel tentang aktivis mahasiswa yang hilang pada masa Orde Baru.", harga: 100000, kategori_id: 1, populer: "ya", stok: 12, tahun_terbit: 2017, created_at: "2025-01-10 08:00:00" },
  { id: 2, judul: "Laskar Pelangi", penulis: "Andrea Hirata", cover_img: "/img/laskar-pelangi.jpg", deskripsi: "Kisah sepuluh anak dari Belitung yang berjuang meraih pendidikan di sekolah sederhana dengan semangat dan mimpi besar.", harga: 95000, kategori_id: 1, populer: "ya", stok: 20, tahun_terbit: 2005, created_at: "2025-01-10 08:05:00" },
  { id: 3, judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", cover_img: "/img/bumi-manusia.jpg", deskripsi: "Novel sejarah tentang Minke, pribumi terpelajar, di masa kolonial Hindia Belanda dan kisahnya bersama Nyai Ontosoroh.", harga: 125000, kategori_id: 1, populer: "ya", stok: 8, tahun_terbit: 1980, created_at: "2025-01-10 08:10:00" },
  { id: 4, judul: "Cantik Itu Luka", penulis: "Eka Kurniawan", cover_img: "/img/cantik-itu-luka.jpg", deskripsi: "Novel realisme magis tentang Dewi Ayu dan keturunannya yang diwarnai sejarah kelam, mitos, dan kutukan.", harga: 110000, kategori_id: 1, populer: "tidak", stok: 5, tahun_terbit: 2002, created_at: "2025-01-10 08:15:00" },

  // ===== PENDIDIKAN =====
  { id: 5, judul: "Mindset: The New Psychology of Success", penulis: "Carol S. Dweck", cover_img: "/img/mindset.jpg", deskripsi: "Membahas perbedaan fixed mindset dan growth mindset serta pengaruhnya terhadap belajar dan keberhasilan.", harga: 130000, kategori_id: 2, populer: "ya", stok: 15, tahun_terbit: 2006, created_at: "2025-01-12 10:00:00" },
  { id: 6, judul: "Sekolahnya Manusia", penulis: "Munif Chatib", cover_img: "/img/sekolahnya-manusia.jpg", deskripsi: "Konsep sekolah yang menghargai keunikan tiap anak melalui pendekatan multiple intelligences.", harga: 75000, kategori_id: 2, populer: "tidak", stok: 9, tahun_terbit: 2009, created_at: "2025-01-12 10:05:00" },
  { id: 7, judul: "Pendidikan Kaum Tertindas", penulis: "Paulo Freire", cover_img: "/img/pendidikan-kaum-tertindas.jpg", deskripsi: "Karya klasik tentang pendidikan pembebasan dan kesadaran kritis sebagai jalan melawan penindasan.", harga: 90000, kategori_id: 2, populer: "tidak", stok: 0, tahun_terbit: 1968, created_at: "2025-01-12 10:10:00" },
  { id: 8, judul: "Totto-chan: Gadis Cilik di Jendela", penulis: "Tetsuko Kuroyanagi", cover_img: "/img/totto-chan.jpg", deskripsi: "Kisah nyata seorang anak yang dikeluarkan dari sekolah lalu menemukan sekolah impian dengan metode belajar yang menyenangkan.", harga: 85000, kategori_id: 2, populer: "ya", stok: 14, tahun_terbit: 1981, created_at: "2025-01-12 10:15:00" },

  // ===== TEKNOLOGI =====
  { id: 9, judul: "Clean Code", penulis: "Robert C. Martin", cover_img: "/img/clean-code.jpg", deskripsi: "Panduan menulis kode yang bersih, mudah dibaca, dan mudah dirawat oleh seorang software craftsman.", harga: 450000, kategori_id: 3, populer: "ya", stok: 6, tahun_terbit: 2008, created_at: "2025-01-11 09:00:00" },
  { id: 10, judul: "The Pragmatic Programmer", penulis: "David Thomas, Andrew Hunt", cover_img: "/img/pragmatic-programmer.jpg", deskripsi: "Kumpulan tips dan filosofi praktis untuk menjadi programmer yang lebih efektif dan adaptif.", harga: 520000, kategori_id: 3, populer: "tidak", stok: 4, tahun_terbit: 2019, created_at: "2025-01-11 09:05:00" },
  { id: 11, judul: "Python Crash Course", penulis: "Eric Matthes", cover_img: "/img/python-crash-course.jpg", deskripsi: "Pengantar pemrograman Python berbasis proyek, cocok untuk pemula yang ingin langsung praktik.", harga: 480000, kategori_id: 3, populer: "ya", stok: 10, tahun_terbit: 2015, created_at: "2025-01-11 09:10:00" },
  { id: 12, judul: "Designing Data-Intensive Applications", penulis: "Martin Kleppmann", cover_img: "/img/designing-data-intensive-applications.jpg", deskripsi: "Panduan merancang sistem data yang andal, skalabel, dan mudah dirawat, dari database hingga stream processing.", harga: 650000, kategori_id: 3, populer: "ya", stok: 7, tahun_terbit: 2017, created_at: "2025-01-11 09:15:00" },

  // ===== BISNIS =====
  { id: 13, judul: "Rich Dad Poor Dad", penulis: "Robert T. Kiyosaki", cover_img: "/img/rich-dad-poor-dad.jpg", deskripsi: "Pelajaran tentang literasi keuangan, aset, dan cara berpikir tentang uang dari dua sosok ayah.", harga: 99000, kategori_id: 4, populer: "ya", stok: 25, tahun_terbit: 1997, created_at: "2025-01-13 11:00:00" },
  { id: 14, judul: "The Lean Startup", penulis: "Eric Ries", cover_img: "/img/the-lean-startup.jpg", deskripsi: "Metode membangun startup dengan eksperimen cepat, validasi pasar, dan siklus build-measure-learn.", harga: 135000, kategori_id: 4, populer: "ya", stok: 11, tahun_terbit: 2011, created_at: "2025-01-13 11:05:00" },
  { id: 15, judul: "Zero to One", penulis: "Peter Thiel, Blake Masters", cover_img: "/img/zero-to-one.jpg", deskripsi: "Panduan membangun bisnis inovatif yang menciptakan sesuatu yang baru, bukan sekadar menyalin yang sudah ada.", harga: 115000, kategori_id: 4, populer: "tidak", stok: 3, tahun_terbit: 2014, created_at: "2025-01-13 11:10:00" },
  { id: 16, judul: "Good to Great", penulis: "Jim Collins", cover_img: "/img/good-to-great.jpg", deskripsi: "Riset tentang faktor-faktor yang membuat perusahaan biasa melompat menjadi perusahaan unggul secara berkelanjutan.", harga: 140000, kategori_id: 4, populer: "ya", stok: 12, tahun_terbit: 2001, created_at: "2025-01-13 11:15:00" },

  // ===== KOMIK =====
  { id: 17, judul: "One Piece Vol. 1", penulis: "Eiichiro Oda", cover_img: "/img/one-piece-vol-1.jpg", deskripsi: "Awal petualangan Monkey D. Luffy, bocah berkemampuan tubuh karet yang bermimpi menjadi Raja Bajak Laut.", harga: 35000, kategori_id: 5, populer: "ya", stok: 30, tahun_terbit: 1997, created_at: "2025-01-14 08:00:00" },
  { id: 18, judul: "Naruto Vol. 1", penulis: "Masashi Kishimoto", cover_img: "/img/naruto-vol-1.jpg", deskripsi: "Kisah Naruto Uzumaki, ninja muda yang dikucilkan desanya dan bercita-cita menjadi Hokage.", harga: 35000, kategori_id: 5, populer: "ya", stok: 22, tahun_terbit: 1999, created_at: "2025-01-14 08:05:00" },
  { id: 19, judul: "Death Note Vol. 1", penulis: "Tsugumi Ohba, Takeshi Obata", cover_img: "/img/death-note-vol-1.jpg", deskripsi: "Siswa jenius Light Yagami menemukan buku catatan yang bisa membunuh siapa pun yang namanya tertulis di dalamnya.", harga: 38000, kategori_id: 5, populer: "ya", stok: 4, tahun_terbit: 2004, created_at: "2025-01-14 08:10:00" },
  { id: 20, judul: "Attack on Titan Vol. 1", penulis: "Hajime Isayama", cover_img: "/img/attack-on-titan-vol-1.jpg", deskripsi: "Umat manusia hidup terkurung di balik tembok raksasa demi bertahan dari serangan para Titan pemakan manusia.", harga: 40000, kategori_id: 5, populer: "tidak", stok: 0, tahun_terbit: 2010, created_at: "2025-01-14 08:15:00" },

  // ===== SELF-GROWTH =====
  { id: 21, judul: "Atomic Habits", penulis: "James Clear", cover_img: "/img/atomic-habits.jpg", deskripsi: "Cara membangun kebiasaan baik dan menghilangkan kebiasaan buruk lewat perubahan kecil yang konsisten.", harga: 108000, kategori_id: 6, populer: "ya", stok: 28, tahun_terbit: 2018, created_at: "2025-01-15 09:00:00" },
  { id: 22, judul: "Filosofi Teras", penulis: "Henry Manampiring", cover_img: "/img/filosofi-teras.jpg", deskripsi: "Pengantar filsafat Stoa untuk mengelola emosi dan menghadapi masalah hidup sehari-hari dengan lebih tenang.", harga: 98000, kategori_id: 6, populer: "ya", stok: 18, tahun_terbit: 2018, created_at: "2025-01-15 09:05:00" },
  { id: 23, judul: "The 7 Habits of Highly Effective People", penulis: "Stephen R. Covey", cover_img: "/img/7-habits.jpg", deskripsi: "Tujuh kebiasaan untuk menjadi pribadi yang efektif, mulai dari proaktif hingga mengasah diri secara berkelanjutan.", harga: 120000, kategori_id: 6, populer: "tidak", stok: 9, tahun_terbit: 1989, created_at: "2025-01-15 09:10:00" },
  { id: 24, judul: "The Subtle Art of Not Giving a F*ck", penulis: "Mark Manson", cover_img: "/img/subtle-art.jpg", deskripsi: "Pendekatan jujur tentang memilih apa yang benar-benar layak dipedulikan agar hidup lebih bermakna.", harga: 99000, kategori_id: 6, populer: "tidak", stok: 5, tahun_terbit: 2016, created_at: "2025-01-15 09:15:00" },
];

export const users = [
  { id: 1, nama: "Admin Bookshelf", email: "admin@bookshelf.test", password: "admin123", role: "admin" },
  { id: 2, nama: "Budi Pelanggan", email: "budi@bookshelf.test", password: "budi123", role: "pelanggan" },
];