# TulumTkts - Comprehensive Tourism Platform

## Overview

TulumTkts is a comprehensive tourism platform for Tulum, Mexico, built with React frontend and Express.js backend. The platform serves as the #1 booking destination for Tulum experiences, featuring multiple sections: Events & Festivals, Tours & Experiences, Villa Rentals, Transportation, and Travel Guides.

## Features

- **Multilingual Support**: Spanish, English, and French
- **Experience Booking**: Integration with Travelpayouts API
- **Affiliate Tracking**: Built-in affiliate link generation and tracking via Travelpayouts
- **Modern UI**: Built with Shadcn/ui components and TailwindCSS
- **Type Safety**: Full TypeScript implementation
- **Analytics**: Google Analytics 4 integration
- **Content Management**: Manual content updates through code

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- TailwindCSS + Shadcn/ui
- Wouter (Routing)
- TanStack Query (Data fetching)

### Backend
- Express.js + TypeScript
- Travelpayouts API integration
- Affiliate tracking system

### External Services
- **Bookings**: Travelpayouts (activities, flights, hotels)
- **Analytics**: Google Analytics 4
- **Content**: Manual management through code

## Deployment to Vercel

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Travelpayouts API**: Get your API token from [Travelpayouts Partner Portal](https://www.travelpayouts.com/developers/api)

### Environment Variables

Set these environment variables in your Vercel project:

```bash
# Travelpayouts API Configuration
TRAVELPAYOUTS_API_TOKEN=your_travelpayouts_api_token_here
TRAVELPAYOUTS_MARKER=your_travelpayouts_marker_here  # Optional, defaults to API token

# Pexels API Configuration (for blog images)
PEXELS_API_KEY=your_pexels_api_key_here  # Get from https://www.pexels.com/api/

# Application Configuration
NODE_ENV=production
```

### Deployment Steps

1. **Connect Repository**:
   - Go to Vercel Dashboard
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**:
   - Add all required environment variables in the Vercel dashboard
   - Make sure `TRAVELPAYOUTS_API_TOKEN` is set

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Travelpayouts API token (get it from [Travelpayouts Partner Portal](https://www.travelpayouts.com/developers/api))

### Setup

1. **Clone Repository**:
   ```bash
   git clone <your-repo-url>
   cd TulumTkts
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   ```bash
   # Create .env.local file with your configuration
   echo "TRAVELPAYOUTS_API_TOKEN=your_travelpayouts_api_token_here" > .env.local
   echo "TRAVELPAYOUTS_MARKER=your_travelpayouts_marker_here" >> .env.local  # Optional
   echo "PEXELS_API_KEY=your_pexels_api_key_here" >> .env.local  # For blog images
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking

## Project Structure

```
TulumTkts/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
│   └── index.html
├── server/                # Express.js backend
│   ├── routes.ts          # API routes
│   └── services/          # External service integrations
└── vercel.json           # Vercel configuration
```

## API Endpoints

- `GET /api/experiences/tulum` - Get Tulum experiences
- `GET /api/experiences/:activityId` - Get specific activity details
- `GET /api/travelpayouts/status` - Get Travelpayouts API status
- `GET /api/flights/search` - Search flights
- `GET /api/flights/cheap` - Get cheap flights
- `GET /api/flights/monthly` - Get monthly flight prices
- `GET /api/flights/calendar` - Get calendar prices
- `GET /api/hotels/search` - Search hotels
- `GET /api/hotels/:hotelId` - Get hotel details
- `POST /api/affiliate/track` - Track affiliate clicks

## Content Management

Content is managed manually through code:

1. **Experiences**: Update CSV file `TulumTkts_Activities.csv` with activity data
2. **Pages**: Edit React components in `client/src/pages/`
3. **UI Components**: Modify Shadcn/ui components in `client/src/components/`
4. **Styling**: Update TailwindCSS classes and custom styles

The platform uses Travelpayouts API for:
- Activities/Tours (loaded from CSV with affiliate links)
- Flight searches and bookings
- Hotel searches and bookings

## Analytics Setup

Google Analytics 4 is integrated for tracking:

- Page views
- User interactions
- Affiliate link clicks
- Conversion tracking
- Performance metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

