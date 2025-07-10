<h1 align="center">Rueckwand24 Material Preview Task</h1>

<div align="center">

|      Light Theme (Default)       |           Dark Theme            |
| :------------------------------: | :-----------------------------: |
| ![](./images/light.png?raw=true) | ![](./images/dark.png?raw=true) |

🔗 [Live Demo](https://rueckwand24-material-preview.vercel.app/)

An interactive **material preview interface** built with **Next.js 15** and **React 19**. This project allows users to explore and apply different material finishes on a kitchen background in real time — simulating a real-world configurator experience.

</div>

---

## 🖼️ Project Overview

This project provides a dynamic and accessible UI to **preview different materials** (e.g., marble, tiles, concrete) by clicking on overlaid circles on an image. It’s designed for visual configurators like those found on interior design or kitchen product websites.

When a user clicks on a hotspot, the background updates to reflect the selected material. All state logic is managed via **Zustand**, with styling handled by **Tailwind CSS**.

---

## 🚀 Features

- Interactive material switching on background image
- Clean and minimal UI for real-time material visualization
- Global state management with **Zustand**
- Built with **Next.js 15.3.5** and **React 19**
- Fast dev experience via **Turbopack**
- Full accessibility support with `@axe-core/react`
- Developer tooling: ESLint, Prettier, TypeScript
- Optional Docker support for containerized development

---

## 🧱 Tech Stack

| Layer            | Tools & Libraries       |
| ---------------- | ----------------------- |
| Framework        | Next.js 15, React 19    |
| State Management | Zustand 5               |
| Styling          | Tailwind CSS 4, PostCSS |
| Lint & Format    | ESLint, Prettier        |
| Accessibility    | @axe-core/react         |
| Language         | TypeScript              |

---

## 📸 Color Palettes

|              Default               |              Forest               |              Ocean               |
| :--------------------------------: | :-------------------------------: | :------------------------------: |
| ![](./images/default.png?raw=true) | ![](./images/forest.png?raw=true) | ![](./images/ocean.png?raw=true) |

|              Rose               |              Sunset               |              Royal               |
| :-----------------------------: | :-------------------------------: | :------------------------------: |
| ![](./images/rose.png?raw=true) | ![](./images/sunset.png?raw=true) | ![](./images/royal.png?raw=true) |

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/wiseweb-works/rueckwand24-material-preview-task.git
cd rueckwand24-material-preview-task
npm install
```

---

## 🧪 Development

Start the development server using **Turbopack**:

```bash
npm run dev
```

---

## 🐳 Docker (Optional)

Build and run using Docker:

```bash
docker build -t rueckwand24-material .
docker run -p 3000:3000 rueckwand24-material
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔨 Production Build

```bash
npm run build
npm start
```

Or with Docker:

```bash
docker build -t rueckwand24-material .
docker run -p 3000:3000 rueckwand24-material
```

Or pull from GitHub Container Registry (GHCR):

```bash
docker pull ghcr.io/wiseweb-works/rueckwand24-material-preview-task:latest
docker run -p 3000:3000 ghcr.io/wiseweb-works/rueckwand24-material-preview-task:latest
```

---

## 🛠 Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Run development server with Turbopack |
| `npm run build` | Build production bundle               |
| `npm run start` | Start production server               |
| `npm run lint`  | Run ESLint checks                     |
| `npm run check` | Run Prettier check                    |
| `npm run write` | Format code with Prettier             |

---

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Axe Core Accessibility](https://github.com/dequelabs/axe-core-npm)

---

## 📄 License

MIT © [Abdullah Koyuncu](https://github.com/wiseweb-works)

---
