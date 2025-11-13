import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { setupVite, serveStatic, log } from "../server/vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  res.on("error", (err) => {
    log(`Response error for ${req.method} ${path}: ${err.message}`);
  });

  next();
});

(async () => {
  // Register API routes first
  await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    log(`Error handler: ${status} - ${message}`);
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
    // Don't throw error after sending response
  });

  // Add a test middleware to verify requests are reaching the app
  app.use((req, res, next) => {
    log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });

  // Handle both Vercel serverless and traditional server environments
  const port = parseInt(process.env.PORT || '3000', 10);
  
  // Create HTTP server after routes are registered but before Vite setup
  const { createServer } = await import("http");
  const server = createServer(app);
  
  // In Vercel, we're in production mode but serverless
  // Don't setup Vite or serve static files - Vercel handles static files
  // Only setup Vite in local development when not in Vercel
  if (app.get("env") === "development" && process.env.VERCEL !== '1') {
    await setupVite(app, server);
  } else if (process.env.VERCEL !== '1') {
    // Only serve static files in non-Vercel production
    serveStatic(app);
  }
  // In Vercel, static files are served automatically, we just handle API routes
  
  // Only start the server if we're not in a serverless environment
  if (process.env.VERCEL !== '1') {
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        log(`Port ${port} is already in use. Please use a different port.`);
      } else {
        log(`Server error: ${err.message}`);
      }
      process.exit(1);
    });

    server.listen(port, "127.0.0.1", () => {
      log(`serving on port ${port}`);
      log(`Server listening on http://127.0.0.1:${port}`);
    });
  }
})().catch((err) => {
  log(`Failed to start server: ${err.message}`);
  console.error(err);
  process.exit(1);
});

// Export for Vercel serverless functions
export default app;
