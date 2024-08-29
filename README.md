# Job Seeker Application

## Description

The Job Seeker Application allows users to sign up, upload their resumes, and view their personalized dashboard. This application is designed to help job seekers manage their job applications and resumes efficiently.

## Features

- User Sign Up
- Resume Upload
- Personalized Dashboard
- View and Download Resume

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/kumarkshitij171/job-seeker-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd job-seeker-app
   ```

## Environment Variables

### Backend

Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
PORT=your_port_number
MONGO_URI=your_mongo_db_connection_string
CORS_ORIGIN=your_cors_origin
JWT_SECRET=your_jwt_secret
```

### Frontend

Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
VITE_API_URL=your_backend_api_url
```

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. Open your browser and navigate to `http://localhost:8000`.

## Frontend

### Sign Up

Users can sign up by providing their name, email, and password. After signing up, they can log in to access their dashboard.

### Dashboard

Once logged in, users can view their dashboard, which displays their uploaded resume and other personal information.

### Upload Resume

Users can upload their resume in PDF format. The uploaded resume will be displayed on their dashboard, and they can view or download it.

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.
