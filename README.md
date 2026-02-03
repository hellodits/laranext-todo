# Fullstack Todo App - Technical Test

> **🚀 New here?** Start with [START_HERE.md](START_HERE.md) for quick navigation!

Aplikasi Todo List fullstack menggunakan Laravel (Backend) dan Next.js (Frontend) dengan autentikasi menggunakan Laravel Sanctum.

---

## PHASE 1: Pertanyaan Interview

### 1. Jelaskan apa itu REST API?

REST API (Representational State Transfer Application Programming Interface) adalah arsitektur komunikasi antara client dan server yang menggunakan protokol HTTP. REST API mengikuti prinsip-prinsip berikut:

- **Stateless**: Setiap request dari client ke server harus mengandung semua informasi yang diperlukan untuk memahami request tersebut. Server tidak menyimpan state dari client.
- **Client-Server Architecture**: Pemisahan antara client (frontend) dan server (backend) yang memungkinkan keduanya berkembang secara independen.
- **Uniform Interface**: Menggunakan HTTP methods standar (GET, POST, PUT, DELETE) untuk operasi CRUD.
- **Resource-Based**: Setiap resource (data) diidentifikasi melalui URI/URL yang unik.

Contoh REST API:
- `GET /api/todos` - Mengambil semua data todos
- `POST /api/todos` - Membuat todo baru
- `PUT /api/todos/1` - Mengupdate todo dengan id 1
- `DELETE /api/todos/1` - Menghapus todo dengan id 1

### 2. Apa itu CORS dan bagaimana cara menanganinya di backend?

CORS (Cross-Origin Resource Sharing) adalah mekanisme keamanan browser yang membatasi request HTTP yang dibuat dari satu domain ke domain lain. Ini adalah fitur keamanan untuk mencegah serangan Cross-Site Request Forgery (CSRF).

**Masalah CORS terjadi ketika:**
- Frontend berjalan di `http://localhost:3000` (Next.js)
- Backend berjalan di `http://localhost:8000` (Laravel)
- Browser memblokir request karena berbeda origin (port berbeda)

**Cara menangani CORS di Laravel:**

1. **Menggunakan Laravel CORS Package** (sudah built-in di Laravel 8+):
   - Konfigurasi file `config/cors.php`
   - Set `allowed_origins` untuk mengizinkan domain frontend
   - Set `allowed_methods` untuk HTTP methods yang diizinkan
   - Set `allowed_headers` untuk headers yang diizinkan

2. **Contoh konfigurasi:**
   ```php
   'paths' => ['api/*', 'sanctum/csrf-cookie'],
   'allowed_origins' => ['http://localhost:3000'],
   'allowed_methods' => ['*'],
   'allowed_headers' => ['*'],
   'supports_credentials' => true,
   ```

### 3. Jelaskan perbedaan antara SQL dan NoSQL database!

| Aspek | SQL (Relational) | NoSQL (Non-Relational) |
|-------|------------------|------------------------|
| **Struktur Data** | Terstruktur dalam tabel dengan baris dan kolom | Fleksibel: document, key-value, graph, column-family |
| **Schema** | Schema tetap (fixed schema), harus didefinisikan sebelumnya | Schema dinamis (dynamic schema), fleksibel |
| **Relasi** | Mendukung relasi antar tabel dengan Foreign Keys | Relasi terbatas atau tidak ada, data sering di-denormalisasi |
| **Skalabilitas** | Vertical scaling (upgrade hardware) | Horizontal scaling (tambah server) |
| **Query Language** | SQL (Structured Query Language) | Berbeda-beda tergantung database (MongoDB: JSON-like queries) |
| **ACID Compliance** | Mendukung penuh ACID (Atomicity, Consistency, Isolation, Durability) | Beberapa mendukung, beberapa prioritas pada performa |
| **Contoh** | MySQL, PostgreSQL, SQL Server | MongoDB, Redis, Cassandra, DynamoDB |
| **Use Case** | Aplikasi dengan relasi kompleks, transaksi finansial | Big data, real-time analytics, aplikasi dengan data tidak terstruktur |

**Kapan menggunakan SQL:**
- Data terstruktur dengan relasi yang jelas
- Membutuhkan transaksi ACID yang ketat
- Query kompleks dengan JOIN

**Kapan menggunakan NoSQL:**
- Data tidak terstruktur atau semi-terstruktur
- Membutuhkan skalabilitas horizontal
- Performa tinggi untuk read/write operations
- Struktur data yang sering berubah

### 4. Apa yang Anda ketahui tentang middleware?

Middleware adalah layer perantara yang berada di antara request dan response dalam aplikasi web. Middleware berfungsi sebagai "filter" atau "gatekeeper" yang memproses HTTP request sebelum mencapai controller atau setelah controller menghasilkan response.

**Fungsi Middleware:**

1. **Authentication & Authorization**: Memverifikasi apakah user sudah login dan memiliki hak akses
2. **Logging**: Mencatat setiap request yang masuk
3. **CORS Handling**: Menambahkan headers CORS
4. **Rate Limiting**: Membatasi jumlah request dari satu IP
5. **Input Validation**: Memvalidasi data sebelum masuk ke controller
6. **Response Modification**: Mengubah response sebelum dikirim ke client

**Contoh Middleware di Laravel:**

```php
// Middleware Authentication
public function handle($request, Closure $next)
{
    if (!Auth::check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }
    
    return $next($request);
}
```

**Cara kerja Middleware:**
```
Request → Middleware 1 → Middleware 2 → Controller → Middleware 2 → Middleware 1 → Response
```

**Jenis Middleware di Laravel:**
- **Global Middleware**: Dijalankan untuk setiap request
- **Route Middleware**: Dijalankan untuk route tertentu
- **Middleware Groups**: Kumpulan middleware (contoh: 'web', 'api')

**Contoh penggunaan di Laravel:**
```php
// Di routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/todos', [TodoController::class, 'index']);
    Route::post('/todos', [TodoController::class, 'store']);
});
```

Middleware sangat penting untuk menjaga keamanan, maintainability, dan separation of concerns dalam aplikasi.

## Status Implementasi

✅ **Backend Laravel**: Sudah running di `http://localhost:8000`
- SQLite database (tidak perlu setup MySQL)
- Laravel Sanctum authentication
- CORS dikonfigurasi untuk frontend
- API endpoints lengkap (register, login, CRUD todos)

✅ **Frontend Next.js**: Sudah running di `http://localhost:3000`
- Dark theme dengan Tailwind CSS
- Authentication flow lengkap
- CRUD operations untuk todos
- Axios dikonfigurasi untuk Laravel backend

✅ **Integrasi**: Frontend sudah dikonfigurasi untuk menggunakan Laravel backend

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
│   │   ├── migrations/
│   │   └── database.sqlite
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
- Laravel (Latest)
- MySQL
- Laravel Sanctum (Authentication)

### Frontend
- Next.js (App Router)
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

5. **Jalankan migrasi (SQLite sudah dikonfigurasi):**
   ```cmd
   php artisan migrate
   ```

6. **Jalankan server Laravel:**
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

1. **Authentication dengan Laravel Sanctum:**
   - Token-based authentication
   - Setiap request protected route harus menyertakan Bearer token

2. **Authorization:**
   - User hanya bisa melihat, edit, dan hapus todos miliknya sendiri
   - Validasi ownership di setiap endpoint

3. **CORS Configuration:**
   - Backend dikonfigurasi untuk menerima request dari `http://localhost:3000`
   - Credentials support enabled

4. **Input Validation:**
   - Semua input divalidasi di backend
   - Error handling yang proper

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

1. **Separation of Concerns:**
   - Controller hanya handle HTTP logic
   - Model handle database logic
   - Middleware handle authentication

2. **Security:**
   - Password hashing dengan bcrypt
   - Token-based authentication
   - CORS protection
   - Input validation
   - Authorization checks

3. **Code Organization:**
   - Monorepo structure
   - Clear folder structure
   - Reusable Axios instance
   - TypeScript interfaces

4. **User Experience:**
   - Loading states
   - Error handling
   - Responsive design
   - Dark theme
   - Intuitive UI

---

## Troubleshooting

### CORS Error
Pastikan `config/cors.php` di Laravel sudah dikonfigurasi dengan benar:
```php
'allowed_origins' => ['http://localhost:3000'],
'supports_credentials' => true,
```

### 401 Unauthorized
- Pastikan token disimpan di localStorage
- Pastikan token dikirim di header Authorization
- Pastikan user sudah login

### Database Connection Error
- Pastikan MySQL sudah running
- Pastikan database `todo_app` sudah dibuat
- Pastikan kredensial di `.env` sudah benar

---

## License

This project is created for technical test purposes.
