import express, { Request, Response, NextFunction } from 'express';

const app = express();

interface ClientRecord {
  count: number;
  resetTime: number;
}

const requestTracker = new Map<string, ClientRecord>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 50;     // Max 50 requests per window

function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const record = requestTracker.get(clientIp);

  if (!record || now > record.resetTime) {
    requestTracker.set(clientIp, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    res.status(429).json({
      error: 'Too Many Requests',
      retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
    });
    return;
  }

  record.count++;
  next();
}

app.use(rateLimiter);

app.get('/api/resource', (req: Request, res: Response) => {
  res.json({ message: 'Request processed successfully.' });
});

app.listen(3000, () => console.log('Server running on port 3000'));