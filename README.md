# BankApp Frontend

A modern banking application built with Angular, featuring a responsive design and secure authentication system.

## Features

- 🔒 Secure user authentication
- 💳 Account management
- 💰 Transaction history
- 🔔 Real-time notifications
- 📱 Responsive design
- 🎨 Modern UI with smooth transitions

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or later)
- npm (v6.x or later)
- Angular CLI (v15.x or later)

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/ozgucdlg/bankApp-frontend.git>
cd bankApp-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

```
src/
├── app/
│   ├── layouts/          # Layout components
│   │   ├── auth-layout/  # Authentication layout
│   │   ├── main-layout/  # Main application layout
│   │   ├── navbar/       # Navigation bar component
│   │   └── footer/       # Footer component
│   ├── components/       # Shared components
│   ├── services/         # Application services
│   └── models/          # Data models
├── assets/              # Static assets
└── environments/        # Environment configurations
```

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running tests

- Run `ng test` to execute unit tests via Karma
- Run `ng e2e` to execute end-to-end tests

## Styling

The application uses a modern design system with:
- Gradient backgrounds with smooth transitions
- Interactive hover effects
- Responsive layouts
- Consistent color scheme:
  - Primary: Blue gradient (#1e3c72 to #2a5298)
  - Accent: Green (#4CAF50)
  - Text: White on dark backgrounds

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



Project Link: [https://github.com/yourusername/bankApp-frontend](https://github.com/yourusername/bankApp-frontend)
