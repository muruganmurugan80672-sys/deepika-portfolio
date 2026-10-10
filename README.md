# Deepika | Full-Stack Developer Portfolio

A production-ready personal portfolio web application built with the **Midnight Executive** design system, featuring a **React + TypeScript + Bootstrap** frontend, a **Node.js + Express + TypeScript** REST API server, **MongoDB** database persistence, and interactive **Swagger (OpenAPI 3)** documentation.

---

## 🌟 Visual Theme & Design System

The application uses the custom **Midnight Executive** visual identity:
- **Primary Background**: `#080D19` (Deep Navy)
- **Secondary Background**: `#0E1628` (Subtle Charcoal Navy)
- **Elevated Surface**: `#121D32` (Elevated Navy Panel)
- **Primary Accent**: `#5B8CFF` (Electric Royal Blue)
- **Secondary Accent**: `#73D5FF` (Cyan Accent)
- **Typography**: Space Grotesk (Headings) and Inter (Body)
- **Interactive Light/Dark Theme**: Complete coordinated light mode switch with smooth state transitions.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Bootstrap 5, React Bootstrap, Lucide React, Axios, React Router v6 |
| **Build Tool** | Vite |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB with Mongoose ODM |
| **API Docs** | Swagger UI (`swagger-ui-express` & `swagger-jsdoc`) |
| **Security & Validation** | `express-rate-limit`, `express-validator`, CORS, API Key Auth |

---

## 📁 Project Architecture & Folder Structure

```
portfolio/
├── client/                      # React Frontend Application
│   ├── public/                  # Favicon & Static assets
│   ├── src/
│   │   ├── assets/              # Visual assets & icons
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── SkillGroup.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   └── ErrorState.tsx
│   │   ├── pages/               # Views & Route Components
│   │   │   ├── Home.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── ProjectDetails.tsx
│   │   │   ├── About.tsx
│   │   │   └── NotFound.tsx
│   │   ├── sections/            # Homepage Sections
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   ├── CertificationsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── services/            # Axios API service layer
│   │   │   └── api.ts
│   │   ├── hooks/               # Custom React hooks (useTheme)
│   │   ├── types/               # TypeScript Interfaces
│   │   ├── styles/              # Design System CSS
│   │   │   ├── variables.css
│   │   │   ├── global.css
│   │   │   └── components.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example             # Frontend environment template
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                      # Express REST API Server
│   ├── src/
│   │   ├── config/              # Mongoose DB connection module
│   │   │   └── database.ts
│   │   ├── controllers/         # Endpoint logic controllers
│   │   ├── models/              # Mongoose Schemas
│   │   │   ├── Project.ts
│   │   │   ├── Skill.ts
│   │   │   ├── ContactMessage.ts
│   │   │   ├── Education.ts
│   │   │   └── Certification.ts
│   │   ├── routes/              # Express Router modules
│   │   ├── middleware/          # Auth, Rate Limiter, Error Handler
│   │   ├── validators/          # Input validation schemas
│   │   ├── app.ts               # Express App setup
│   │   ├── server.ts            # Server entry point
│   │   ├── swagger.ts           # Swagger OpenAPI 3.0 spec
│   │   └── seed.ts              # Data seeder script
│   ├── .env.example             # Backend environment template
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── .gitignore
```

---

## 🚀 Environment Variables Setup

### Server Configuration (`server/.env`)
Create `server/.env` with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/deepika_portfolio
CLIENT_ORIGIN=http://localhost:5173
ADMIN_API_KEY=deepika_admin_secret_key_2026_x89a
NODE_ENV=development
```

### Client Configuration (`client/.env`)
Create `client/.env` with:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 💻 Running the Application Locally

### Prerequisites
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later
- **MongoDB**: Local MongoDB community instance or MongoDB Atlas Connection URI

---

### Step 1: Start the Backend Server

```bash
cd server
npm install
npm run seed     # Populate sample projects, skills, education, & certifications
npm run dev      # Starts development server at http://localhost:5000
```

- **Health Check Endpoint**: `http://localhost:5000/api/health`
- **Swagger Documentation**: `http://localhost:5000/api-docs`

---

### Step 2: Start the Frontend Application

Open a second terminal window:

```bash
cd client
npm install
npm run dev      # Starts Vite dev server at http://localhost:5173
```

Navigate to `http://localhost:5173` in your browser.

---

## 🔌 REST API Reference

### Health
- `GET /api/health` - Server and MongoDB status report.

### Projects
- `GET /api/projects` - Retrieve published projects (Optional query parameters: `category`, `featured`).
- `GET /api/projects/:id` - Retrieve project details by ObjectId.
- `POST /api/projects` - Create project (**Admin Key required**).
- `PUT /api/projects/:id` - Update project (**Admin Key required**).
- `DELETE /api/projects/:id` - Delete project (**Admin Key required**).

### Skills
- `GET /api/skills` - Get categorized technical skills.
- `POST /api/skills` - Create skill (**Admin Key required**).

### Education
- `GET /api/education` - Get academic qualifications timeline.
- `POST /api/education` - Create education record (**Admin Key required**).

### Certifications
- `GET /api/certifications` - Get certifications and courses.
- `POST /api/certifications` - Add certification (**Admin Key required**).

### Contact
- `POST /api/contact` - Submit message with rate limiting and server validation.
- `GET /api/contact` - Get received messages (**Admin Key required**).

---

## 🔐 Administrator Authentication

Administrative endpoints require the HTTP header:
```http
x-admin-key: deepika_admin_secret_key_2026_x89a
```
You can configure your custom secret key in `server/.env` using the `ADMIN_API_KEY` environment variable.

---

## 🧪 Testing & Production Builds

### Build Backend TypeScript:
```bash
cd server
npm run build
npm start
```

### Build Frontend Bundle:
```bash
cd client
npm run build
npm run preview
```

---

## 📝 License
This project is open-source under the MIT License.
