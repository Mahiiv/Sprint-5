# Sprint 5 - Kanban Task Board

A Trello-style task board built with React (Vite). You can add tasks, move them between columns, edit them inline, and the board saves itself in localStorage so it doesn't reset on refresh.

## Live Demo
https://sprint-5-kappa.vercel.app/

## Features

- 3 columns: To Do, In Progress, Done
- Add a new task (goes into To Do)
- Delete any task
- Move a task forward/back between columns using buttons
- Click on a task's text to edit it inline
- Pick a priority (High / Medium / Low) when adding a task 
- Board state is saved to localStorage, so tasks are still there after a refresh

## Tech Stack
- React (Vite)
- Plain CSS (no Tailwind/Bootstrap)
- Browser localStorage for persistence

## Folder Structure
```
Sprint 5/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        ├── Column.jsx
        └── TaskCard.jsx
```

## Running Locally
```
npm install
npm run dev
```
Then open the localhost link shown in the terminal.

## Notes
- Task data lives in three separate React state arrays (to-do / inProgress / done) instead of one combined array with a status field, kept it that way to keep the logic straightforward.
