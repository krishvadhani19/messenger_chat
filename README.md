# Messenger Chat

This project is a feature-rich Discord clone built with modern web technologies, offering real-time communication capabilities and a robust user experience.

## Technologies Used

- [Next.js](https://nextjs.org/) (v14.4.0) - React framework for building the frontend and API routes
- [React](https://reactjs.org/) (v18.0.0) - JavaScript library for building user interfaces
- [Next Auth](https://next-auth.js.org/) (v5.0.0-beta.19) - Authentication solution for Next.js applications
- [Socket.io](https://socket.io/) (v4.7.5) - Real-time bidirectional event-based communication
- [Zustand](https://github.com/pmndrs/zustand) (v5.0.0-rc.2) - State management
- [React Query](https://tanstack.com/query/latest) (v5.49.2) - Data fetching and caching library
- [Prisma](https://www.prisma.io/) (v5.16.1) - Next-generation ORM for Node.js and TypeScript
- [Uploadthing](https://uploadthing.com/) (v6.7.2) - File uploading solution
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing application data

## Features

- Real-time messaging using Socket.io
- User authentication with Next Auth
- State management with Zustand
- Efficient data fetching and caching with React Query
- File uploads with Uploadthing
- Serverless API routes with Next.js
- Database interactions using Prisma ORM with MongoDB
- Integrated Socket.io server for handling real-time communications

## Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn package manager
- MongoDB instance (local or cloud-hosted)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/discord-clone.git
   cd discord-clone
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add necessary variables:
   ```
   DATABASE_URL="mongodb://your-mongodb-url"
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"
   AUTH_SECRET="your-nextauth-secret"
   NEXT_PUBLIC_SITE_URL="http://localhost:4000"
   ```

4. Set up the database:
   ```
   npx prisma db push
   ```

5. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```
   This command will start both the Next.js server and the Socket.io server concurrently.

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Socket Server Configuration

The Socket.io server is integrated with the Next.js application and starts concurrently. It's configured to listen on `localhost:4000`. Your client-side Socket.io connection should use this address:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');
```

## Deployment

This project can be deployed on platforms that support Next.js applications, such as Vercel or Netlify. 

1. Deploy the Next.js application to your preferred hosting platform.
2. Ensure your deployment platform supports concurrent processes or WebSocket connections for the integrated Socket.io server.
3. Update the Socket.io client connection URL in your frontend code to point to your deployed server's address.
4. Ensure all environment variables are properly set in your deployment environment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
