# AI Finance Tracker

A full-stack expense tracking application with AI-powered financial analysis. Track your daily expenses, categorize them, and get intelligent insights powered by AI.

## Features

- **Expense Management**: Create, read, update, and delete expenses
- **Categorization**: Organize expenses into categories (Food, Rent, Transport, Entertainment, Health, Shopping, Utilities, Other)
- **Date Filtering**: View expenses by date range and category
- **AI Analysis**: Get intelligent financial insights and spending pattern analysis
- **Real-time Updates**: Automatic refresh after CRUD operations
- **Modern UI**: Clean, responsive dark-themed interface built with Tailwind CSS

## Tech Stack

### Backend
- **Spring Boot 3.5.11** - Java framework
- **PostgreSQL** - Database
- **Spring Data JPA** - ORM
- **Lombok** - Reduce boilerplate code
- **Maven** - Build tool

### Frontend
- **React 19** - UI library
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client

## Prerequisites

- **Java 21** or higher
- **Node.js 18** or higher
- **PostgreSQL 14** or higher
- **Maven 3.8** or higher

## Setup Instructions

### 1. Database Setup

```bash
# Start PostgreSQL (adjust port if needed)
# Create database
createdb financedb

# Or using psql
psql -U postgres
CREATE DATABASE financedb;
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Update database credentials in src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5433/financedb
spring.datasource.username=admin
spring.datasource.password=admin123

# Run the application
./mvnw spring-boot:run

# Backend will start on http://localhost:8080
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will start on http://localhost:5174
```

## Environment Variables

### Backend (`application.properties`)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/financedb
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Frontend (`.env`)

Create a `.env` file in the frontend directory for production:

```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

For local development, it defaults to `http://localhost:8080/api`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/{id}` | Get expense by ID |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |
| GET | `/api/expenses/category/{category}` | Get expenses by category |
| GET | `/api/expenses/range?startDate=&endDate=` | Get expenses by date range |
| POST | `/api/ai/analyze` | Get AI analysis of expenses |

## Project Structure

```
.
├── backend/
│   ├── src/main/java/com/financetracker/backend/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Data access
│   │   ├── entity/         # JPA entities
│   │   └── dto/            # Data transfer objects
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/
    ├── src/
    │   ├── api/            # API client functions
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   └── App.jsx         # Root component
    └── vite.config.js
```

## Usage

1. **Add Expense**: Click the "Add Expense" button in the navbar
2. **Edit Expense**: Click the "Edit" button on any expense card
3. **Delete Expense**: Click the "Delete" button on any expense card
4. **AI Analysis**: Click the "Analyze with AI" button to get intelligent insights

## Development

### Backend Development

```bash
# Run with live reload
./mvnw spring-boot:run

# Build
./mvnw clean package

# Run tests
./mvnw test
```

### Frontend Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Deployment

### Backend (Railway)
1. Push code to GitHub
2. Connect repository to Railway
3. Set environment variables in Railway dashboard
4. Deploy

### Frontend (Vercel/Netlify)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Set `VITE_API_URL` environment variable to your backend URL

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173`
- `http://localhost:5174`

Update `@CrossOrigin` in `ExpenseController.java` for additional origins.

## License

MIT

## Author

Your Name
