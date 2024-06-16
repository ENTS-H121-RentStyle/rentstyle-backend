export function getLastSunday() {
  let today = new Date();
  let day = today.getDay(); // Hari dalam angka (0: Minggu, 1: Senin, ..., 6: Sabtu)
  let lastSunday = new Date(today); // Salin tanggal hari ini

  // Pindahkan ke hari Minggu terakhir dengan mengurangi hari
  lastSunday.setDate(today.getDate() - day);

  // Hapus jam, menit, detik, dan milidetik
  lastSunday.setHours(0, 0, 0, 0);
  lastSunday.setUTCHours(lastSunday.getUTCHours() + 7);

  // Ambil tanggal saja
  let formattedDate = lastSunday.toISOString().split("T")[0];

  return formattedDate;
}