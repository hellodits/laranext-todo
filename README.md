# Fullstack Todo App - Technical Test

Aplikasi Todo List fullstack menggunakan Laravel (Backend) dan Next.js (Frontend) dengan autentikasi Laravel Sanctum.

---

## PHASE 1: Pertanyaan Interview

### 1. Jelaskan apa itu REST API?

REST API (Representational State Transfer) adalah cara komunikasi antara aplikasi frontend dan backend menggunakan protokol HTTP. REST mengikuti prinsip-prinsip sederhana yang membuatnya mudah dipahami dan digunakan.

**Prinsip utama REST:**
- **Stateless**: Setiap request berdiri sendiri, server tidak menyimpan informasi session
- **Client-Server**: Frontend dan backend terpisah, bisa dikembangkan independen
- **Uniform Interface**: Menggunakan HTTP methods standar (GET, POST, PUT, DELETE)
- **Resource-Based**: Setiap data diidentifikasi melalui URL unik

**Contoh penggunaan:**
- `GET /api/todos` - Ambil semua data todos
- `POST /api/todos` - Buat todo baru
- `PUT /api/todos/1` - Update todo dengan id 1
- `DELETE /api/todos/1` - Hapus todo dengan id 1

REST API memungkinkan berbagai aplikasi (web, mobile, desktop) mengakses data yang sama melalui interface yang konsisten.

### 2. Apa itu CORS dan bagaimana cara menanganinya di backend?

CORS (Cross-Origin Resource Sharing) adalah fitur keamanan browser yang mengontrol akses antar domain. Browser secara otomatis memblokir request dari satu domain ke domain lain untuk mencegah serangan berbahaya.

**Kapan CORS menjadi masalah:**
- Frontend di `http://localhost:3000` (Next.js)
- Backend di `http://localhost:8000` (Laravel)
- Browser menolak request karena port berbeda

**Solusi di Laravel:**

Laravel menyediakan konfigurasi CORS built-in di file `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => false,
```

Konfigurasi ini memberitahu Laravel untuk menerima request dari frontend dan menambahkan header CORS yang diperlukan ke response.

### 3. Jelaskan perbedaan antara SQL dan NoSQL database!

**SQL Database (Relational)**
- Struktur data terorganisir dalam tabel dengan baris dan kolom
- Schema tetap - struktur harus didefinisikan sebelumnya
- Mendukung relasi kompleks antar tabel dengan Foreign Keys
- Menggunakan bahasa SQL untuk query
- Mendukung ACID transactions (Atomicity, Consistency, Isolation, Durability)
- Scaling vertikal (upgrade hardware)
- Contoh: MySQL, PostgreSQL, SQL Server

**NoSQL Database (Non-Relational)**
- Struktur data fleksibel: document, key-value, graph, atau column-family
- Schema dinamis - struktur bisa berubah kapan saja
- Relasi terbatas, data sering di-denormalisasi
- Query language berbeda-beda tergantung database
- Beberapa mendukung ACID, beberapa prioritas performa
- Scaling horizontal (tambah server)
- Contoh: MongoDB, Redis, Cassandra, DynamoDB

**Kapan menggunakan SQL:**
- Data terstruktur dengan relasi jelas
- Membutuhkan transaksi ACID yang ketat
- Query kompleks dengan JOIN

**Kapan menggunakan NoSQL:**
- Data tidak terstruktur atau sering berubah
- Membutuhkan skalabilitas horizontal
- Performa tinggi untuk operasi read/write

### 4. Apa yang Anda ketahui tentang middleware?

Middleware adalah layer perantara yang memproses HTTP request sebelum mencapai controller atau setelah controller menghasilkan response. Bayangkan middleware sebagai "security checkpoint" yang memeriksa setiap request yang masuk.

**Fungsi utama middleware:**
- **Authentication & Authorization**: Cek apakah user sudah login dan punya akses
- **Logging**: Catat setiap request untuk monitoring
- **CORS Handling**: Tambahkan header CORS untuk cross-origin requests
- **Rate Limiting**: Batasi jumlah request dari satu IP
- **Input Validation**: Validasi data sebelum masuk ke controller

**Cara kerja middleware:**
```
Request → Middleware 1 → Middleware 2 → Controller → Middleware 2 → Middleware 1 → Response
```

**Contoh middleware di Laravel:**
```php
public function handle($request, Closure $next)
{
    if (!Auth::check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }
    
    return $next($request);
}
```

**Jenis middleware di Laravel:**
- **Global Middleware**: Jalan untuk semua request
- **Route Middleware**: Jalan untuk route tertentu saja
- **Middleware Groups**: Kumpulan middleware (contoh: 'web', 'api')

Middleware membantu menjaga keamanan aplikasi dan memisahkan logic authentication dari business logic di controller.

## Status Implementasi

✅ **Backend Laravel**: Running di `http://localhost:8000`
- MySQL database dengan relasi yang proper
- Laravel Sanctum authentication
- CORS dikonfigurasi untuk frontend
- API endpoints lengkap (register, login, CRUD todos)

✅ **Frontend Next.js**: Running di `http://localhost:3000`
- Dark theme dengan Tailwind CSS
- Authentication flow lengkap
- CRUD operations untuk todos
- Axios dikonfigurasi untuk Laravel backend

✅ **Integrasi**: Frontend dan Laravel backend terintegrasi penuh

---

## Struktur Project

```
/
├── backend/          # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── AuthController.php
│   │   │   └── TodoController.php
│   │   └── Models/
│   │       ├── User.php
│   │       └── Todo.php
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php
│   └── config/
├── frontend/         # Next.js App
│   ├── app/
│   │   ├── login/
│   │   ├── dashboard/
│   │   └── globals.css
│   ├── lib/
│   │   └── axios.ts
│   └── ...
└── README.md
```

```
/
├── backend/          # Laravel API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
├── frontend/         # Next.js App
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

---

## Tech Stack

### Backend
- Laravel 10
- MySQL Database
- Laravel Sanctum (Authentication)

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios

---

## Setup Instructions

Lihat dokumentasi lengkap di bawah untuk instalasi dan konfigurasi.


---

## Cara Menjalankan Aplikasi

### Prerequisites
- PHP >= 8.1
- Composer
- Node.js >= 18
- MySQL
- Git

### Backend Setup (Laravel)

1. **Masuk ke folder backend:**
   ```cmd
   cd backend
   ```

2. **Install dependencies:**
   ```cmd
   composer install
   ```

3. **Copy file environment:**
   ```cmd
   copy .env.example .env
   ```

4. **Generate application key:**
   ```cmd
   php artisan key:generate
   ```

5. **Buat database MySQL:**
   ```sql
   CREATE DATABASE todo_app_project;
   ```

6. **Konfigurasi database di file `.env`:**
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=todo_app_project
   DB_USERNAME=root
   DB_PASSWORD=
   ```

7. **Jalankan migrasi:**
   ```cmd
   php artisan migrate
   ```

8. **Jalankan server Laravel:**
   ```cmd
   php artisan serve
   ```
   Backend akan berjalan di: `http://localhost:8000`

### Frontend Setup (Next.js)

1. **Buka terminal baru dan masuk ke folder frontend:**
   ```cmd
   cd frontend
   ```

2. **Install dependencies:**
   ```cmd
   npm install
   ```

3. **Jalankan development server:**
   ```cmd
   npm run dev
   ```
   Frontend akan berjalan di: `http://localhost:3000`

---

## API Endpoints

### Authentication
- `POST /api/register` - Register user baru
- `POST /api/login` - Login dan dapatkan token
- `POST /api/logout` - Logout (protected)

### Todos (Protected Routes)
- `GET /api/todos` - Ambil semua todos milik user
- `POST /api/todos` - Buat todo baru
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Hapus todo

---

## Fitur Keamanan

**Authentication dengan Laravel Sanctum:**
Token-based authentication yang aman dan mudah digunakan. Setiap request ke protected route harus menyertakan Bearer token.

**Authorization:**
User hanya bisa melihat, edit, dan hapus todos miliknya sendiri. Sistem validasi ownership di setiap endpoint memastikan data privacy.

**CORS Configuration:**
Backend dikonfigurasi khusus untuk menerima request dari `http://localhost:3000` dengan header yang tepat.

**Input Validation:**
Semua input divalidasi di backend dengan Laravel validation rules. Error handling yang jelas memberikan feedback yang berguna.

---

## Struktur Database

### Table: users
- id (bigint, primary key)
- name (varchar)
- email (varchar, unique)
- password (varchar, hashed)
- created_at (timestamp)
- updated_at (timestamp)

### Table: todos
- id (bigint, primary key)
- user_id (bigint, foreign key → users.id, cascade on delete)
- title (varchar)
- descriptions (text, nullable)
- is_done (boolean, default: false)
- created_at (timestamp)
- updated_at (timestamp)

---

## Testing API dengan Postman/Thunder Client

### 1. Register
```
POST http://localhost:8000/api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### 2. Login
```
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response akan berisi `token` yang harus disimpan.

### 3. Get Todos
```
GET http://localhost:8000/api/todos
Authorization: Bearer {your_token_here}
```

### 4. Create Todo
```
POST http://localhost:8000/api/todos
Authorization: Bearer {your_token_here}
Content-Type: application/json

{
  "title": "Belajar Laravel",
  "descriptions": "Pelajari Laravel Sanctum dan API"
}
```

### 5. Update Todo
```
PUT http://localhost:8000/api/todos/1
Authorization: Bearer {your_token_here}
Content-Type: application/json

{
  "is_done": true
}
```

### 6. Delete Todo
```
DELETE http://localhost:8000/api/todos/1
Authorization: Bearer {your_token_here}
```

---

## Teknologi yang Digunakan

### Backend
- **Laravel 10+**: PHP framework untuk REST API
- **Laravel Sanctum**: Token-based authentication
- **MySQL**: Relational database
- **Eloquent ORM**: Database abstraction layer

### Frontend
- **Next.js 14**: React framework dengan App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client dengan interceptors

---

## Best Practices yang Diterapkan

**Separation of Concerns:**
Controller fokus pada HTTP logic, Model handle database operations, Middleware menangani authentication. Setiap komponen punya tanggung jawab yang jelas.

**Security First:**
Password di-hash dengan bcrypt, token-based authentication, CORS protection, input validation ketat, dan authorization checks di setiap endpoint.

**Code Organization:**
Struktur monorepo yang rapi, folder structure yang jelas, Axios instance yang reusable, dan TypeScript interfaces untuk type safety.

**User Experience:**
Loading states yang informatif, error handling yang user-friendly, responsive design yang smooth, dark theme yang nyaman, dan UI yang intuitif.

---

## Troubleshooting

**Database Connection Error**
Pastikan MySQL sudah running dan database `todo_app_project` sudah dibuat. Cek kredensial di file `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app_project
DB_USERNAME=root
DB_PASSWORD=
```

**401 Unauthorized**
Cek apakah token tersimpan di localStorage, token dikirim di header Authorization, dan user sudah login dengan benar.

**CORS Error**
Verifikasi konfigurasi `config/cors.php` di Laravel sudah sesuai dengan domain frontend yang digunakan.

---

## License

This project is created for technical test purposes.
