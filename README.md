
# API User CRUD - Technical Test

Repositori ini berisi source code API User CRUD dan Dockerfile untuk build project ini menjadi Docker Image.




## Tech Stack

**Backend:** Node, Express

**Database:** MongoDB

**Cloud:** Google Compute Engine

**Container :** Docker

**Container Orchestration:** Kubernetes



## Important Link

 - [Submission Document](https://jahiduddin.notion.site/Deall-Backend-Engineer-Test-cfa2d5277eea4483b99c8e4228fff44f)
 - [API Documentation](https://documenter.getpostman.com/view/3903208/2s8YzXteda)
 - [Repository API User Login](https://github.com/abdjahiduddin/TechTestMicroserviceUserLogin)
 - [Repository Kubernetes YAML File](https://github.com/abdjahiduddin/TechTestKubeYaml)


## Packages
- bcryptjs : Hash password sebelum disimpan ke database dan membandingkan hash password yang tersimpan di database dan plain password.
- express : Membangun REST API.
- express-validator : Melakukan validasi dan sanitasi data yang dikirim melalui body request dan path parameter.
- jsonwebtoken : Membuat JWT Token dan melakukan verifikasi JWT Token.
- mongoose : Membuat schema dan model database. Serta melakukan operasi CRUD ke MongoDB.
- babel : Melakukan compile source code javascript agar dapat dijalankan oleh javascript engine versi lama (backwards-compatible).

## Credential
**email:** admin@gmail.com

**password:** admin

## Endpoints
Detail mengenai cara melakukan request dan response yang akan didapatkan dapat dilihat di [API Documentation](https://documenter.getpostman.com/view/3903208/2s8YzXteda).

Perlu diperhatikan jika menjalankan project ini secara lokal maka path tidak perlu diawali dengan /user karena /user hanya digunakan oleh rules Ingress Kubernetes.

Membuat user baru :
```bash
  POST /api/create
```
Mengambil semua users :
```bash
  GET /api/all
```
Mengambil satu user :
```bash
  GET /api/one/:userId
```
Update profile user :
```bash
  PUT /api/profile/:userId
```
Update password user :
```bash
  PUT /api/password/:userId
```
Update tipe user :
```bash
  PUT /api/type/:userId
```
Menghapus user :
```bash
  DELETE /api/delete/:userId
```

## Environment Variables
- MONGODB_URI : URI untuk membuat koneksi ke MongoDB.
- JWT_SECRET : Secret yang digunakan untuk generate dan verifikasi JWT Token.
- NODE_ENV : Production atau Development.
## Run Locally

Clone project

```bash
  git clone https://github.com/abdjahiduddin/TechTestMicroserviceUsers.git
```

Masuk ke directory project 

```bash
  cd TechTestMicroserviceUsers
```

Install dependencies

```bash
  yarn install
```

Menjalankan server dilingkungan development

```bash
  yarn run start-dev
```

Build project menggunakan babel

```bash
  yarn run build
```

Menjalankan server dilingkungan production

```bash
  yarn run start
```
