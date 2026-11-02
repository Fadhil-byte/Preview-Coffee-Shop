# ☕ Kopi Nusantara — Exact UI Website Preview

Preview statis ini dibuat **100% sama persis** dengan tampilan asli aplikasi Laravel Kopi Nusantara, menggunakan:
1. **HTML Markup & Struktur Elemen Asli** dari file Blade (`home.blade.php`, `auth/login.blade.php`, `auth/register.blade.php`, `user/dashboard.blade.php`, `partials/navbar.blade.php`, `partials/sidebar.blade.php`, `partials/footer.blade.php`).
2. **CSS Asli Hasil Kompilasi Vite** (`css/app.css` dari `public/build/assets/app-_Coxy5y2.css` yang mencakup seluruh `custom.css`, `auth.css`, dan `user.css`).
3. **Ikon & Font yang Sama Persis**: Google Fonts Playfair Display & Inter, Material Symbols Outlined, serta Bootstrap Icons.
4. **Skrip Animasi GSAP & ScrollTrigger** persis seperti di `home.blade.php`.

---

## 📂 Daftar Halaman Preview

| File | Halaman Asli di Laravel | Deskripsi |
| :--- | :--- | :--- |
| [`index.html`](index.html) | `resources/views/home.blade.php` | **Home / Beranda Publik**: Navbar pengunjung, Hero Section, Kategori Menu dengan icon Material Symbols, Menu Populer cards, Cerita di Balik Setiap Cangkir, 6 Kartu Keunggulan, Testimoni Pelanggan (*Amelia, Fadhil, Nabila*), CTA, dan Footer lengkap. |
| [`login.html`](login.html) | `resources/views/auth/login.blade.php` | **Halaman Login**: Layout split-screen asli, visual panel branding kopi di sebelah kiri, form masuk dengan icon SVG & toggle intip password di sebelah kanan. |
| [`register.html`](register.html) | `resources/views/auth/register.blade.php` | **Halaman Registrasi**: Layout split-screen asli dengan panel keunggulan member, form registrasi nama, email, password, dan konfirmasi password. |
| [`user.html`](user.html) | `resources/views/user/dashboard.blade.php` | **Halaman User**: Layout dashboard pelanggan lengkap dengan navbar member (lonceng notifikasi order + avatar profil dropdown), sidebar menu pengguna, welcome banner *"Halo, Fadhil Muhammad!"*, stat cards, dan riwayat pesanan terbaru. |

---

## 🚀 Cara Menjalankan
Buka langsung file-file di atas menggunakan browser favorit Anda (Google Chrome, Microsoft Edge, Firefox) atau via **Live Server**.

Di pojok kanan bawah setiap halaman telah disematkan pill **Floating Preview Switcher** (*Home \| Login \| Regist \| User Page*) agar Anda dapat berpindah antar halaman preview dengan sangat praktis tanpa merusak atau mengubah tata letak asli halaman.
