# Brandify Template

A modern React TypeScript template with Material-UI, Firebase, and Framer Motion integration.

## Features

- ⚛️ React 19 with TypeScript
- 🎨 Material-UI (MUI) for beautiful UI components
- 🔥 Firebase integration for authentication and hosting
- 🎬 Framer Motion for smooth animations
- 📱 Responsive design
- 🎯 SEO optimized
- 🚀 Performance optimized

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the template:

```bash
npx create-react-app my-app --template brandify
```

2. Install dependencies:

```bash
cd my-app
npm install
```

3. Set up Firebase:

   - Create a new Firebase project
   - Copy your Firebase configuration to `src/firebase-info.ts`
   - Enable Authentication and other Firebase services as needed

4. Start the development server:

```bash
npm start
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── styles/        # Global styles and themes
├── utils/         # Utility functions
├── hooks/         # Custom React hooks
└── types/         # TypeScript type definitions
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run deploy` - Deploy to Firebase

## Customization

### Theme

Edit `src/styles/theme.ts` to customize the Material-UI theme.

### Firebase Configuration

Update `src/firebase-info.ts` with your Firebase project settings.

## Deployment

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase:

```bash
firebase init
```

4. Deploy:

```bash
npm run build
firebase deploy
```

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License.
