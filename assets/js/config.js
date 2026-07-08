/* =========================================================================
   KONFIGURASI UNDANGAN
   Semua teks, tanggal, lokasi, dan pengaturan website ada di file ini.
   Kamu TIDAK perlu menyentuh file HTML/CSS/JS lain untuk mengubah isi.
   Cukup ubah nilai-nilai di bawah ini, simpan, lalu upload ulang.
   ========================================================================= */

const CONFIG = {

  // ---------------------------------------------------------------------
  // 1. MEMPELAI
  // ---------------------------------------------------------------------
  groom: {
    fullName: "dr. Galyh Naf'an Dzikri",     // nama lengkap
    nickName: "Galyh",              // nama panggilan (tampil besar)
    parents: "Putra dari Bapak Hendra Suparyanto, S.T. & Ibu Surya Fitriyani, S.Si., Apt",
    instagram: ""          // kosongkan "" jika tidak mau tampil
  },
  bride: {
    fullName: "dr. Nida Fauziyah",
    nickName: "Nida",
    parents: "Putri dari Bapak M. Arif Hidayat, S.T. & Ibu Lulu Kurnijati, S.T.",
    instagram: ""
  },

  // ---------------------------------------------------------------------
  // 2. UCAPAN PEMBUKA
  // ---------------------------------------------------------------------
  opening: {
    greeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    arabicVerse: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    verseTranslation: "\u201cDan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.\u201d",
    verseSource: "QS. Ar-Rum (30) : 21",
    openingText: "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami. Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu."
  },

  // ---------------------------------------------------------------------
  // 3. TANGGAL PERNIKAHAN (dipakai untuk hitung mundur)
  //    Format: "YYYY-MM-DDTHH:mm:ss" (waktu lokal WIB)
  // ---------------------------------------------------------------------
  weddingDate: "2026-09-19T08:00:00",

  // ---------------------------------------------------------------------
  // 4. ACARA
  // ---------------------------------------------------------------------
  events: [
    {
      name: "Akad Nikah",
      date: "Sabtu, 19 September 2026",
      time: "08.00 WIB \u2013 selesai",
      location: "Gedung Dewa Ruci AMNI",
      address: "Jl. Soekarno-Hatta No. 180, Semarang, Jawa Tengah",
      mapsUrl: "https://maps.app.goo.gl/NX9sVnKhhKh2NNJg9"
    },
    {
      name: "Resepsi",
      date: "Sabtu, 19 September 2026",
      time: "10.00 WIB \u2013 selesai",
      location: "Gedung Dewa Ruci AMNI",
      address: "Jl. Soekarno-Hatta No.180, Semarang, Jawa Tengah",
      mapsUrl: "https://maps.app.goo.gl/NX9sVnKhhKh2NNJg9"
    }
  ],

  // ---------------------------------------------------------------------
  // 5. UCAPAN TERIMA KASIH (bagian penutup)
  // ---------------------------------------------------------------------
  closing: {
    text: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran serta doa restunya, kami ucapkan terima kasih.",
    signOff: "Kami yang berbahagia,"
  },

  // ---------------------------------------------------------------------
  // 6. RSVP \u2014 Integrasi Google Sheets
  //    Lihat README.md bagian "Setup Google Sheets" untuk cara mendapatkan
  //    URL ini dari Google Apps Script.
  // ---------------------------------------------------------------------
  rsvp: {
    scriptUrl: "https://script.google.com/macros/s/AKfycbwuCsUU_1JPfZrVHKWO8mdzhm1of86VdUubPEkrsdqIR2Y_108WqpjE54FAGK7IiP8PZg/exec",
    // interval refresh daftar ucapan (ms)
    refreshInterval: 15000
  },

  // ---------------------------------------------------------------------
  // 7. MUSIK LATAR
  //    Taruh file musik di assets/audio/ lalu ganti nama file di bawah.
  //    Format mp3 disarankan. Loop otomatis, mulai saat tamu buka undangan.
  // ---------------------------------------------------------------------
  music: {
    src: "love letters.mp3",
    title: "love letters"
  },

  // ---------------------------------------------------------------------
  // 8. ILUSTRASI (mengarah ke file di assets/img/)
  // ---------------------------------------------------------------------
  images: {
    bride: "assets/img/bride.png",
    groom: "assets/img/groom.png",
    coupleFrame: "assets/img/couple-frame.png",
    paperTexture: "assets/img/paper-texture.png",
    emptyFrame: "assets/img/frame-empty.png"
  },

  // ---------------------------------------------------------------------
  // 9. TEKS SAMPUL (cover / halaman pembuka)
  // ---------------------------------------------------------------------
  cover: {
    eyebrow: "The Wedding of",
    guestLabel: "Kepada Yth. Bapak/Ibu/Saudara/i",
    defaultGuestName: "Tamu Undangan",
    buttonText: "Buka Undangan"
  }
};
