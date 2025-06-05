# Healthcare Patient Management System

## Deployment Instructions
### Backend (Render)
1. Push `/server` folder to a GitHub repo.
2. Go to [https://render.com](https://render.com) and create a new web service.
3. Use `Node` environment and set build/start commands.
4. Add environment variables (MONGODB_URI, JWT_SECRET).

### Frontend (Vercel)
1. Push `/client` folder to another GitHub repo.
2. Go to [https://vercel.com](https://vercel.com) and import the repo.
3. Set frontend environment variable: `REACT_APP_API_URL`.
4. Deploy and connect backend API.
