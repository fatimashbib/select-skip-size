# Skip Selector Redesign

## 🎯 Objective
Redesign the “Choose your skip size” page from [wewantwaste.co.uk](https://wewantwaste.co.uk) using React, with a modern step-by-step wizard interface.

## 🛠 Tech Stack
- React + Vite
- Tailwind CSS
- REST API Integration

## 📡 API Used
[https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft](https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft)

## Online Demo

You can access the live version of the project here:

[https://wt8jx4-5173.csb.app/](https://wt8jx4-5173.csb.app/)


## 📁 Project Structure

src/
├── assets/ # Static images and icons
├── components/ # Modular UI components
│ ├── StepProgressBar/ # Progress bar for wizard steps
│ ├── SelectSkipStep/ # First step: Select skip size
│ └── PlaceholderStep/ # Future steps (placeholder for now)
├── pages/
│ └── App.jsx # Main wizard logic and layout
├── styles/ # Tailwind or global CSS
└── index.js # Entry point



## 💡 Features
- 🔄 Step-by-step wizard interface
- 📦 Dynamic skip data fetched from real API
- ✅ Visually highlighted selection
- 📱 Fully responsive UI
- 🎨 Modern layout with Tailwind CSS
- 🧠 Clean and maintainable component structure
- 🖼️ 3D-like skip image effect with transparent background

## 💻 Run Locally

```bash
npm install
npm run dev
