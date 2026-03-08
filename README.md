# FWU Sathi 🌐

**FWU Sathi** is a social networking platform built specifically for **BSc CSIT students studying at Far-Western University (FWU) and its affiliated colleges**.

The platform allows students to **ask questions, share knowledge, guide juniors, collaborate with peers, and build meaningful academic connections**.

The goal of FWU Sathi is to build a **student-driven support ecosystem** where seniors can help juniors navigate their academic journey, discover opportunities, and learn beyond the classroom.

---
## Project Demo
- Since the project is not deployed online, a video demonstration is available on YouTube.

### Watch Project Demo video
https://youtu.be/ZHAWWw8NYEw?si=zJP2p5goM4tlnOuP

---


# 📌 Project Overview

FWU Sathi was developed as a **Minor Project II for the 7th Semester of BSc CSIT**.

It is a **full-stack MERN application** that provides a social media–like experience for CSIT students where they can interact, learn, and grow together.

The project is divided into two main modules:

• **Client Module** – Frontend application built with React  
• **Server Module** – Backend API built with Node.js and Express

---

# 🚀 Features

## 👤 Student Features

Students can:

- Register and login securely
- Verify their email using **6-digit OTP**
- Reset forgotten password through email verification
- Create posts similar to social media platforms
- Update and delete their own posts
- Like posts
- Comment on posts
- Update or delete their own comments
- Share posts
- Send **real-time group messages**
- Edit or delete their own messages
- Receive **real-time notifications** for posts, comments, and messages
- Search and connect with other CSIT students across Nepal
- Filter students based on:
  - College
  - Semester
  - Location
- Access academic resources including:
  - Notes for all BSc CSIT semesters
  - Past year Question papers
  - Entrance preparation materials
  - Syllabus
- Manage personal profile:
  - Update profile photo
  - Update cover photo
  - Update personal information
  - Add social media links

### Profile Information Includes

- Name
- Semester
- College
- Gender
- Address, etc.

### Social Media Links

- Facebook
- Instagram
- LinkedIn
- Twitter
- YouTube
- Personal Website

All fields include **proper validation**.

---

# 🛡️ Admin Features

Admins have **all student privileges**, plus additional moderation capabilities.

Admins can:

- Delete any post
- Delete any comment
- Delete any message

This helps maintain a **safe, respectful, and healthy community environment**.

---

# 💬 Real-Time Features

Using **Socket.IO**, FWU Sathi supports:

- Real-time group chat
- Live notifications
- Instant updates for messages and activities

---

# 🧠 Technology Stack

## Frontend

- React.js
- Redux (State Management)
- Tailwind CSS
- GSAP (for animations)
- Axios
- Socket.IO Client

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (file uploads)
- Nodemailer (email verification)
- Socket.IO
- CORS
- Cookie Parser
- Dotenv


---

# ⚙️ Running the Project Locally

Follow these steps to run the project on your local machine.

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/bishalbhat2002/FWU-Sathi.git
cd FWU-Sathi
```

---

# 2️⃣ Setup Frontend (Client)

Open terminal and run:

```bash
cd client
npm install
```

Rename the environment file:

```
env → .env
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

# 3️⃣ Setup Backend (Server)

Open **another terminal** and run:

```bash
cd server
npm install
```

Rename the environment file:

```
env → .env
```

---

# 4️⃣ Node Mailer Configuration

This configuration is required for **sending OTP emails for verification and password reset**.

```
# Add your own Node Mailer related data
EMAIL=your-email-from-which-you-want-to-send-email
PASS=your-email-app-password-generated (DONT-USE-REAL-PASSWORD-HERE)
```

⚠️ Important:

- Do **NOT use your real Gmail password**
- Generate a **Gmail App Password**

---

# 👨‍💼 Default Admin Emails

The following emails will automatically get **admin privileges** when they register.

Admins have moderation capabilities such as deleting other users' posts, comments, and messages. Note: You can add only 2 emails as admin.

```
# FWU Sathi Admin Emails
EMAIL_FIRST=firstadmin@gmail.com
EMAIL_SECOND=secondadmin@gmail.com
```

---

# ▶️ Start Backend Server

After setting up the `.env` file, run:

```bash
npm run dev
```

The backend server will start automatically.

---

# 🎯 Purpose of FWU Sathi

FWU Sathi aims to:

- Help juniors learn from seniors
- Encourage knowledge sharing
- Provide study materials in one place
- Build a strong CSIT student community
- Connect students across FWU affiliated colleges

---

# 📚 Academic Context

This project was developed as part of:

**Minor Project II**  
**7th Semester – BSc CSIT**  
**Far-Western University**  
**Mahendranagar, Kanchanpur, Nepal**


---

# 🤝 Contributions

This project was developed primarily for academic purposes. However, suggestions and improvements are always welcome.

You can contribute by:

- Forking the repository
- Creating a new branch
<!-- - Submitting a pull request -->

---

# ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---

# 📁 Project Structure

```
FWU-Sathi/
    ├── client/
    │   ├── public/
    │   │   ├── image.png
    │   │   ├── luffy.png
    │   │   ├── profile-anime-boy.jpeg
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── AuthComponents/
    │   │   │   │   ├── AuthHeader.jsx
    │   │   │   │   ├── ForgotPasswordChange.jsx
    │   │   │   │   ├── LoggedInProtectedRoute.jsx
    │   │   │   │   ├── LoginComponent.jsx
    │   │   │   │   ├── ProtectedRoute.jsx
    │   │   │   │   ├── RegisterComponent.jsx
    │   │   │   ├── commonComponents/
    │   │   │   │   ├── Logo.jsx
    │   │   │   │   ├── Navbar.jsx
    │   │   │   │   ├── ProfilePhoto.jsx
    │   │   │   ├── messageComponents/
    │   │   │   │   ├── DeleteMessageBox.jsx
    │   │   │   │   ├── EditMessageBox.jsx
    │   │   │   │   ├── Message.jsx
    │   │   │   │   ├── MessageHeader.jsx
    │   │   │   │   ├── MessageReportBox.jsx
    │   │   │   │   ├── MessagesBoxContainer.jsx
    │   │   │   │   ├── MessageWrite.jsx
    │   │   │   ├── notifications/
    │   │   │   │   ├── NotificationContainer.jsx
    │   │   │   │   ├── NotificationHeader.jsx
    │   │   │   │   ├── NotificationLink.jsx
    │   │   │   ├── postComponents/
    │   │   │   │   ├── AllPosts.jsx
    │   │   │   │   ├── Comment.jsx
    │   │   │   │   ├── CommentPost.jsx
    │   │   │   │   ├── CreatePost.jsx
    │   │   │   │   ├── CreatePostButton.jsx
    │   │   │   │   ├── DeleteComment.jsx
    │   │   │   │   ├── DeletePost.jsx
    │   │   │   │   ├── EdiPost.jsx
    │   │   │   │   ├── EditComment.jsx
    │   │   │   │   ├── ImageShower.jsx
    │   │   │   │   ├── Post.jsx
    │   │   │   │   ├── ReportComment.jsx
    │   │   │   │   ├── ReportPost.jsx
    │   │   │   │   ├── ViewPost.jsx
    │   │   │   │   ├── WriteComment.jsx
    │   │   │   ├── ProfileComponents/
    │   │   │   │   ├── About.jsx
    │   │   │   │   ├── ChangePassword.jsx
    │   │   │   │   ├── CoverPhoto.jsx
    │   │   │   │   ├── NameInfo.jsx
    │   │   │   │   ├── ProfileEdit.jsx
    │   │   │   │   ├── ProfilePicture.jsx
    │   │   │   │   ├── ProfileViewer.jsx
    │   │   │   │   ├── SocialLinks.jsx
    │   │   │   ├── reportComponents/
    │   │   │   │   ├── ReportHeader.jsx
    │   │   │   │   ├── ReportLink.jsx
    │   │   │   │   ├── ResolveCommentReport.jsx
    │   │   │   │   ├── ResolveMessageReport.jsx
    │   │   │   │   ├── ResolvePostReport.jsx
    │   │   │   ├── SearchComponents/
    │   │   │   │   ├── SearchedUsers.jsx
    │   │   │   │   ├── User.jsx
    │   │   │   │   ├── UserSearchBar.jsx
    │   │   ├── constants/
    │   │   │   ├── csitNotes.js
    │   │   ├── layouts/
    │   │   │   ├── AuthLayout.jsx
    │   │   │   ├── FixPageLayout.jsx
    │   │   │   ├── MainLayout.jsx
    │   │   │   ├── OverlayScreen.jsx
    │   │   │   ├── ResizerLayout.jsx
    │   │   │   ├── ScrollPageLayout.jsx
    │   │   ├── pages/
    │   │   │   ├── Chat.jsx
    │   │   │   ├── Home.jsx
    │   │   │   ├── Login.jsx
    │   │   │   ├── Notes.jsx
    │   │   │   ├── Notification.jsx
    │   │   │   ├── PageNotFound.jsx
    │   │   │   ├── Profile.jsx
    │   │   │   ├── Register.jsx
    │   │   │   ├── Report.jsx
    │   │   │   ├── Search.jsx
    │   │   ├── store/
    │   │   │   ├── features/
    │   │   │   │   ├── message/
    │   │   │   │   │   ├── message.slice.js
    │   │   │   │   │   ├── message.thunk.js
    │   │   │   │   ├── post/
    │   │   │   │   │   ├── post.slice.js
    │   │   │   │   │   ├── post.thunk.js
    │   │   │   │   ├── search/
    │   │   │   │   │   ├── search.slice.js
    │   │   │   │   │   ├── search.thunk.js
    │   │   │   │   ├── socket/
    │   │   │   │   │   ├── socket.slice.js
    │   │   │   │   └── user/
    │   │   │   │       ├── user.slice.js
    │   │   │   │       └── user.thunk.js
    │   │   │   ├── store.js
    │   │   ├── utilities/
    │   │   │   ├── axiosInstance.js
    │   │   │   ├── getImageUrl.js
    │   │   │   ├── getSemName.js
    │   │   │   └── validatePhoto.js
    │   │   ├── App.jsx
    │   │   ├── index.css
    │   │   ├── main.jsx
    │   ├── .env
    │   ├── .gitignore
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── README.md
    │   ├── vite.config.js
    └── server/
        ├── config/
        │   ├── connect.db.js
        ├── controllers/
        │   ├── Message.controller.js
        │   ├── Notification.controller.js
        │   ├── Post.controller.js
        │   ├── Report.controller.js
        │   ├── Search.controller.js
        │   ├── User.controller.js
        ├── middlewares/
        │   ├── auth.middleware.js
        │   ├── GlobalError.middleware.js
        ├── models/
        │   ├── comment.model.js
        │   ├── emailVerification.model.js
        │   ├── like.model.js
        │   ├── message.model.js
        │   ├── notification.model.js
        │   ├── post.model.js
        │   ├── report.model.js
        │   ├── user.model.js
        ├── routes/
        │   ├── message.route.js
        │   ├── notification.route.js
        │   ├── post.route.js
        │   ├── report.route.js
        │   ├── search.route.js
        │   ├── user.route.js
        ├── socket/
        │   ├── socket.js
        ├── utilities/
        │   ├── AsyncHandler.utility.js
        │   ├── Delete.photo.utility.js
        │   ├── EmailVerification.utility.js
        │   ├── ErrorHandler.utility.js
        │   ├── MulterErrorHandler.utility.js
        │   ├── NotificationHandler.utility.js
        │   ├── ObjectIdChecker.utility.js
        │   └── sendMail.js
        ├── uploads/
        ├── .gitignore
        ├── package-lock.json
        ├── package.json
        └── server.js

```