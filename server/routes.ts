import type { Express } from "express";
import { travelpayoutsService } from "./services/travelpayouts";
import { pexelsService } from "./services/pexels";
import { generateSitemap } from "./services/sitemap";

export async function registerRoutes(app: Express): Promise<void> {
  // Travelpayouts API routes
  app.get('/api/experiences/tulum', async (req, res) => {
    try {
      const { page = 1, per_page = 12, category, sort_by, language = 'es', currency = 'EUR' } = req.query;
      
      const activities = await travelpayoutsService.searchTulumActivities({
        page: parseInt(page as string),
        per_page: parseInt(per_page as string),
        category: category as string,
        sort_by: sort_by as 'popularity' | 'price' | 'rating',
        language: language as string,
        currency: currency as string
      });

      if (!activities) {
        return res.status(500).json({ error: 'Failed to fetch experiences' });
      }

      res.json(activities);
    } catch (error) {
      console.error('Error fetching Tulum experiences:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/experiences/:activityId', async (req, res) => {
    try {
      const { activityId } = req.params;
      const activity = await travelpayoutsService.getActivityDetails(activityId);

      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      res.json(activity);
    } catch (error) {
      console.error('Error fetching activity details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/travelpayouts/status', (req, res) => {
    const status = travelpayoutsService.getStatus();
    res.json(status);
  });

  // Flight search endpoint
  app.get('/api/flights/search', async (req, res) => {
    try {
      const { origin, destination, departureDate, returnDate, currency = 'USD' } = req.query;
      
      if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
      }

      const flights = await travelpayoutsService.searchFlights({
        origin: origin as string,
        destination: destination as string,
        departureDate: departureDate as string,
        returnDate: returnDate as string,
        currency: currency as string
      });

      if (!flights) {
        return res.status(500).json({ error: 'Failed to fetch flights' });
      }

      res.json(flights);
    } catch (error) {
      console.error('Error fetching flights:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get cheap flights
  app.get('/api/flights/cheap', async (req, res) => {
    try {
      const { origin, destination, currency = 'USD' } = req.query;
      
      if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
      }

      const flights = await travelpayoutsService.getCheapFlights({
        origin: origin as string,
        destination: destination as string,
        currency: currency as string
      });

      if (!flights) {
        return res.status(500).json({ error: 'Failed to fetch cheap flights' });
      }

      res.json(flights);
    } catch (error) {
      console.error('Error fetching cheap flights:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get monthly flight prices
  app.get('/api/flights/monthly', async (req, res) => {
    try {
      const { origin, destination, currency = 'USD' } = req.query;
      
      if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
      }

      const flights = await travelpayoutsService.getMonthlyFlights({
        origin: origin as string,
        destination: destination as string,
        currency: currency as string
      });

      if (!flights) {
        return res.status(500).json({ error: 'Failed to fetch monthly flights' });
      }

      res.json(flights);
    } catch (error) {
      console.error('Error fetching monthly flights:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get calendar prices
  app.get('/api/flights/calendar', async (req, res) => {
    try {
      const { origin, destination, month, currency = 'USD' } = req.query;
      
      if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
      }

      const prices = await travelpayoutsService.getCalendarPrices({
        origin: origin as string,
        destination: destination as string,
        month: month as string,
        currency: currency as string
      });

      if (!prices) {
        return res.status(500).json({ error: 'Failed to fetch calendar prices' });
      }

      res.json(prices);
    } catch (error) {
      console.error('Error fetching calendar prices:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get airports list
  app.get('/api/data/airports', async (req, res) => {
    try {
      const airports = await travelpayoutsService.getAirports();
      
      if (!airports) {
        return res.status(500).json({ error: 'Failed to fetch airports' });
      }

      res.json(airports);
    } catch (error) {
      console.error('Error fetching airports:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get cities list
  app.get('/api/data/cities', async (req, res) => {
    try {
      const cities = await travelpayoutsService.getCities();
      
      if (!cities) {
        return res.status(500).json({ error: 'Failed to fetch cities' });
      }

      res.json(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get airlines list
  app.get('/api/data/airlines', async (req, res) => {
    try {
      const airlines = await travelpayoutsService.getAirlines();
      
      if (!airlines) {
        return res.status(500).json({ error: 'Failed to fetch airlines' });
      }

      res.json(airlines);
    } catch (error) {
      console.error('Error fetching airlines:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Hotel search endpoint
  app.get('/api/hotels/search', async (req, res) => {
    try {
      const { location = 'Tulum', checkIn, checkOut, adults = 2, children = 0, currency = 'USD', lang = 'es' } = req.query;
      
      const hotels = await travelpayoutsService.searchHotels({
        location: location as string,
        checkIn: checkIn as string,
        checkOut: checkOut as string,
        adults: parseInt(adults as string),
        children: parseInt(children as string),
        currency: currency as string,
        lang: lang as string,
      });

      if (!hotels) {
        return res.status(500).json({ error: 'Failed to fetch hotels. The Hotellook API may require approval. Please contact support@travelpayouts.com' });
      }

      res.json(hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get hotel details
  app.get('/api/hotels/:hotelId', async (req, res) => {
    try {
      const { hotelId } = req.params;
      const { checkIn, checkOut, adults = 2, currency = 'USD' } = req.query;
      
      const hotel = await travelpayoutsService.getHotelDetails(hotelId, {
        checkIn: checkIn as string,
        checkOut: checkOut as string,
        adults: parseInt(adults as string),
        currency: currency as string,
      });

      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      res.json(hotel);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Affiliate link generation endpoint
  app.post('/api/affiliate/track', (req, res) => {
    try {
      const { activityId, title, price, category, type = 'activity', origin, destination, departureDate, returnDate } = req.body;
      
      let affiliateUrl: string;
      
      if (type === 'flight' && origin && destination) {
        affiliateUrl = travelpayoutsService.generateFlightAffiliateUrl(
          origin,
          destination,
          departureDate,
          returnDate
        );
      } else if (type === 'hotel') {
        affiliateUrl = travelpayoutsService.generateHotelAffiliateUrl(
          destination || 'tulum',
          departureDate,
          returnDate
        );
      } else {
        affiliateUrl = travelpayoutsService.generateActivityAffiliateUrl(activityId);
      }
      
      // Log the click for analytics (GA4 will handle the actual tracking)
      console.log('Affiliate click tracked:', {
        activityId,
        title,
        price,
        category,
        type,
        timestamp: new Date().toISOString(),
        ip: req.ip
      });

      res.json({ 
        success: true,
        affiliateUrl,
        marker: travelpayoutsService.getMarker()
      });
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
      res.status(500).json({ error: 'Failed to track click' });
    }
  });

  // Pexels API routes for images
  app.get('/api/pexels/search', async (req, res) => {
    try {
      const { query, per_page = 15, page = 1, orientation, size, color, locale } = req.query;
      
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }

      if (!pexelsService.isConfigured()) {
        return res.status(503).json({ error: 'Pexels service is not configured. Please set PEXELS_API_KEY environment variable.' });
      }

      const photos = await pexelsService.searchPhotos(query as string, {
        per_page: parseInt(per_page as string),
        page: parseInt(page as string),
        orientation: orientation as 'landscape' | 'portrait' | 'square' | undefined,
        size: size as 'large' | 'medium' | 'small' | undefined,
        color: color as string | undefined,
        locale: locale as string | undefined,
      });

      if (!photos) {
        return res.status(500).json({ error: 'Failed to fetch photos from Pexels' });
      }

      res.json({ photos });
    } catch (error) {
      console.error('Error fetching photos from Pexels:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get a random photo for a blog post query
  app.get('/api/pexels/blog-image', async (req, res) => {
    try {
      const { query, orientation = 'landscape' } = req.query;
      
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }

      if (!pexelsService.isConfigured()) {
        return res.status(503).json({ error: 'Pexels service is not configured. Please set PEXELS_API_KEY environment variable.' });
      }

      const imageUrl = await pexelsService.getBlogImage(
        query as string,
        800,
        600
      );

      if (!imageUrl) {
        return res.status(404).json({ error: 'No images found for the query' });
      }

      res.json({ imageUrl });
    } catch (error) {
      console.error('Error fetching blog image from Pexels:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Sitemap endpoint
  app.get('/sitemap.xml', (req, res) => {
    try {
      // Get site URL from environment or request
      const siteUrl = process.env.SITE_URL || 
                     process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                     req.protocol + '://' + req.get('host') || 'https://tulumtkts.com';
      
      const xml = generateSitemap(siteUrl);
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      res.send(xml);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  // Robots.txt endpoint
  app.get('/robots.txt', (req, res) => {
    // Get site URL from environment or request
    const siteUrl = process.env.SITE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                   req.protocol + '://' + req.get('host') || 'https://tulumtkts.com';
    
    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /affiliate-dashboard
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`;
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.send(robots);
  });
  
  // API endpoint for sitemap (for Vercel rewrites)
  app.get('/api/sitemap', (req, res) => {
    try {
      // Get site URL from environment or request
      let siteUrl = process.env.SITE_URL || 'https://tulumtkts.com';
      
      if (!siteUrl && process.env.VERCEL_URL) {
        siteUrl = `https://${process.env.VERCEL_URL}`;
      } else if (!siteUrl && req.get('host')) {
        siteUrl = `${req.protocol}://${req.get('host')}`;
      }
      
      const xml = generateSitemap(siteUrl);
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      res.send(xml);
    } catch (error: any) {
      // Even if sitemap generation fails, try to return a minimal sitemap
      console.error('Error generating sitemap:', error);
      try {
        const siteUrl = process.env.SITE_URL || 'https://tulumtkts.com';
        const minimalXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
        res.send(minimalXml);
      } catch (fallbackError) {
        res.status(500).send('Error generating sitemap');
      }
    }
  });
  
  // API endpoint for robots (for Vercel rewrites)
  app.get('/api/robots', (req, res) => {
    const siteUrl = process.env.SITE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                   req.protocol + '://' + req.get('host') || 'https://tulumtkts.com';
    
    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /affiliate-dashboard
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`;
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.send(robots);
  });

  // Routes registered, server will be created in index.ts
}
