# Currency Converter App

## Project Overview
The Currency Converter app is a responsive web application built with React and Tailwind CSS that allows users to convert amounts between different currencies using real-time exchange rates fetched from a public currency API.

This project provides hands-on experience with API integration, state management, user input handling, and responsive UI design.

## Features
- Fetches real-time exchange rates from ExchangeRate-API.
- Convert currency amounts between any two selected currencies.
- Displays current exchange rates for selected currency pairs.
- Responsive design for desktop, tablet, and mobile devices.
- Error handling for network issues and invalid inputs.

## Technologies Used
- React (with Hooks)
- Tailwind CSS
- Fetch API / Axios for HTTP requests
- Vite (for project setup and build)
- Git and GitHub for version control

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository  
   ```bash
   git clone https://github.com/amadibethel/GF-currency-converter.git

#### Project Structure
currency-converter/
├── public/                 # Static files like index.html, favicon
├── src/
│   ├── assets/             # Images, icons, fonts
│   ├── components/         # Reusable React components (CurrencySelector, AmountInput, ConversionResult)
│   ├── hooks/              # Custom hooks (if any)
│   ├── services/           # API calls and related logic
│   ├── styles/             # Tailwind config or custom CSS
│   ├── utils/              # Utility functions/helpers
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind base styles
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md