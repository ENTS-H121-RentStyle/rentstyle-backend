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

export function getLastWednesday() {
  let today = new Date();
  let day = today.getDay(); // Hari dalam angka (0: Minggu, 1: Senin, ..., 6: Sabtu)
  let diff = (day + 7 - 3) % 7; // Perbedaan hari untuk pindah ke hari Rabu (3: Rabu)

  let lastWednesday = new Date(today); // Salin tanggal hari ini
  lastWednesday.setDate(today.getDate() - diff); // Pindahkan ke hari Rabu terakhir

  // Hapus jam, menit, detik, dan milidetik
  lastWednesday.setHours(0, 0, 0, 0);
  lastWednesday.setUTCHours(lastWednesday.getUTCHours() + 7);

  // Ambil tanggal saja dalam format YYYY-MM-DD
  let formattedDate = lastWednesday.toISOString().split("T")[0];

  return formattedDate;
}

export function getLastThursday() {
  let today = new Date();
  let day = today.getDay(); // Hari dalam angka (0: Minggu, 1: Senin, ..., 6: Sabtu)
  let diff = (day + 7 - 4) % 7; // Perbedaan hari untuk pindah ke hari Kamis (4: Kamis)

  let lastThursday = new Date(today); // Salin tanggal hari ini
  lastThursday.setDate(today.getDate() - diff); // Pindahkan ke hari Kamis terakhir

  // Hapus jam, menit, detik, dan milidetik
  lastThursday.setHours(0, 0, 0, 0);
  lastThursday.setUTCHours(lastThursday.getUTCHours() + 7);

  // Ambil tanggal saja dalam format YYYY-MM-DD
  let formattedDate = lastThursday.toISOString().split("T")[0];

  return formattedDate;
}
