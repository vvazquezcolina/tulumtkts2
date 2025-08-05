import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getYourGuideService } from "./services/getyourguide";

export async function registerRoutes(app: Express): Promise<Server> {
  // GetYourGuide API routes
  app.get('/api/experiences/tulum', async (req, res) => {
    try {
      const { page = 1, per_page = 12, category, sort_by, language = 'es', currency = 'EUR' } = req.query;
      
      const activities = await getYourGuideService.searchTulumActivities({
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
      const activity = await getYourGuideService.getActivityDetails(activityId);

      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      res.json(activity);
    } catch (error) {
      console.error('Error fetching activity details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/getyourguide/status', (req, res) => {
    const status = getYourGuideService.getStatus();
    res.json(status);
  });

  // Affiliate link generation endpoint
  app.post('/api/affiliate/track', (req, res) => {
    try {
      const { activityId, title, price, category } = req.body;
      const affiliateUrl = getYourGuideService.generateAffiliateUrl(activityId);
      
      // Log the click for analytics (you could store this in database)
      console.log('Affiliate click tracked:', {
        activityId,
        title,
        price,
        category,
        timestamp: new Date().toISOString(),
        ip: req.ip
      });

      res.json({ 
        success: true,
        affiliateUrl,
        partnerId: 'EBGURF8'
      });
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
      res.status(500).json({ error: 'Failed to track click' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
