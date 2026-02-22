# Capitol Enterprises — Complete Full-Stack App

Full-featured e-commerce platform with Web Frontend, Mobile App, and RESTful Backend.

## 📁 Project Structure

```
/home/shxx/VSC/
├── backend/              # Express.js API server (port 4000)
│   ├── index.js          # Main server with all endpoints
│   ├── db.js             # SQLite database setup
│   ├── package.json      # Dependencies
│   └── uploads/          # Product image storage
│
├── frontend/             # React + Vite web app (port 5173)
│   ├── src/
│   │   ├── main.jsx      # App entry
│   │   ├── App.jsx       # Router & layout
│   │   ├── api.js        # Backend integration
│   │   ├── pages/        # Login, Products, Admin
│   │   └── styles.css    # Styling
│   └── package.json
│
├── capitol-flutter/      # Flutter mobile app (APK ready)
│   ├── lib/              # Dart source code
│   ├── android/          # Android configuration
│   ├── pubspec.yaml      # Dependencies
│   ├── build-apk.sh      # Build script
│   └── README.md         # Flutter docs
│
├── FLUTTER_SETUP_GUIDE.md    # Complete Flutter guide
├── APK_BUILD_SOLUTIONS.md    # Build alternatives
├── Dockerfile                # Docker build option
└── .github/workflows/        # GitHub Actions CI/CD
```

## 🚀 Quick Start

### Start Backend & Frontend Together

```bash
# Terminal 1: Backend
cd backend
npm install
npm start
# Output: API server listening on 4000

# Terminal 2: Frontend  
cd frontend
npm install
npm run dev
# Output: Local: http://localhost:5173/
```

**Access:**
- Frontend: http://localhost:5173
- API: http://localhost:4000

**Demo Credentials:**
- Admin: `admin` / `adminpass`
- Customer: Any username / password

---

## 📱 Build Mobile App (Flutter)

The Flutter app is **complete and ready to build**. Choose one option:

### Option 1: GitHub Actions (Recommended) ⭐
1. Push to GitHub
2. GitHub automatically builds APK
3. Download from Actions → Artifacts

See [APK_BUILD_SOLUTIONS.md](APK_BUILD_SOLUTIONS.md) for details.

### Option 2: Local Docker Build
```bash
docker build -t capitol-flutter .
docker run -it --rm -v $(pwd)/output:/output capitol-flutter:latest
```
APK will be in `./output/app-debug.apk`

### Option 3: Direct Build (macOS/Ubuntu/Windows)
```bash
cd capitol-flutter
./build-apk.sh
```

See [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md) for detailed setup.

---

## 🎯 Features Implemented

### Web Frontend (React)
- ✅ Product catalog with grid layout
- ✅ Search & filter by size
- ✅ Shopping cart & ordering
- ✅ Customer-admin messaging
- ✅ Admin product management (CRUD)
- ✅ Image upload support
- ✅ ₹ Currency (Indian Rupees)
- ✅ Responsive design

### Mobile App (Flutter)
- ✅ Native Android app (APK)
- ✅ Login system (admin/customer)
- ✅ Product catalog
- ✅ Order system
- ✅ Admin panel
- ✅ Messaging interface
- ✅ Search & filtering
- ✅ Material Design UI

### Backend (Express.js)
- ✅ RESTful API with CORS
- ✅ SQLite persistent database
- ✅ Image upload with Multer
- ✅ Token-based auth
- ✅ Product CRUD operations
- ✅ Order management
- ✅ Messaging system
- ✅ API error handling

---

## 📚 API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/auth/login` | None | User login |
| GET | `/api/products` | Any | List products |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |
| GET | `/api/messages` | Any | Get messages |
| POST | `/api/messages` | Any | Send message |
| POST | `/api/orders` | Any | Place order |
| GET | `/api/orders` | Admin | View orders |
| POST | `/api/upload` | Admin | Upload image |

---

## 📦 Tech Stack

### Frontend
- React 18
- Vite 5.4
- React Router v6
- Axios

### Backend
- Express.js
- SQLite3
- Multer (file upload)
- CORS enabled

### Mobile
- Flutter (Dart)
- Provider (state management)
- HTTP package
- Cached network images

---

## 🎨 Customization

### Change Theme Colors
Edit `frontend/src/styles.css` or `capitol-flutter/lib/main.dart`

### Change API Endpoint
Edit backend URL in:
- Frontend: `frontend/src/api.js`
- Flutter: `capitol-flutter/lib/services/api_service.dart`

### Add Company Branding
- Logo: Place in `frontend/public/` and `capitol-flutter/assets/`
- Colors: Update color schemes in theme config
- Icon: Update app icons in Android manifest

### Enable Production
1. Build release APK: `flutter build apk --release`
2. Deploy backend: Use production server (AWS, Heroku, etc.)
3. Build optimized frontend: `npm run build`
4. Set proper SSL certificates

---

## 🧪 Development

### Backend Development
```bash
cd backend
npm run dev    # With nodemon auto-reload
npm start      # Production
```

### Frontend Development
```bash
cd frontend
npm run dev    # Vite dev server
npm run build  # Production build
```

### Flutter Development
```bash
cd capitol-flutter
flutter run              # Run on device
flutter run -d chrome   # Run on web (experimental)
flutter build apk       # Build APK
```

---

## 📊 Database

SQLite database stored at: `/home/shxx/VSC/backend/data.sqlite`

### Tables
- **products** (id, name, description, price, image, sizes)
- **messages** (id, sender, message, timestamp)
- **orders** (id, productId, quantity, size, email, phone, timestamp)

Initialize database: Automatic on first backend start

---

## 🔐 Security Features

- ✅ Token-based authentication
- ✅ Bearer token in headers
- ✅ Role-based access (admin/customer)
- ✅ CORS protection
- ✅ File upload restrictions (images only)
- ✅ Input validation

For production:
- [ ] Use HTTPS/SSL
- [ ] Implement JWT with expiration
- [ ] Add rate limiting
- [ ] Use secure password hashing (bcrypt)
- [ ] Enable HTTPS certificate pinning

---

## 📱 Run on Android

After building APK:

```bash
# Connect device via USB
adb devices

# Install APK
adb install capitol-flutter/build/app/outputs/flutter-apk/app-debug.apk

# Run specific device
adb -s <device-id> install app.apk

# View logs
adb logcat
```

---

## 📝 File Guides

- [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md) - Detailed Flutter setup & customization
- [APK_BUILD_SOLUTIONS.md](APK_BUILD_SOLUTIONS.md) - Build alternatives & troubleshooting
- [Dockerfile](Dockerfile) - Docker build configuration
- [.github/workflows/build-apk.yml](.github/workflows/build-apk.yml) - GitHub Actions CI/CD

---

## ✅ Deployment Checklist

- [ ] Backend deployed to cloud server
- [ ] Frontend built and served
- [ ] Mobile app APK signed and ready
- [ ] SSL/HTTPS configured
- [ ] Database backed up
- [ ] Environment variables set
- [ ] Error logging enabled
- [ ] Testing completed

---

## 🆘 Troubleshooting

### Backend won't start
```bash
cd backend
npm install
npm start
```

### Frontend won't connect to backend
- Check backend is running: `curl http://localhost:4000/api/products`
- Check API URL in `frontend/src/api.js`

### Flutter build fails
- See [APK_BUILD_SOLUTIONS.md](APK_BUILD_SOLUTIONS.md)
- Run `flutter doctor` to diagnose
- Check [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md)

### Image upload issues
- Check `backend/uploads/` folder exists
- Verify file permissions
- Check file size and format (JPEG/WebP)

---

## 📞 Support Resources

- Flutter: https://flutter.dev/docs
- Express: https://expressjs.com/
- React: https://react.dev/
- SQLite: https://www.sqlite.org/

---

## 🎁 What's Included

✅ **Complete Frontend** (React)
- 3 pages (Login, Products, Admin)
- Product catalog with search
- Order form
- Admin panel
- Messaging UI

✅ **Complete Backend** (Express)
- 7 API endpoints
- SQLite database
- Image upload
- Auth tokens
- Error handling

✅ **Complete Mobile App** (Flutter)
- 3 screens (Login, Products, Admin)
- Full API integration
- State management
- Native Android app

✅ **Ready to Deploy**
- Docker support
- GitHub Actions CI/CD
- Build scripts
- Setup guides

---

## 🚀 Next Steps

1. **Customize Theme**: Update colors and branding
2. **Deploy Backend**: Move to production server
3. **Deploy Frontend**: Build and host (Vercel, Netlify)
4. **Build APK**: Use one of the build methods
5. **App Store**: Submit to Google Play Store
6. **Marketing**: Create store listings
7. **Feedback**: Gather user feedback & iterate

---

**Ready to build? Start with:** 
```bash
cd backend && npm start &
cd frontend && npm run dev
```

Then visit http://localhost:5173 🎉
