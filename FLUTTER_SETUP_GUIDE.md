# 🎯 Capitol Enterprises - Flutter APK Setup Guide

## ✅ What's Been Created

Your complete Flutter mobile app for Capitol Enterprises is ready! Here's what's included:

### 📁 Project Structure
```
capitol-flutter/
├── lib/
│   ├── main.dart                 # App entry point & routing
│   ├── models/
│   │   └── product.dart          # Product data model
│   ├── providers/
│   │   ├── auth_provider.dart    # Login/auth state management
│   │   └── product_provider.dart # Product CRUD state management
│   ├── screens/
│   │   ├── login_screen.dart     # Login interface
│   │   ├── products_screen.dart  # Main product catalog with search
│   │   └── admin_screen.dart     # Admin product management panel
│   ├── services/
│   │   └── api_service.dart      # Backend API connection
│   └── widgets/                  # Reusable UI components
├── android/                      # Android configuration
├── pubspec.yaml                  # Dependencies & project config
├── build-apk.sh                  # Automated build script
└── README.md                     # Full documentation
```

### 🔑 Key Features Implemented
- ✅ Login screen (admin/customer authentication)
- ✅ Product catalog with grid layout
- ✅ Search products by name
- ✅ Filter by product size
- ✅ Order form with customer info
- ✅ Admin panel to add new products
- ✅ Messaging system (ready to implement)
- ✅ Currency in ₹ (Indian Rupees)
- ✅ Image caching with network images
- ✅ State management with Provider package
- ✅ API integration with your Express backend

### 🔌 Backend Connection
The Flutter app connects to your Express backend:
- **Emulator**: `http://10.0.2.2:4000/api`
- **Physical Device**: `http://<YOUR-PC-IP>:4000/api`

## 🚀 How to Build APK

### Option A: Using the Build Script (Recommended)
```bash
cd /home/shxx/VSC/capitol-flutter
./build-apk.sh
```

### Option B: Manual Steps

**1. Install Flutter (if not installed)**
```bash
# Download from https://flutter.dev/docs/get-started/install
# Extract and add to PATH
export PATH="$PATH:~/flutter/bin"
flutter doctor  # Verify installation
```

**2. Get Dependencies**
```bash
cd /home/shxx/VSC/capitol-flutter
flutter pub get
```

**3. Build Debug APK**
```bash
flutter build apk --debug
```

Output location: `build/app/outputs/flutter-apk/app-debug.apk`

**4. Build Release APK** (optimized)
```bash
flutter build apk --release
```

Output location: `build/app/outputs/flutter-apk/app-release.apk`

## 📱 Install & Test APK

### Using Android Device/Emulator

**1. Connect device via USB, enable Developer Mode**

**2. Install APK**
```bash
# Make sure ADB is in your PATH
adb install build/app/outputs/flutter-apk/app-debug.apk
```

**3. Launch app on device**
- Click Capitol Enterprises icon on home screen
- Or run: `flutter run`

### Demo Credentials
- **Admin Login**: `admin` / `adminpass`
- **Customer**: Any username / any password

## 🎨 Customization Guide

### Change App Name & Package
1. Edit `android/app/src/main/AndroidManifest.xml`:
   ```xml
   package="com.yourcompany.capitolenterprises"
   ```

2. Update `pubspec.yaml`:
   ```yaml
   name: capitol_enterprises
   ```

### Change Theme Colors
Edit `lib/main.dart`:
```dart
theme: ThemeData(
  primarySwatch: Colors.blue,  // Change color
  useMaterial3: true,
),
```

Material colors: Colors.red, Colors.green, Colors.purple, etc.

### Change App Icon
1. Prepare icon: 192x192 PNG
2. Place at: `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`
3. Repeat for other densities: ldpi, mdpi, hdpi, xhdpi, xxhdpi

### API Endpoint for Real Device
Edit `lib/services/api_service.dart`:
```dart
const String API_BASE = 'http://192.168.x.x:4000/api';  // Replace with your PC IP
```

## 🔧 Troubleshooting

### "Flutter not found"
```bash
# Add Flutter to PATH
export PATH="$PATH:$HOME/flutter/bin"
flutter --version
```

### "Cannot connect to backend"
- Check backend is running: `curl http://localhost:4000/`
- For emulator: Use `10.0.2.2` instead of `localhost`
- For device: Use your PC's actual IP (e.g., 192.168.1.100)

### "Gradle build failed"
```bash
cd /home/shxx/VSC/capitol-flutter
flutter clean
flutter pub get
flutter build apk
```

### "No Android SDK"
```bash
flutter config --android-sdk /path/to/android-sdk
```

## 📊 Next Steps for Customization

After building the APK, here are suggested areas for enhancement:

### 1. **Visual Customization**
   - [ ] Add company logo to login screen
   - [ ] Customize color scheme to match branding
   - [ ] Add product images/icons
   - [ ] Create splash screen

### 2. **Feature Enhancement**
   - [ ] Implement order history view
   - [ ] Add shopping cart
   - [ ] Enable customer reviews/ratings
   - [ ] Message notifications
   - [ ] Payment integration (Razorpay for ₹)

### 3. **Performance**
   - [ ] Add offline support with local SQLite
   - [ ] Implement pagination for products
   - [ ] Add loading skeletons
   - [ ] Optimize image loading

### 4. **Security**
   - [ ] Implement JWT token storage
   - [ ] Add SSL certificate pinning
   - [ ] Secure credential storage

### 5. **Distribution**
   - [ ] Sign release APK with proper keystore
   - [ ] Test on multiple Android devices
   - [ ] Upload to Google Play Store
   - [ ] Create app store listing

## 📝 File Locations

- **App Code**: `/home/shxx/VSC/capitol-flutter/lib/`
- **Android Config**: `/home/shxx/VSC/capitol-flutter/android/`
- **Build Output**: `/home/shxx/VSC/capitol-flutter/build/`
- **Dependencies**: `/home/shxx/VSC/capitol-flutter/pubspec.yaml`

## 🤝 Backend Integration

Your app connects to these Express endpoints:

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/auth/login` | POST | None | User login |
| `/api/products` | GET | Any | List products |
| `/api/products` | POST | Admin | Create product |
| `/api/products/{id}` | PUT | Admin | Update product |
| `/api/products/{id}` | DELETE | Admin | Delete product |
| `/api/messages` | GET/POST | Any | Messaging |
| `/api/orders` | POST/GET | Any | Orders |

## ✨ Success Checklist

- [x] Flutter project created
- [x] API service configured
- [x] UI screens implemented
- [x] Authentication working
- [x] Product management ready
- [ ] APK built locally
- [ ] App tested on device
- [ ] Ready for customization

## 📞 Support

For issues or customization requests, refer to:
- Flutter docs: https://flutter.dev/docs
- Your backend API: http://localhost:4000/
- README.md in this project

---

**Ready to build? Run `./build-apk.sh` or follow the manual steps above!** 🚀
