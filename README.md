# 🚀 GitHub User Search Pro

### Discover GitHub developers. Explore profiles. Connect with the community.

A modern, responsive GitHub user discovery application built with **React, Vite, Tailwind CSS, and the GitHub REST API**. Search for developers, explore their public profiles, and discover accounts through a clean, intuitive interface.

<p align="center">
  <img src="https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

---

## 📌 Overview

GitHub User Search Pro makes it easier to find GitHub accounts using the public GitHub Search API. It demonstrates how a modern frontend application can retrieve API data, manage asynchronous requests, and present results in a responsive interface.

## ✨ Key Features

- 🔎 **Developer Search** — Find GitHub users by username or search term.
- 👤 **Profile Discovery** — Browse user avatars, usernames, and available account details.
- 🔗 **Direct Profile Access** — Open public GitHub profiles.
- 📄 **Pagination** — Navigate through search results.
- ↕️ **Sorting** — Use the available sorting options to organize results.
- ⚡ **Live API Integration** — Fetch data from the GitHub REST API.
- ⏳ **Loading Feedback** — Display loading states while requests are in progress.
- 🛡️ **Error Handling** — Handle API failures and unsuccessful requests.
- 🔍 **Suggested Searches** — Explore example search terms.
- 📱 **Responsive UI** — Designed for desktop, tablet, and mobile screens.
- 🎨 **Modern Design** — Styled with Tailwind CSS and Lucide React icons.

## 🖥️ Preview

> **Live demo:** Add your deployed GitHub Pages URL here after deployment.

> **Screenshots:** Add application screenshots here when available.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Development server and build tool |
| Tailwind CSS v4 | Utility-first styling |
| JavaScript ES6+ | Application logic |
| Fetch API | HTTP requests |
| GitHub REST API | User search data |
| Lucide React | Interface icons |
| HTML5 and CSS3 | Application structure and styling |

## ⚙️ Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Install:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/) (for cloning the repository)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### 1. Clone the repository

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_USERNAME/github-user-search-pro.git
```

### 2. Enter the project directory

```bash
cd github-user-search-pro
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

### 5. Build for production

```bash
npm run build
```

Vite generates the production files in the `dist/` directory.

### 6. Preview the production build

```bash
npm run preview
```

## 🔌 GitHub API Integration

The application uses GitHub's public user search endpoint.

**Endpoint**

```text
https://api.github.com/search/users
```

**Example request**

```text
https://api.github.com/search/users?q=torvalds&per_page=10
```

**Example JavaScript**

```javascript
async function searchGitHubUsers(username) {
  const params = new URLSearchParams({
    q: username,
    per_page: "10",
  });

  const response = await fetch(
    `https://api.github.com/search/users?${params}`
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.items ?? [];
}
```

The example illustrates the basic API request pattern. Your application may include additional loading, error, and empty-result handling.

**API documentation:** [GitHub REST API — Search users](https://docs.github.com/en/rest/search/search#search-users)

### API limitations

Unauthenticated GitHub API requests are rate-limited. Search requests have a separate limit, so frequent searches may temporarily fail when the quota is exhausted. The application should communicate these failures clearly.

## 📂 Project Structure

```text
github-user-search-pro/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

*This is a representative structure. Your actual files may vary.*

## 🌐 Deployment

This project can be deployed to static hosting services such as GitHub Pages.

Before deploying, verify that your Vite configuration uses the correct repository base path:

```javascript
base: "/github-user-search-pro/",
```

This path is appropriate when the repository is named `github-user-search-pro` and the site is hosted under that repository's GitHub Pages URL.

After deployment, update the live demo link near the top of this README.

**Documentation:** [GitHub Pages](https://docs.github.com/en/pages)

## 🔐 Security and Best Practices

- No personal access token is needed for basic public user searches.
- Never commit passwords, access tokens, or private credentials.
- Check `response.ok` before parsing successful API responses.
- Handle loading, empty, and error states.
- Respect GitHub API rate limits.
- Keep dependencies updated and review changes before deploying.

## 🎯 What This Project Demonstrates

This project provides practical experience with:

- React components and state management
- JavaScript asynchronous programming
- Fetch API and REST API integration
- HTTP response handling
- Search, sorting, and pagination
- Responsive UI development
- Error and loading states
- Production builds and deployment preparation

## 🗺️ Future Improvements

Potential enhancements include:

- [ ] Add a detailed profile page.
- [ ] Display public repositories and follower information.
- [ ] Add recent-search history.
- [ ] Improve accessibility and keyboard navigation.
- [ ] Add automated tests.
- [ ] Publish a live demo.
- [ ] Add screenshots and a short demo video.

## 👨‍💻 Author

**Borif Gido**  
Software Engineering Student at Bule Hora University

- GitHub: (https://github.com/hacki-302)
- Portfolio: (https://hacki-302.github.io/MyPortfolio/)
- Telegram: (https://t.me/MaadiiB9)

## 📄 License

No open-source license has been specified yet. If you want others to reuse, modify, or distribute this project under defined terms, add an appropriate `LICENSE` file.

---

<p align="center">
  <strong>Built with curiosity, consistency, and a passion for software engineering.</strong>
</p>
