# Insightz

Smart Stock Insights from Simple Queries

## Overview

Insightz is a full-stack application that enables users to generate AI-powered investment reports from simple queries. The project consists of:

- **Frontend:** [insightz-app](insightz-app/) — Next.js 13+ (React, TypeScript, Tailwind CSS)
- **Backend:** [insightz-backend](insightz-backend/) — Python Flask API

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** (or npm/yarn)
- **Python** (3.9+ recommended)
- **pip** (Python package manager)

---

## Setup

### 1. Clone the Repository

```sh
git clone git@github.com:madhav48/Insightz.git
cd Insightz
```

---

### 2. Backend Setup (`insightz-backend`)

1. Navigate to the backend directory:

    ```sh
    cd insightz-backend
    ```

2. Start the Flask server:

    ```sh
    python app.py
    ```

   The backend will run on `http://localhost:5000` by default.

---

### 3. Frontend Setup (`insightz-app`)

1. Open a new terminal and navigate to the frontend directory:

    ```sh
    cd insightz-app
    ```

2. Install dependencies:

    ```sh
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```

3. Configure environment variables:

    - Copy `.env.local.example` to `.env.local` (if provided), or create `.env.local` with the following variable:

      ```
      NEXT_PUBLIC_FLASK_API_BASE_URL=http://localhost:5000
      ```

    - Adjust the URL if your backend runs elsewhere.

4. Start the Next.js development server:

    ```sh
    pnpm dev
    # or
    npm run dev
    # or
    yarn dev
    ```

   The frontend will run on `http://localhost:3000` by default.

---

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Use the interface to submit investment queries and generate reports.
3. The frontend communicates with the Flask backend for AI-powered responses.

---

## Project Structure

```
Insightz/
├── insightz-app/        # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── ...
├── insightz-backend/    # Flask backend
│   ├── routes/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
└── README.md
```

---


## Notes

- Ensure both frontend and backend servers are running for full functionality.
- Update API URLs in environment variables as needed for deployment.

---
