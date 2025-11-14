// Simple logger utility that doesn't depend on Vite
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const prefix = `[${formattedTime}] [${source.toUpperCase()}]`;
  console.log(`${prefix} ${message}`);
}

