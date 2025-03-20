-- -------------------------------------------------------------
-- TablePlus 6.3.2(586)
--
-- https://tableplus.com/
--
-- Database: 2025_skripsi_diah
-- Generation Time: 2025-03-21 04:01:16.3200
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `__favorit`;
CREATE TABLE `__favorit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pelanggan_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `like` decimal(10,0) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `__favorit_pelanggan_id_fkey` (`pelanggan_id`),
  KEY `__favorit_product_id_fkey` (`product_id`),
  CONSTRAINT `__favorit_pelanggan_id_fkey` FOREIGN KEY (`pelanggan_id`) REFERENCES `__pelanggan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `__favorit_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `__product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__keranjang`;
CREATE TABLE `__keranjang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pelanggan_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `__keranjang_pelanggan_id_fkey` (`pelanggan_id`),
  KEY `__keranjang_product_id_fkey` (`product_id`),
  CONSTRAINT `__keranjang_pelanggan_id_fkey` FOREIGN KEY (`pelanggan_id`) REFERENCES `__pelanggan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `__keranjang_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `__product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__orders`;
CREATE TABLE `__orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pelanggan_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `ranting` decimal(2,0) DEFAULT NULL,
  `jasa_kirim` varchar(150) NOT NULL,
  `estimasi` varchar(150) DEFAULT NULL,
  `resi` varchar(150) DEFAULT NULL,
  `komentar` varchar(200) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `__orders_pelanggan_id_fkey` (`pelanggan_id`),
  KEY `__orders_product_id_fkey` (`product_id`),
  CONSTRAINT `__orders_pelanggan_id_fkey` FOREIGN KEY (`pelanggan_id`) REFERENCES `__pelanggan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `__orders_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `__product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__pegawai_seller`;
CREATE TABLE `__pegawai_seller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `__pegawai_seller_user_id_key` (`user_id`),
  KEY `__pegawai_seller_seller_id_fkey` (`seller_id`),
  CONSTRAINT `__pegawai_seller_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `__seller` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `__pegawai_seller_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `__users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__pelanggan`;
CREATE TABLE `__pelanggan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `__pelanggan_user_id_key` (`user_id`),
  CONSTRAINT `__pelanggan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `__users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__personal_access_tokens`;
CREATE TABLE `__personal_access_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  `user_agent` longtext DEFAULT NULL,
  `token` varchar(100) NOT NULL,
  `last_used_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `expires_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `__personal_access_tokens_user_id_fkey` (`user_id`),
  CONSTRAINT `__personal_access_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `__users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__product`;
CREATE TABLE `__product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `stock` decimal(8,0) NOT NULL,
  `harga` decimal(10,0) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `kategori` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `__product_seller_id_fkey` (`seller_id`),
  CONSTRAINT `__product_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `__seller` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__roles`;
CREATE TABLE `__roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(150) NOT NULL,
  `role` varchar(150) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__seller`;
CREATE TABLE `__seller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `nama_toko` varchar(100) NOT NULL,
  `alamat_toko` varchar(255) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `__seller_user_id_key` (`user_id`),
  CONSTRAINT `__seller_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `__users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__sessions`;
CREATE TABLE `__sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  `user_agent` longtext DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `__sessions_user_id_fkey` (`user_id`),
  CONSTRAINT `__sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `__users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__status_order`;
CREATE TABLE `__status_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pelanggan_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `keterangan` varchar(250) DEFAULT NULL,
  `status_code` decimal(2,0) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `__status_order_order_id_fkey` (`order_id`),
  KEY `__status_order_pelanggan_id_fkey` (`pelanggan_id`),
  CONSTRAINT `__status_order_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `__orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `__status_order_pelanggan_id_fkey` FOREIGN KEY (`pelanggan_id`) REFERENCES `__pelanggan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__storage`;
CREATE TABLE `__storage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(191) NOT NULL,
  `path` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `mime_type` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `__storage_uid_key` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `__users`;
CREATE TABLE `__users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `remember_token` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `__users_role_id_fkey` (`role_id`),
  CONSTRAINT `__users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `__roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `__product` (`id`, `seller_id`, `label`, `deskripsi`, `stock`, `harga`, `foto`, `created_at`, `updated_at`, `kategori`) VALUES
(1, 1, 'Keeone Robot Vacuum Cleaner', '5 in 1 Portable Penyedot Debu Rumah Sapu Otomatis Robot Pembersih Lantai Humidifier/Sterilisasi', 40, 169000, '0195b47e-c0d8-7000-87fa-2bdd1a1c9398', '2025-03-20 16:59:20.781', '2025-03-20 16:59:20.781', 'Elektronik'),
(2, 1, 'Kipas Angin Berdiri', 'YATT X LEJIA Kipas Angin Berdiri Listrik Premium Low Noise 3 Tingkat Kecepatan / Stand Fan Elektric', 30, 74000, '0195b484-ed1a-7000-a8f0-f82447675702', '2025-03-20 17:06:05.325', '2025-03-20 17:06:05.325', 'Elektronik'),
(3, 1, 'Kipas Angin Duduk', 'FUTAKO KIPAS ANGIN USB BESI PORTABLE BESI DENGAN SATU TINGKAT KECEPATAN', 30, 21000, '0195b487-5ba2-7000-a888-e03d5e0ce438', '2025-03-20 17:08:44.598', '2025-03-20 17:08:44.598', 'Elektronik'),
(4, 1, 'Magic com', 'Magic com mini 1,5 Liter Anti Lengket Serbaguna Rice cooker Panci Listrik 450Wat', 40, 89000, '0195b48a-6890-7000-98b0-f44e9e4248c6', '2025-03-20 17:12:04.589', '2025-03-20 17:12:04.589', 'Elektronik'),
(5, 1, 'Teko Listrik', 'Teko Listrik 2Liter High Quality/Teko Pemanas Air', 30, 53000, '0195b48e-9aca-7000-8a85-5c789dbec123', '2025-03-20 17:16:39.621', '2025-03-20 17:16:39.621', 'Elektronik'),
(6, 1, 'TV A 32', 'Xiaomi Google TV A 32 | Dolby DTS Audio | Smart WIFI Youtube Digital Google TV | [ Official Store ]', 20, 1900000, '0195b490-65ba-7000-aa01-3eb0160cd075', '2025-03-20 17:18:37.108', '2025-03-20 17:18:37.108', 'Elektronik'),
(7, 1, 'Lampu LED', 'Lampu LED Bulb Bohlam LED Capsule lampu LED Hemat Energy Cahaya Putih', 200, 4000, '0195b492-6d51-7000-aa75-34426cd7ce14', '2025-03-20 17:20:50.019', '2025-03-20 17:20:50.019', 'Elektronik'),
(8, 1, 'CCTV', 'SEKER V380 Pro Dual Lens Outdoor Waterproof PTZ Panoramic 1080P Nirkabel Jarak Jauh Kamera', 30, 145000, '0195b494-8a9f-7000-b3d2-15b369c87537', '2025-03-20 17:23:08.589', '2025-03-20 17:23:08.589', 'Elektronik'),
(9, 2, 'Topi polocaps', 'Topi polocaps distro pria/wanita premium', 120, 40000, '0195b4a8-4091-7000-95ed-c9354c1c7b6e', '2025-03-20 17:44:40.484', '2025-03-20 17:44:40.484', 'Fashion'),
(10, 2, 'Topi Baseball', 'Topi Baseball Pria Wanita Brooklyn New York 1989 Gratefull Korean Style Mens Fashion Cap Distro', 120, 10000, '0195b4ab-5d39-7000-8300-b020fbd3ab00', '2025-03-20 17:48:04.391', '2025-03-20 17:48:04.391', 'Fashion'),
(11, 2, 'Kacamata Hitam', 'Korea Kacamata Hitam Optik Anti Warna Permen Kacamata candy Wanita / Pria Fashion Sunglasses 005', 200, 8000, '0195b4ad-6204-7000-8b34-74c748326de5', '2025-03-20 17:50:16.613', '2025-03-20 17:50:16.613', 'Fashion'),
(12, 2, 'Cincin', '7 Pcs Cincin Jari Bentuk Hati Tidak Teratur Warna-Warni Gaya Punk Hip Hop Korea Untuk Pria Dan Wanita G', 123, 20000, '0195b4b0-2a0d-7000-88b6-b55af69299cd', '2025-03-20 17:53:18.949', '2025-03-20 17:53:18.949', 'Fashion'),
(13, 2, 'Gelang', 'Gelang Tangan Rantai Titanium Pria Antikarat Gelang Rantai baja terlaris', 30, 12000, '0195b4b3-4c14-7000-b914-5772c55eed83', '2025-03-20 17:56:44.309', '2025-03-20 17:56:44.309', 'Fashion'),
(14, 2, 'Kemeja polos', 'kemeja polos lengan panjang pria terbaru//kemeja lengan panjang pria premium/kemeja lengan panjang kasual slimfit', 50, 85000, '0195b4b6-09c6-7000-bd32-56ed3773442b', '2025-03-20 17:59:43.835', '2025-03-20 17:59:43.835', 'Fashion'),
(15, 2, 'Baju Oversize Pria', 'TT TOKO MODE baju pria oversize Baju Oversize Pria | Kaos Cowok Distro Original 100% | Kaos Pria Premium Tebal | Baju Polos Pria | Street', 40, 71000, '0195b4b8-368c-7000-a8b8-7f394fdb8cae', '2025-03-20 18:02:06.381', '2025-03-20 18:02:06.381', 'Fashion'),
(16, 2, 'Kaos Pria Distro', 'Kaos Pria Distro Lengan Pendek Kayser Time Baju T-Shirt Keren', 90, 53000, '0195b4bc-5a87-7000-a24b-33259851a14d', '2025-03-20 18:06:37.721', '2025-03-20 18:06:37.721', 'Fashion'),
(17, 2, 'KEMEJA WANITA', 'KEMEJA BORDIR BAHAN LINEN - Ukuran S M L XL XXL XXXL 5L - Kemeja Jumbo - Atasan Wanita Jumbo - Narika shirt', 80, 90000, '0195b4be-711f-7000-839a-8ab2def2ebea', '2025-03-20 18:08:54.590', '2025-03-20 18:08:54.590', 'Fashion'),
(18, 2, 'Rok Tutu', 'FW R625 Rok Tutu 4Lapis Import Premium BKK | Rok Tutu Bridal SUPER LUXURY | Rok Tutu Pecah 10 IMPORT BKK | Rok Tutu Bridal', 67, 205000, '0195b4c0-328f-7000-a859-a36f152ebaa4', '2025-03-20 18:10:49.632', '2025-03-20 18:10:49.632', 'Fashion'),
(19, 2, 'BLOUSE', 'TIFANY BLOUSE RAYON MOTIF BABBYDOL LENGAN BALON FIT TO XL', 40, 67000, '0195b4c2-5a00-7000-8896-028f540d838e', '2025-03-20 18:13:10.878', '2025-03-20 18:13:10.878', 'Fashion'),
(20, 2, 'SWEATER', 'SWEATER OBLONG CREWNECK OVERSIZE WANITA', 40, 36000, '0195b4c4-3ec1-7000-96e7-bd7356d2075d', '2025-03-20 18:15:14.922', '2025-03-20 18:15:14.922', 'Fashion'),
(21, 3, 'Lipstick Lip Matte Cream', 'Lipstick Lip Matte Cream', 90, 30000, '0195b4cc-3e33-7000-9200-035cd32d61a6', '2025-03-20 18:23:59.058', '2025-03-20 18:23:59.058', 'Kosmetik'),
(22, 3, 'SKINTIFIC Mugwort', 'SKINTIFIC Mugwort & Alaska Volcano & Niacinamide Bright Boost Clay Stick pink green gray Masker 40g Komedo Ampuh Penghilang', 70, 69000, '0195b4ce-2e71-7000-b974-02af9be90f12', '2025-03-20 18:26:06.082', '2025-03-20 18:26:06.082', 'Kosmetik'),
(23, 3, 'Creamy Berry Overnight', 'Glad2Glow Creamy Berry Overnight Bright Body Serum 300ml | Body Cream Body Lotion & G2G Tropical Velvet Moist & Smooth', 45, 70000, '0195b4d2-fcc0-7000-be52-5766ba697e01', '2025-03-20 18:31:21.139', '2025-03-20 18:31:21.139', 'Kosmetik'),
(24, 3, 'Recipe Hair Removal Cream', 'Milk Recipe Hair Removal Cream 4in1 Hair Removal Cream - Krim Waxing Perontok Bulu Ketiak Non-Irritating untuk Melembapkan', 500, 30000, '0195b4d6-c9ac-7000-ac41-7588c1d3e25a', '2025-03-20 18:35:30.186', '2025-03-20 18:35:30.186', 'Kosmetik'),
(25, 3, 'Madagascar Centella', 'SKIN1004 Madagascar Centella Tone Brightening Capsule Ampoule 100ml', 300, 100000, '0195b4de-f70b-7000-bc78-ddc16212ce2b', '2025-03-20 18:44:26.134', '2025-03-20 18:44:26.134', 'Kosmetik'),
(26, 3, 'Lovely Multivitamin', 'Buy 3 Glow & Lovely Multivitamin Facial Foam 100gr', 90, 72000, '0195b4e1-18dc-7000-a3af-e3c567bded45', '2025-03-20 18:46:45.822', '2025-03-20 18:46:45.822', 'Kosmetik'),
(27, 3, 'Sunscreen', 'Facetology Triple Care Sunscreen For Acne & Oily Skin SPF 40 PA+++ 40ML', 130, 80000, '0195b4e2-750a-7000-9e35-41f39306189d', '2025-03-20 18:48:14.968', '2025-03-20 18:48:14.968', 'Kosmetik'),
(28, 3, 'SOMETHINC', 'SOMETHINC Forever Stay Comfort Lip Glaze', 130, 198000, '0195b4e8-a14b-7000-a34a-bfd794bf7f1c', '2025-03-20 18:54:59.551', '2025-03-20 18:54:59.551', 'Kosmetik'),
(29, 3, 'Spray Serum', 'Alba White Truffle First Spray Serum 100ml', 130, 261000, '0195b4ea-d2d9-7000-971b-dc19db5f1d14', '2025-03-20 18:57:23.276', '2025-03-20 18:57:23.276', 'Kosmetik'),
(30, 3, 'Hair Serum', 'Moicare Hair Serum - Anti Hair Fall Treatment With Biotin Keratin Ginseng Chammomile Extract Mengatasi Rambut Kering & Rontok', 87, 36000, '0195b4ec-9c94-7000-a38d-359db3c92b9f', '2025-03-20 18:59:20.471', '2025-03-20 18:59:20.471', 'Kosmetik');

INSERT INTO `__roles` (`id`, `label`, `role`, `created_at`) VALUES
(2, 'Admin Toko', '4dm1n-t0kO', '2025-03-20 16:49:00.955'),
(3, 'Pegawai Toko', 'p3gaw4i-t0kO', '2025-03-20 16:49:00.956'),
(4, 'Pelanggan', 'p3lAnGg4n', '2025-03-20 16:49:00.957'),
(99, 'Super Admin', '5up3r-4dm1N', '2025-03-20 16:49:00.951');

INSERT INTO `__seller` (`id`, `user_id`, `no_hp`, `nama_toko`, `alamat_toko`, `created_at`, `updated_at`) VALUES
(1, 2, '082212341234', 'Elektronik Center', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', '2025-03-20 16:55:50.781', '2025-03-20 16:55:50.781'),
(2, 3, '082212331233', 'Fashion King', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', '2025-03-20 17:38:55.444', '2025-03-20 17:38:55.444'),
(3, 4, '082212223212', 'Aksesoris Ternate', 'is simply dummy text of the printing and typesetting industry', '2025-03-20 18:18:06.325', '2025-03-20 18:18:06.325');

INSERT INTO `__storage` (`id`, `uid`, `path`, `name`, `mime_type`, `created_at`, `updated_at`) VALUES
(1, '0195b47e-c0d8-7000-87fa-2bdd1a1c9398', 'public/storage/product/Elektronik Center', 'Keeone Robot Vacuum Cleaner.png', 'image/png', '2025-03-20 16:59:20.693', '2025-03-20 16:59:20.693'),
(2, '0195b484-ed1a-7000-a8f0-f82447675702', 'public/storage/product/Elektronik Center', 'Kipas Angin Berdiri.png', 'image/png', '2025-03-20 17:06:05.231', '2025-03-20 17:06:05.231'),
(3, '0195b487-5ba2-7000-a888-e03d5e0ce438', 'public/storage/product/Elektronik Center', 'Kipas Angin Duduk.png', 'image/png', '2025-03-20 17:08:44.584', '2025-03-20 17:08:44.584'),
(4, '0195b48a-6890-7000-98b0-f44e9e4248c6', 'public/storage/product/Elektronik Center', 'Magic com.png', 'image/png', '2025-03-20 17:12:04.514', '2025-03-20 17:12:04.514'),
(5, '0195b48e-9aca-7000-8a85-5c789dbec123', 'public/storage/product/Elektronik Center', 'Teko Listrik.png', 'image/png', '2025-03-20 17:16:39.530', '2025-03-20 17:16:39.530'),
(6, '0195b490-65ba-7000-aa01-3eb0160cd075', 'public/storage/product/Elektronik Center', 'TV A 32.png', 'image/png', '2025-03-20 17:18:37.014', '2025-03-20 17:18:37.014'),
(7, '0195b492-6d51-7000-aa75-34426cd7ce14', 'public/storage/product/Elektronik Center', 'Lampu LED.png', 'image/png', '2025-03-20 17:20:50.003', '2025-03-20 17:20:50.003'),
(8, '0195b494-8a9f-7000-b3d2-15b369c87537', 'public/storage/product/Elektronik Center', 'CCTV.png', 'image/png', '2025-03-20 17:23:08.578', '2025-03-20 17:23:08.578'),
(9, '0195b4a8-4091-7000-95ed-c9354c1c7b6e', 'public/storage/product/Fashion King', 'Topi polocaps.png', 'image/png', '2025-03-20 17:44:40.368', '2025-03-20 17:44:40.368'),
(10, '0195b4ab-5d39-7000-8300-b020fbd3ab00', 'public/storage/product/Fashion King', 'Topi Baseball.png', 'image/png', '2025-03-20 17:48:04.304', '2025-03-20 17:48:04.304'),
(11, '0195b4ad-6204-7000-8b34-74c748326de5', 'public/storage/product/Fashion King', 'Kacamata Hitam.png', 'image/png', '2025-03-20 17:50:16.583', '2025-03-20 17:50:16.583'),
(12, '0195b4b0-2a0d-7000-88b6-b55af69299cd', 'public/storage/product/Fashion King', 'Cincin.png', 'image/png', '2025-03-20 17:53:18.880', '2025-03-20 17:53:18.880'),
(13, '0195b4b3-4c14-7000-b914-5772c55eed83', 'public/storage/product/Fashion King', 'Gelang.png', 'image/png', '2025-03-20 17:56:44.201', '2025-03-20 17:56:44.201'),
(14, '0195b4b6-09c6-7000-bd32-56ed3773442b', 'public/storage/product/Fashion King', 'Kemeja polos.png', 'image/png', '2025-03-20 17:59:43.816', '2025-03-20 17:59:43.816'),
(15, '0195b4b8-368c-7000-a8b8-7f394fdb8cae', 'public/storage/product/Fashion King', 'Baju Oversize Pria.png', 'image/png', '2025-03-20 18:02:06.351', '2025-03-20 18:02:06.351'),
(16, '0195b4bc-5a87-7000-a24b-33259851a14d', 'public/storage/product/Fashion King', 'Kaos Pria Distro.png', 'image/png', '2025-03-20 18:06:37.705', '2025-03-20 18:06:37.705'),
(17, '0195b4be-711f-7000-839a-8ab2def2ebea', 'public/storage/product/Fashion King', 'KEMEJA WANITA.png', 'image/png', '2025-03-20 18:08:54.562', '2025-03-20 18:08:54.562'),
(18, '0195b4c0-328f-7000-a859-a36f152ebaa4', 'public/storage/product/Fashion King', 'Rok Tutu.png', 'image/png', '2025-03-20 18:10:49.618', '2025-03-20 18:10:49.618'),
(19, '0195b4c2-5a00-7000-8896-028f540d838e', 'public/storage/product/Fashion King', 'BLOUSE.png', 'image/png', '2025-03-20 18:13:10.806', '2025-03-20 18:13:10.806'),
(20, '0195b4c4-3ec1-7000-96e7-bd7356d2075d', 'public/storage/product/Fashion King', 'SWEATER.png', 'image/png', '2025-03-20 18:15:14.884', '2025-03-20 18:15:14.884'),
(21, '0195b4cc-3e33-7000-9200-035cd32d61a6', 'public/storage/product/Aksesoris Ternate', 'Lipstick Lip Matte Cream.png', 'image/png', '2025-03-20 18:23:59.031', '2025-03-20 18:23:59.031'),
(22, '0195b4ce-2e71-7000-b974-02af9be90f12', 'public/storage/product/Aksesoris Ternate', 'SKINTIFIC Mugwort.png', 'image/png', '2025-03-20 18:26:06.067', '2025-03-20 18:26:06.067'),
(23, '0195b4d2-fcc0-7000-be52-5766ba697e01', 'public/storage/product/Aksesoris Ternate', 'Creamy Berry Overnight.png', 'image/png', '2025-03-20 18:31:21.046', '2025-03-20 18:31:21.046'),
(24, '0195b4d6-c9ac-7000-ac41-7588c1d3e25a', 'public/storage/product/Aksesoris Ternate', 'Recipe Hair Removal Cream.png', 'image/png', '2025-03-20 18:35:30.112', '2025-03-20 18:35:30.112'),
(25, '0195b4de-f70b-7000-bc78-ddc16212ce2b', 'public/storage/product/Aksesoris Ternate', 'Madagascar Centella.png', 'image/png', '2025-03-20 18:44:26.019', '2025-03-20 18:44:26.019'),
(26, '0195b4e1-18dc-7000-a3af-e3c567bded45', 'public/storage/product/Aksesoris Ternate', 'Lovely Multivitamin.png', 'image/png', '2025-03-20 18:46:45.747', '2025-03-20 18:46:45.747'),
(27, '0195b4e2-750a-7000-9e35-41f39306189d', 'public/storage/product/Aksesoris Ternate', 'Sunscreen.png', 'image/png', '2025-03-20 18:48:14.883', '2025-03-20 18:48:14.883'),
(28, '0195b4e8-a14b-7000-a34a-bfd794bf7f1c', 'public/storage/product/Aksesoris Ternate', 'SOMETHINC.png', 'image/png', '2025-03-20 18:54:59.447', '2025-03-20 18:54:59.447'),
(29, '0195b4ea-d2d9-7000-971b-dc19db5f1d14', 'public/storage/product/Aksesoris Ternate', 'Spray Serum.png', 'image/png', '2025-03-20 18:57:23.183', '2025-03-20 18:57:23.183'),
(30, '0195b4ec-9c94-7000-a38d-359db3c92b9f', 'public/storage/product/Aksesoris Ternate', 'Hair Serum.png', 'image/png', '2025-03-20 18:59:20.373', '2025-03-20 18:59:20.373');

INSERT INTO `__users` (`id`, `role_id`, `username`, `password`, `nama`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 99, 'admin', '$2b$10$E4W/b7hOsaVvn.1zkqC0VOx7kGWMYnxrauEMCKVJ90Y5T7ZDCjE36', 'Super Administrator', NULL, '2025-03-20 16:49:01.059', '2025-03-20 16:49:01.059'),
(2, 2, 'elektro_center', '$2b$10$co65UDqoaB7YULBX2bj/t.SLz4xqObTPQdr76yEcBjJxNC/PfHSpG', 'Elektronik Center', NULL, '2025-03-20 16:55:50.761', '2025-03-20 16:55:50.761'),
(3, 2, 'fashion_king', '$2b$10$OgNvW/fF3AIxtUZBEFyxzOZnka3jxRnFUJIMh48Jy4PfDuHOgo94K', 'Fashion King', NULL, '2025-03-20 17:38:55.424', '2025-03-20 17:38:55.424'),
(4, 2, 'aksesoris_tte', '$2b$10$Zhka8N4DcBmk3fMNNYB7juMhYVHqvciroDkNqcIpg9.xtblUXa4NS', 'Aksesoris Ternate', NULL, '2025-03-20 18:18:06.319', '2025-03-20 18:18:06.319');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;