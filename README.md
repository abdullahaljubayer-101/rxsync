# 💊 RxSync

![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-54-000020?style=flat-square&logo=expo&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=flat-square&logo=appwrite&logoColor=white)
![OpenAI](https://img.shields.io/badge/GPT--4o-412991?style=flat-square&logo=openai&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

**RxSync** turns a photo of a paper prescription into a digital medicine schedule. 📸 ➜ 💊

Snap a picture of your prescription (handwritten ones too), and the app uses **GPT-4o vision** to pull out the doctor, the hospital and every medicine with its dose times. From there you get a daily medicine dashboard, reminders, a medical history, and you can even order the medicines and get a PDF invoice.

---

## ✨ Features

### 📸 Scan a prescription
- Take a photo with the in-app **camera**
- The image is compressed and sent to an **Appwrite Function** that asks **GPT-4o** to read it
- AI extracts: **hospital name**, **doctor name** and each **medicine** with its dose times (*morning / noon / night*) and *before / after meal*
- **Review and edit** the result before saving, because AI isn't perfect

### 📅 Dashboard
- A **calendar** plus today's medicine list, sorted by morning → noon → night
- In-app **medication reminders** that list the doses you still have to take

### 🗂️ Medical history
- Every saved prescription in one place
- Open any prescription to see its full details

### 🛒 Order medicine
- Pick medicines from your saved prescriptions and set quantities
- Live **total** (demo prices)
- Generates an **invoice PDF** you can download or share

### 🔐 Auth
- Sign up, log in and log out with **Appwrite Auth**
- **Forgot password** flow with an email verification link

## 🧠 How the AI part works

```text
📱 Camera photo
   └─► expo-image-manipulator (resize + compress, base64)
        └─► Appwrite Function: analyze_prescription (Python)
             └─► OpenAI GPT-4o (vision) → strict JSON
                  └─► Edit & confirm screen
                       └─► Appwrite Database
```

The function asks for JSON only, in a fixed shape:

```json
{
  "hospital_name": "…",
  "doctor_name": "…",
  "medications": [
    { "name": "…", "doses_time_01": ["morning", "night"], "doses_time_02": "after meal" }
  ]
}
```

## 🛠️ Tech stack

| Area | Tools |
| ---- | ----- |
| App | React Native, Expo SDK 54, Expo Router |
| UI | NativeWind (Tailwind CSS), React Native Calendars, Expo Vector Icons |
| Device | Expo Camera, Image Manipulator, Notifications, Print, Sharing, File System |
| Backend | Appwrite (Auth, Database, Functions) |
| AI | OpenAI GPT-4o via a Python Appwrite Function |

## 🚀 Getting started

### 1. Clone and install

```bash
git clone https://github.com/abdullahaljubayer-101/rxsync.git
cd rxsync
npm install
```

### 2. Set up Appwrite

1. Create a project on [Appwrite Cloud](https://cloud.appwrite.io).
2. Create a **database**, a **collection** for prescriptions and a **storage bucket** (the bucket is for saving prescription images, which is still turned off in the code).
3. Deploy the function in `lib/appwrite/function/analyze_prescription/` (Python runtime) and add `OPENAI_API_KEY` as an environment variable on the function.
4. Put your own IDs in `lib/appwrite/config.js` (`projectId`, `databaseId`, `collectionId`, `functionId`, `bucketId`).

### 3. Run it

```bash
npx expo start
```

Scan the QR code with **Expo Go**, or press `a` for Android / `i` for iOS.

## 📁 Project structure

```text
app/
├── index.jsx                # Entry / redirect
├── auth/                    # Login, sign up, forgot password
├── home/
│   ├── index.jsx            # Dashboard + calendar + reminders
│   ├── camera/              # Capture → confirm → edit prescription
│   ├── medical_history/     # Saved prescriptions
│   ├── order_medicine/      # Cart + invoice PDF
│   └── notifications.jsx
└── (component)/             # List items used across screens
context/AuthContext.js       # Logged-in user state
lib/appwrite/                # Appwrite client, auth helpers, AI function
```

---

Made by **Abdullah Al Jubayer** · [GitHub](https://github.com/abdullahaljubayer-101) · [Portfolio](https://abdullahaljubayer.com)
