# Firstlane Multi-Finance

A financial platform that allows users to access loans, make investments, and perform foreign exchange — all directly from their digital wallet.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Development](#development)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
  - [Testing](#testing)
- [Key Features](#key-features)
  - [Theme](#theme)
- [API Documentation](#api-documentation)
- [Code Standards](#code-standards)
- [Browser Compatibility](#browser-compatibility)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Security](#security)
- [Contact & Support](#contact--support)

## Overview

This is a modern financial platform that brings together essential financial services — including personal loans, employee loans, asset finance, investment opportunities, and foreign exchange — all within a single digital wallet.
Users can access flexible credit options tailored to individual and business needs, explore curated investment offerings, and perform currency exchanges seamlessly. The platform provides a secure, intuitive experience that simplifies financial management and empowers users to take control of their financial growth — all in one place.

## Technologies Used

- *Frontend*: React.js, Vite
- *State Management*: Redux Toolkit
- *UI Library*: ShadCN UI, Tailwind CSS
- *Routing*: React Router
- *HTTP Client*: Axios
- *Authentication*: JWT (JSON WEB TOKENS)
- *Testing*: Vitest, React Testing Library
- *Icons*: Custom Icons, Lucide React (via ShadCN)
- *Version Control*: Git
- *Package Manager*: npm

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm (v8.x or higher)
- Git

### Installation

1. Clone the repository:

   bash
   git clone https://github.com/jamfortetechnologies/firstlane-user-frontend.git
   cd firstlane-user-frontend
   

2. Install dependencies:
   bash
   npm install
   

### Environment Setup

1. Create a .env file in the root directory with the required environment variables:

   - VITE_API_BASE_URL=your_api_base_url
   - VITE_BASE_URL=your_frontend_url

2. Environment variables explanation:
   - VITE_API_BASE_URL: Primary API endpoint for the application
   - VITE_BASE_URL: Hosted frontend url

## Project Structure

src/
├── tests/ # Unit and integration tests
├── assets/ # Static assets like custom icons and images 
│ ├── icons/
│ └── images/
├── fonts/ # Custom fonts used in the application
├── components/ # React components
│ ├── FormInputs/ # Form Input components
│ ├── ui/ # ShadCN UI components
│ ├── [shared components] # Shared components placed directly in the base directory
├── libs/ # ShadCN-generated JS utilities (e.g., icon exports)
├── middlewares/ # Middleware utilities such as request/response interceptors
│ ├── interceptor.js  # Intercepts and processes API requests/responses
├── hooks/ # Custom React hooks
│ ├── ThemeContext.js
│ └── useRedirectOnDesktop.js
├── modules/ # Application pages organized by module
│ ├── auth/
│ ├── dashboard/
│ ├── fx_transactions/
│ ├── investments/
│ ├── kyc/
│ ├── loans/
│ ├── settings/
│ ├── support/
│ ├── wallets/
├── store/ # Redux store configuration
└── utils/ # Utility functions

## Development

## Web Application

### Running the Development Server

bash
npm run dev


The application will be available at http://localhost:5175/

### Building for Production

bash
npm run build


This will generate optimized production files in the dist directory.


### Testing

Run tests:

bash
npm run test


Run tests with UI:

bash
npm run test:ui


## Deployment

### Production Deployment

1. Build the application:

   bash
   npm run build
   

2. Deploy the contents of the dist directory to your web server or static site hosting service.

## Key Features

- *Loans Management*: Access and manage personal, employee, and asset finance loans
- *Investments*: Explore and invest in curated financial opportunities
- *FX Transactions*: Perform real-time foreign currency exchanges
- *Wallet*: Manage funds, view balances, and track transaction history
- *Support*: Access customer support and ticket management
- *Settings*: Configure user and platform preferences
- *Themes*: Customize the application appearance with theme options


## Theme (Light and Dark)

The application includes a comprehensive theme system that supports both light and dark modes for improved user experience across different environments and preferences.

The theme system leverages CSS variables and custom hooks to provide a consistent appearance throughout the application:

- Theme Selection: Users can toggle between light, dark, or system default themes
- System Detection: Automatically detects user system preference
- Persistent Settings: Theme choice is saved in local storage
- Dynamic Switching: Theme can be changed without page refresh

The theme implementation is located in src/hooks/ThemeContext.jsx and uses a data attribute approach:

## API Documentation

The application interacts with a single primary API:

1. Primary API (VITE_API_BASE_URL): Handles core functionality including authentication, user management, and main features.

For detailed API documentation, please refer to:

- [`VITE_API_BASE_URL/api-docs]
- Or contact the development team for Swagger/OpenAPI documentation

## Code Standards

### JavaScript Style Guide

This project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with some custom modifications for code formatting, naming conventions, and JavaScript best practices.

### UI Styling Approach

The project uses the following approach for styling:

- *Tailwind CSS*: For utility-first styling of components  
- *ShadCN UI*: Pre-built accessible components styled with Tailwind CSS and Radix UI  
- *Global CSS*: Global styles are managed in src/index.css  

## Browser Compatibility

The application is optimized for and tested on:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Troubleshooting

### Common Issues

1. *Environment Variables Not Loading*

   - Make sure all environment variables are prefixed with VITE_
   - Restart the development server after changing environment variables

2. *API Connection Issues*

   - Verify the API endpoints in your .env file
   - Check network connectivity and CORS settings

3. *Build Failures*
   - Ensure all dependencies are installed: npm install
   - Clear node_modules and reinstall: rm -rf node_modules && npm install

### Getting Help

If you encounter issues not covered here, please:

1. Check existing GitHub issues
2. Create a new issue with detailed information about the problem
3. Contact the development team

## Contributing

1. Fork the repository
2. Create your feature branch: git checkout -b feature/amazing-feature
3. Commit your changes following conventional commits: git commit -m 'feat: add some amazing feature'
4. Push to the branch: git push origin feature/amazing-feature
5. Open a pull request

### Pull Request Process

1. Ensure your code passes all tests and linting
2. Update documentation as necessary
3. Get approval from at least one core team member
4. Squash commits if necessary before merging

## Security

- Authentication is handled via JWT tokens
- All sensitive data should be stored in environment variables
- Regular dependency updates are performed to address security vulnerabilities
- *Data Encryption*: The application implements end-to-end encryption for API communications using AES-CBC
- For reporting security vulnerabilities, please contact []

### Encryption Middleware

The application uses a custom encryption middleware to secure data transmission between the client and server:

#### How It Works

- Uses CryptoJS for AES encryption in CBC mode with PKCS7 padding
- Automatically encrypts request payloads and decrypts response data
- Generates random initialization vectors (IV) and encryption keys for each request
- Handles all HTTP methods (GET, POST, PUT, PATCH, DELETE)

#### Using Secure API Calls

To make API calls with automatic encryption/decryption:
import { secureAxios } from src/middleware/encryptionMiddleware;
Automatically encrypts the request body and decrypts the response

secureAxios.post('/api/endpoint', dataObject)
.then(response => {
response.data is already decrypted
console.log(response.data);
})

Available methods:

- secureAxios.get(url, config)
- secureAxios.post(url, data, config)
- secureAxios.put(url, data, config)
- secureAxios.patch(url, data, config)
- secureAxios.delete(url, config)

The middleware automatically detects encrypted responses by checking for vi, iv, and content properties in the response data.

## Contact & Support

- *Project Maintainer*: []
- *Issue Tracker*: []
- *Documentation*: [VITE_API_BASE_URL/api]