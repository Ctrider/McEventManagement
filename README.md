# McEventManagement - School Events Management Platform

![McEventManagement Platform](https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🏆 Project Overview

**McEventManagement** is a comprehensive digital command center designed to streamline school event management. Built to solve the challenge of keeping students, teachers, and parents informed and engaged with school activities, this platform provides a centralized solution for managing everything from academic competitions to cultural festivals.

### 🎯 Project Purpose & Objectives

**Primary Goal**: Create a scalable, interactive system that can handle multiple events smoothly with a clean user experience.

**Key Objectives**:
- **Centralized Event Management**: Provide a single platform for all school events
- **Real-time Information**: Keep stakeholders updated with latest announcements and event changes
- **Streamlined Registration**: Simplify the process of signing up for events
- **Enhanced Communication**: Bridge the gap between administration, students, and parents
- **Data-Driven Insights**: Provide analytics for better event planning

### 🌟 Features

#### Core Features
- **📅 Interactive Event Calendar** - View events in both month and list formats
- **🎫 Event Registration System** - Online registration with capacity management
- **⏰ Live Countdowns** - Real-time countdowns to upcoming events
- **📢 Announcement Management** - Priority-based announcement system
- **🔍 Advanced Filtering** - Search and filter events by multiple criteria
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices

#### Advanced Features
- **📊 Admin Dashboard** - Comprehensive event and registration management
- **📈 Analytics & Reports** - Event performance and registration statistics
- **🏷️ Event Categorization** - Organize events by type (Academic, Sports, Cultural, etc.)
- **👥 Capacity Management** - Track and limit event registrations
- **🎨 Modern UI/UX** - Clean, intuitive interface with smooth animations

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for SPA navigation
- **Lucide React** - Beautiful, customizable icons
- **date-fns** - Modern date utility library
- **Framer Motion** - Animation library for smooth interactions
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **CORS** - Cross-Origin Resource Sharing middleware
- **Helmet** - Security middleware
- **Rate Limiting** - API protection against abuse
- **UUID** - Unique identifier generation

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS transformation and optimization
- **Concurrently** - Run multiple npm scripts simultaneously

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** (optional, for version control)

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd McEventManagement

# Or download and extract the ZIP file to your desired location
```

### Step 2: Install Dependencies

#### Option 1: Install All Dependencies (Recommended)
```bash
npm run install-all
```

#### Option 2: Manual Installation
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root directory
cd ..
```

### Step 3: Start the Development Servers

#### Option 1: Start Both Servers Simultaneously
```bash
npm run dev
```

#### Option 2: Start Servers Separately
```bash
# Terminal 1 - Start Backend Server
npm run server

# Terminal 2 - Start Frontend Development Server
npm run client
```

### Step 4: Access the Application

Once the servers are running, open your web browser and navigate to:

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
McEventManagement/
├── frontend/                    # React frontend application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx      # Navigation component
│   │   │   ├── Footer.jsx      # Footer component
│   │   │   ├── EventCard.jsx   # Event display component
│   │   │   ├── Countdown.jsx   # Countdown timer
│   │   │   └── AnnouncementCard.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── Events.jsx      # Events listing
│   │   │   ├── EventDetails.jsx # Event details
│   │   │   ├── Calendar.jsx    # Event calendar
│   │   │   ├── Registration.jsx # Registration form
│   │   │   ├── Announcements.jsx # Announcements
│   │   │   └── Admin.jsx       # Admin dashboard
│   │   ├── data/               # Mock data and constants
│   │   │   └── events.js       # Sample event data
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # App entry point
│   │   └── index.css           # Global styles
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
│
├── backend/                     # Express backend API
│   ├── server.js               # Main server file
│   └── package.json            # Backend dependencies
│
├── index.html                   # HTML entry point
├── package.json                 # Root package configuration
├── vite.config.js               # Root Vite configuration
└── README.md                    # This file
```

## 🔧 Configuration

### Frontend Configuration (vite.config.js)
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

### Backend Configuration
The backend runs on port 5000 by default. You can change this by setting the PORT environment variable:
```bash
PORT=3001 npm run server
```

## 🧪 API Endpoints

### Events
- `GET /api/events` - Get all events (supports filtering)
- `GET /api/events/:id` - Get specific event details
- `POST /api/events` - Create new event (admin)

### Registrations
- `POST /api/events/:id/register` - Register for an event
- `GET /api/registrations` - Get registrations (admin)

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create new announcement (admin)

### Statistics
- `GET /api/stats` - Get platform statistics
- `GET /api/health` - Health check endpoint

## 🏃‍♂️ Available Scripts

### Root Level
```bash
npm run dev          # Start both frontend and backend
npm run server       # Start backend server only
npm run client       # Start frontend development server
npm run build        # Build frontend for production
npm run install-all  # Install all dependencies
```

### Frontend Only
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Only
```bash
cd backend
npm run dev          # Start with nodemon
npm start            # Start production server
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #2563eb
- **Success Green**: #10b981
- **Warning Orange**: #f59e0b
- **Danger Red**: #ef4444
- **Gray Scale**: Multiple shades for text and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Heading Sizes**: 5xl (text-5xl) to sm (text-sm)
- **Body Text**: 16px base size

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Multiple variants (primary, secondary, success, danger)
- **Forms**: Consistent styling with validation states
- **Grid System**: CSS Grid and Flexbox layouts

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1200px+ (Full feature set)
- **Tablet**: 768px - 1199px (Adapted layouts)
- **Mobile**: 320px - 767px (Mobile-first design)

## 🔒 Security Features

- **Rate Limiting**: API endpoint protection
- **CORS Configuration**: Secure cross-origin requests
- **Helmet Security**: Security headers
- **Input Validation**: Server-side data validation
- **Error Handling**: Comprehensive error management

## 📊 Performance Optimizations

- **Vite Build System**: Fast development and optimized builds
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: WebP format support
- **Bundle Analysis**: Optimized asset sizes
- **Caching**: Browser caching strategies

## 🧪 Testing

Currently, the application includes basic validation and error handling. For production deployment, consider adding:
- **Unit Tests**: Jest and React Testing Library
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Cypress or Playwright
- **Performance Tests**: Lighthouse CI

## 🚀 Deployment

### Frontend Deployment (Recommended: Vercel or Netlify)

#### Using Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Follow the prompts to complete deployment
```

#### Using Netlify
```bash
# Build the frontend
cd frontend
npm run build

# Deploy dist folder to Netlify
# Upload the dist/ folder to Netlify
```

### Backend Deployment (Recommended: Heroku or Railway)

#### Using Heroku
```bash
# Install Heroku CLI
# Create heroku app
heroku create your-app-name-api

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Environment Variables
For production deployment, set these environment variables:
```bash
NODE_ENV=production
PORT=5000
# Add any database connection strings if using a database
```

## 🔧 Customization

### Adding New Event Categories
1. Update the `categories` array in `src/data/events.js`
2. Add corresponding color styling in components
3. Update the calendar legend in `src/pages/Calendar.jsx`

### Modifying the Theme
1. Update CSS custom properties in `src/index.css`
2. Modify color variables in the `:root` selector
3. Update component-specific color classes

### Adding New API Endpoints
1. Add routes in `backend/server.js`
2. Update the frontend API calls in relevant components
3. Add TypeScript types (if using TypeScript)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process using the port
npx kill-port 3000
npx kill-port 5000
```

#### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

#### CORS Issues
- Ensure backend is running on port 5000
- Check CORS configuration in `backend/server.js`
- Verify proxy configuration in `vite.config.js`

#### Build Errors
- Ensure all dependencies are installed
- Check Node.js version compatibility
- Clear Vite cache: `rm -rf node_modules/.vite`

### Performance Issues
- Use React DevTools Profiler to identify slow components
- Optimize images and implement lazy loading
- Consider using a CDN for static assets

## 📞 Support

For support and questions:
- Check the troubleshooting section above
- Review the API documentation
- Create an issue in the repository

## 🎉 Acknowledgments

- **React Team** - For the amazing React framework
- **Vite Team** - For the lightning-fast build tool
- **Lucide** - For the beautiful icon library
- **Unsplash** - For high-quality stock photos
- **date-fns** - For date manipulation utilities

## 📈 Future Enhancements

- **Database Integration** - PostgreSQL or MongoDB
- **Real-time Updates** - WebSocket integration
- **Email Notifications** - Automated email system
- **Mobile App** - React Native version
- **Advanced Analytics** - Charts and detailed reports
- **Multi-language Support** - Internationalization
- **Social Media Integration** - Share events on social platforms
- **QR Code Generation** - For event check-ins
- **Payment Integration** - For paid events
- **Role-based Access** - Different permission levels

---

**Built with ❤️ using React, Vite, and Node.js**

*Last updated: December 2024*