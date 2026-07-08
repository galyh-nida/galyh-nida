/**
 * CODE.GS — Backend RSVP untuk Undangan Digital
 * ---------------------------------------------------------------
 * Cara pakai: lihat README.md bagian "Setup Google Sheets".
 * Ringkas:
 *  1. Buat Google Sheet baru, buat sheet bernama "RSVP" dengan header:
 *     Timestamp | Nama | Kehadiran | Jumlah | Ucapan
 *  2. Extensions > Apps Script, tempel isi file ini, Save.
 *  3. Jalankan fungsi setup() sekali (Run > setup) untuk membuat header
 *     otomatis jika belum ada, dan untuk memberi izin akses.
 *  4. Deploy > New deployment > Web app.
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  5. Salin URL Web App yang dihasilkan ke CONFIG.rsvp.scriptUrl
 *     di assets/js/config.js pada website.
 */

const SHEET_NAME = "RSVP";

function setup() {
  const sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Nama", "Kehadiran", "Jumlah", "Ucapan"]);
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

/** GET — mengembalikan seluruh data RSVP (untuk ditampilkan di website) */
function doGet(e) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1); // buang header

  const data = rows
    .filter((r) => r[1]) // baris dengan nama saja
    .map((r) => ({
      timestamp: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
      nama: String(r[1] || ""),
      kehadiran: String(r[2] || ""),
      jumlah: r[3] || 1,
      ucapan: String(r[4] || "")
    }))
    .reverse(); // terbaru duluan

  return jsonOutput_({ status: "success", data: data });
}

/** POST — menambah satu baris RSVP baru */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const nama = (body.nama || "").toString().trim();
    const kehadiran = (body.kehadiran || "").toString().trim();
    const jumlah = parseInt(body.jumlah, 10) || 1;
    const ucapan = (body.ucapan || "").toString().trim();

    if (!nama || !kehadiran) {
      return jsonOutput_({ status: "error", message: "Nama dan kehadiran wajib diisi." });
    }

    const sheet = getSheet_();
    sheet.appendRow([new Date(), nama, kehadiran, jumlah, ucapan]);

    return jsonOutput_({ status: "success" });
  } catch (err) {
    return jsonOutput_({ status: "error", message: err.message });
  }
}

function jsonOutput_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
