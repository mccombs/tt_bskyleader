# BlueSky Leaderboard

A modern web application showcasing the top BlueSky accounts, built with Bun,
Elysia, and Turso. Visit [bskyleaderboard.com](https://bskyleaderboard.com/) to
see it in action.

## 🚀 Tech Stack

- **Frontend**: Vue 3 + Vite + Shadcn/Vue
- **Backend**: Bun + Elysia + Turso (SQLite)
- **Deployment**: Railway

## ✨ Features

- Real-time display of top BlueSky accounts
- Beautiful dark-mode UI with Shadcn components
- Efficient data fetching and caching with Turso
- Responsive design for all devices
- Random account shuffling for variety

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- Turso account and database setup
- Node.js 18+ (for development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tt_bskyleader.git
cd tt_bskyleader
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-auth-token
```

4. Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Development

### Frontend Development

The frontend is built with Vue 3 and uses Shadcn/Vue for UI components. The main
application logic is in `src/App.vue`.

### Backend Development

The backend API is built with Elysia and uses Turso for data storage. Key
endpoints:

- `/api/v1/fetch`: Fetches and updates BlueSky account data
- `/api/v1/serve`: Serves cached account data from Turso

### Database

The project uses Turso (SQLite) for data storage. Schema includes:

- `did`: Unique BlueSky identifier
- `handle`: Account handle
- `description`: Account description
- `avatar`: Profile avatar URL
- `followersCount`: Number of followers

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for
details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [BlueSky](https://bsky.social) for their amazing platform
- [Elysia](https://elysiajs.com/) for the fast and elegant backend framework
- [Turso](https://turso.tech/) for the performant database solution
- [Shadcn](https://ui.shadcn.com/) for the beautiful UI components
