# Emaar Platform

The "Emaar" platform serves as a comprehensive digital hub to support reconstruction and development efforts in Sudan. It aims to provide an innovative environment that fosters collaboration between government entities, the private sector, and individuals. The platform focuses on promoting transparency, accelerating processes, and ensuring high efficiency in managing projects, tenders, auctions, and job opportunities.

## Features

- User authentication and authorization
- Real-time tender updates
- Multi-language support (Arabic/English)
- Push notifications
- File upload and management
- Tender analytics and reporting

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Firebase configuration
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── src/
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React context providers
│   ├── pages/         # Page components
│   ├── services/      # API and service functions
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Helper functions
├── server/
│   ├── routes/        # API route handlers
│   ├── middleware/    # Express middleware
│   └── index.js       # Server entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request