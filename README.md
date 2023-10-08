# GitHub 100

Coding Exercise - Using React build a ​single-page web app​ that uses the Github REST API to display a list of the top 100 most starred Github repositories; including a list of the commits made in the last 24 hours.

## Table of Contents

- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [Tech Stack](#tech-stack)
- [Additional Libraries](#additional-libraries)
- [Process \& Goals](#process--goals)
  - [Structure](#structure)
    - [Folder Structure](#folder-structure)
  - [React / Javascript](#react--javascript)
  - [Styles](#styles)
  - [UX \& Design](#ux--design)
  - [Accessibility (A11y)](#accessibility-a11y)
  - [Motion](#motion)
  - [Testing](#testing)
  - [Typing](#typing)
- [Roadmap](#roadmap)

## Run Locally

Clone the project

```bash
  git clone https://github.com/tspears1/github-100.git
```

Go to the project directory

```bash
  cd github-100
```

Install dependencies

```bash
  bun install
```

Start the development server

```bash
  bun run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_GITHUB_PERSONAL_ACCESS_TOKEN`

## Tech Stack

- [React 18](https://react.dev/) - Javascript Framework
- [Node 18](https://nodejs.org/) - Runtime Environment
- [Vite 4](https://vitejs.dev/) - Build Tools
- [Vercel](https://vercel.com/) - Hosting/Deployment
- [Bun](https://bun.sh/) - Package Manager
- [Sass/SCSS](https://sass-lang.com/) - Styles
- [Open-Props](https://open-props.style/) - CSS Custom Properties
- [Framer Motion](https://www.framer.com/motion/) - Motion
- [Jest](https://jestjs.io/) - Testing
- [JSDoc](https://jsdoc.app/) - Types

## Additional Libraries

- [Google Fonts](https://fonts.google.com/) - Fonts & Material Symbols
- [Lazysizes](https://github.com/aFarkas/lazysizes) - Media Lazyloading
- [Octokit](https://github.com/octokit/octokit.js) - GitHub SDK
- [Simplebar](https://github.com/Grsmto/simplebar) - Custom Scrollbar

## Process & Goals
### Structure
For organization, [Atomic Design](https://atomicdesign.bradfrost.com) principals were followed, specifically around styles and components.
In all instances, the goal was to constantly look for ways to refactor to make code as simple and reusable as possible.

#### Folder Structure
``` bash
src/
├── assets/
│   ├── icons/
│   └── styles/
│       ├── abstracts/
│       ├── atoms/
│       ├── base/
│       ├── molecules/
│       ├── organisms/
│       ├── utils/
│       └── vendors/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── context/
│   ├── columns/
│   └── repo-data/
├── hooks/
├── types/
└── utils/
    ├── formatters/
    └── services/
```

### React / Javascript
- Used `bun create vite` as starter template.
- React Functional Components with ES6/ES2020 features were used throughout the project.
- Efforts were made at all stages to reduce unneccesary re-renders and optimize performance.
- React context was used to manage global state and reduce prop drilling.
- On first load, the app fetches the top 100 repos from the GitHub API (using GitHub's preferred SDK, Octokit) and stores them in context. Then once a card is selected, the commits for that repo are fetched and stored in the same context. This allows for a much faster experience when switching between repos.
- Once the data for both the repos and commits are fetched, they're filtered, formatted and sorted to ensure that only the most relevant data is stored in context.
- Local Storage was used to persist the user's theme preference.
- Context was also used to manage the number of columns that would fit at a given viewport. This was purely used for Card staggered animations with Framer Motion and could be removed in the future.

### Styles
The goal with styling was to leverage Modern CSS whenever possible rather than leaning on Javascript for theming and DOM level manipulation. This was done to ensure that the site was as performant as possible. The only exception to this was the use of Framer Motion for animations.

- **Open Props** was used as a "framework" to provide a consistent set of CSS Custom Properties that could be used throughout the site for quick theming and layout standardization.
- **SCSS** was used to provide a more robust set of tools for styling and organization, particularly for nesting. The aim was to lean on SCSS as little as possible versus Vanilla CSS.
- **[BEM](https://getbem.com/naming/)** was used for naming conventions to ensure that styles were as modular and reusable as possible.
- **Logical Properties** were used to ensure that the site was responsive and accessible.
- Traditional breakpoints were replaced with **Container Queries** to allow every element to be fully responsive no matter what container it was in.
- **Custom Properies** were leaned on heavily to allow for a super flexible theming experience.
- **CSS Layers** was used for better cascade management.
- **"S.O.B." (State of Being) Pseudo Class Functions** like `:where()`, `:is()`, and `:not()` also allowed more flexible control over the cascade.

### UX & Design
The goal was to create a simple, clean and delightful experience that would allow the user to focus on the content and easy to use on any sized viewport.
The design was born from the tools available in Open Props as well as inspiration from the GitHub UI. The goal was to create a design that felt familiar to the user and would allow them to focus on the content.

### Accessibility (A11y)
Accessibility was top of mind from the start of the projects. The goal was to ensure that the site was as accessible as possible for all users following the [WCAG 2.1](https://www.w3.org/WAI/standards-guidelines/wcag/) best practices, [Inclusive Design](https://inclusivedesignprinciples.org/) principals and [Inclusive Components](https://inclusive-components.design/) markup patterns.
This includes (but not limited to the following):

- Semantic HTML
- ARIA Attributes
- Color Contrast
- Light / Dark Mode Toggle
- Focus Management
- Keyboard Navigation
- Skip Links
- Screen Reader friendly labels and instructions
- Reduced Motion support
- One handed design patterns for mobile

### Motion
Framer Motion was used to manage most of the motion on the site. I wanted the movement to be informative and provide visual feedback to the user. I also wanted it to create a delightful experience that would make the site feel more alive and fluid.

### Testing
- Unit tests were written using Vitest specifically to test all formatters and services.
- Axe was used to run an accessibility audit on the site to ensure that it was as accessible as possible.
- Lighthouse was used to run a performance audit on the site to ensure that it was as performant as possible and met the Core Web Vitals standards.

### Typing
JSDoc was used for typing with the aim of being as self-documenting as possible and create better IDE intellisense and type checking.
I also wanted to keep the document as readable as possible so I opted to use the `@typedef` annotation to create custom types that could be reused throughout the document.

## Roadmap
- [ ]  Optimize avatar images and serve in webp format.
- [ ]  Reset focus to selected card when panel is closed.

## TODO:
- [x]  Clean up and document
- [x]  Finish types
- [x]  House cleaning
- [x]  Write Read me
- [x]  Write Jest Tests
- [ ]  Eyebrow Corners
- [ ]  Loading bar / animate loading text
- [x]  Lighthouse / Core Web Vitals Test
- [ ]  Axe Accessibility Test
- [ ]  Add Skip Links
