import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import { fileURLToPath } from "url";
import viteConfig from "../vite.config.js";
import { nanoid } from "nanoid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  try {
    const serverOptions = {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true as const,
    };

    log("Initializing Vite server...");
    const vite = await createViteServer({
      ...viteConfig,
      configFile: false,
      customLogger: {
        ...viteLogger,
        error: (msg, options) => {
          viteLogger.error(msg, options);
          log(`Vite error: ${msg}`);
          // Don't exit on error, just log it
        },
      },
      server: {
        ...serverOptions,
        port: undefined, // Don't let Vite create its own server
      },
      appType: "custom",
    });

    log("Vite server initialized successfully");
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      log(`Processing request for: ${req.method} ${url}`);

      try {
        const clientTemplate = path.resolve(
          __dirname,
          "..",
          "client",
          "index.html",
        );

        log(`Reading template from: ${clientTemplate}`);
        // always reload the index.html file from disk incase it changes
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`,
        );
        log(`Transforming HTML with Vite...`);
        const page = await vite.transformIndexHtml(url, template);
        log(`Sending response for ${url}`);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        log(`Error processing request for ${url}: ${(e as Error).message}`);
        console.error(e);
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } catch (error) {
    log(`Failed to setup Vite: ${(error as Error).message}`);
    console.error(error);
    throw error;
  }
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
