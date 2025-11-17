# markopolo.ai-assaignment


Pre-Requisites
Node.js: v22.14.0 (Download)
npm: comes with Node.js
Optional: Postman for API testing

create .env file

## Backend Application

Folder: backend/
Setup & Run:

Navigate to backend folder:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```

Run the backend server:
```bash
npm run dev
```

The server runs on http://localhost:8080
 (adjust if needed in .env).

### Notes:
ES Modules used ("type": "module" in package.json) → __dirname handled with import.meta.url.
Multer handles file uploads, storing images in /uploads.
Static files served via:
```bash
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
```

In-memory store (ImageMemoryStore) keeps track of uploaded files metadata.

## API endpoints:
```bash
POST /image/upload → Upload single image (http://localhost:8080/image/upload)
```
```bash
DELETE image/delete/:id → Delete image by ID (http://localhost:8080/image/delete/:id)
```
```bash
GET /api/upload/images → Fetch all uploaded images
```

## Folder: frontend/

Setup & Run:
Navigate to frontend folder:
```bash
cd frontend
```

## Install dependencies:
```bash
npm install
```
## Start the application:
```bash
npm start
```
Frontend server runs on http://localhost:3000

# Design Choices & Notes

## File Storage
- Files stored on disk (uploads/) for persistence.
- Metadata stored in in-memory store for simplicity. Can be extended to DB.

## Backend
- Written in TypeScript for type safety.
- Uses Express.js + Multer for handling uploads.
- ES Modules (import/export) for modern syntax.

## Frontend
- Uses React.Js and tailwindcss.
- Fetch images dynamically and display them.

## Error Handling
- MulterError handled with descriptive messages.
- Custom errors for upload validation (UploadBadRequestError, UploadNotFoundError).

## Scalability
- Can replace ImageMemoryStore with DB for persistent metadata.
- Can extend Multer to handle multiple files or multiple fields per request.
