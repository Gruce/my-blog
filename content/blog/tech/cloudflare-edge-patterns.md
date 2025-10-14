---
date: 2025-05-25
title: "Cloudflare Edge Patterns: Building Lightning-Fast Applications with Global Distribution"
tags: [edge, performance, latency, cloudflare, cdn]
category: tech
description: "Master Cloudflare's edge computing platform with proven patterns for caching, security, and performance. Learn how to build applications that feel instant worldwide while reducing costs and complexity."
ogImage:
  component: BlogPost
  props:
    title: "Cloudflare Edge Patterns: Building Lightning-Fast Applications"
    description: "Master Cloudflare's edge computing platform with proven patterns for caching, security, and performance."
    author: "Hassan K. Al-Khalidi"
    category: "tech"
    date: "May 25, 2025"
    readingTime: 15
---

The edge computing revolution has fundamentally changed how we think about application performance. By moving computation closer to users, we can turn latency from a technical constraint into a competitive advantage. Cloudflare's edge platform, with its 300+ data centers worldwide, provides the infrastructure to build applications that feel instant regardless of where your users are located.

After building and optimizing applications on Cloudflare's edge for multiple projects, I've learned that success isn't just about deploying code to the edge—it's about understanding the unique characteristics of edge computing and designing systems that leverage its strengths while working around its limitations.

This comprehensive guide distills years of experience into actionable patterns that reliably improve performance, reduce costs, and enhance user experience. Whether you're building a simple static site or a complex distributed application, these patterns will help you make the most of Cloudflare's edge platform.

## The Edge Computing Paradigm

Edge computing represents a fundamental shift from centralized to distributed computation. Instead of processing requests in a few large data centers, edge computing distributes processing power across hundreds of smaller locations closer to end users.

### Why Edge Computing Matters

**Latency Reduction**: The speed of light is a hard limit. By reducing the physical distance between users and computation, we can dramatically improve response times.

**Resilience**: Distributed systems are inherently more resilient than centralized ones. If one edge location fails, traffic automatically routes to the nearest available location.

**Cost Optimization**: Edge computing can reduce bandwidth costs by processing requests locally and only sending necessary data back to origin servers.

**Scalability**: Edge platforms can handle traffic spikes by distributing load across multiple locations rather than scaling up individual servers.

### Cloudflare's Edge Advantage

Cloudflare's edge platform offers several unique advantages:

**Global Network**: 300+ data centers in 100+ countries provide comprehensive global coverage.

**Integrated Services**: Edge computing, CDN, security, and DNS services work together seamlessly.

**Developer Experience**: Cloudflare Workers provides a familiar JavaScript runtime for edge computing.

**Performance**: Sub-50ms response times in most locations worldwide.

## Understanding Edge Computing Constraints

Before diving into patterns, it's crucial to understand the constraints and characteristics of edge computing:

### Runtime Limitations

**CPU Time**: Edge functions typically have strict CPU time limits (10-50ms for most operations).

**Memory**: Limited memory per request (128MB for Cloudflare Workers).

**Execution Time**: Total execution time is capped (30 seconds for HTTP requests).

**Cold Starts**: While faster than traditional serverless, there can still be initialization overhead.

### Network Characteristics

**Geographic Distribution**: Requests are processed in the location closest to the user.

**Origin Distance**: Edge locations may be far from your origin servers.

**Bandwidth**: Limited bandwidth for communication with origin servers.

**Latency**: Network latency between edge locations and origins can vary significantly.

### Data Access Patterns

**Local Storage**: Limited local storage options (KV, Durable Objects, R2).

**Database Access**: Direct database connections from edge are often impractical.

**Caching**: Edge caching is essential for performance and cost optimization.

**State Management**: Stateless design is preferred, but some stateful patterns are possible.

## Core Edge Patterns

### Pattern 1: Smart Caching Strategy

**The Problem**: Traditional caching strategies don't account for the unique characteristics of edge computing.

**The Solution**: Implement a multi-tier caching strategy that leverages edge locations for maximum performance.

**Implementation**:

```javascript
// Edge-first caching with origin fallback
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cacheKey = new Request(url, request);
    
    // Try edge cache first
    let response = await caches.default.match(cacheKey);
    
    if (!response) {
      // Try KV store for longer-term caching
      const kvValue = await env.CACHE_KV.get(url.pathname);
      
      if (kvValue) {
        response = new Response(kvValue, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600',
            'X-Cache': 'HIT-KV'
          }
        });
      } else {
        // Fall back to origin
        response = await fetch(request);
        
        // Cache successful responses
        if (response.ok) {
          const responseClone = response.clone();
          const body = await responseClone.text();
          
          // Cache in both edge cache and KV
          caches.default.put(cacheKey, response.clone());
          await env.CACHE_KV.put(url.pathname, body, {
            expirationTtl: 3600
          });
        }
      }
    } else {
      response.headers.set('X-Cache', 'HIT-EDGE');
    }
    
    return response;
  }
};
```

**Best Practices**:
- Use appropriate TTL values based on data freshness requirements
- Implement cache invalidation strategies
- Monitor cache hit rates and adjust strategies accordingly
- Use different caching strategies for different types of content

### Pattern 2: Request Routing and Load Balancing

**The Problem**: Distributing requests efficiently across multiple origin servers while maintaining performance.

**The Solution**: Implement intelligent routing at the edge that considers server health, geographic proximity, and load.

**Implementation**:

```javascript
export default {
  async fetch(request, env) {
    const origins = [
      'https://origin1.example.com',
      'https://origin2.example.com',
      'https://origin3.example.com'
    ];
    
    // Get user's country for geographic routing
    const country = request.cf.country;
    
    // Select origin based on geographic proximity
    let selectedOrigin = origins[0]; // Default
    
    if (country === 'US') {
      selectedOrigin = origins[0];
    } else if (country === 'EU') {
      selectedOrigin = origins[1];
    } else {
      selectedOrigin = origins[2];
    }
    
    // Try primary origin with fallback
    try {
      const response = await fetch(selectedOrigin + request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
      
      if (response.ok) {
        return response;
      }
    } catch (error) {
      console.log('Primary origin failed, trying fallback');
    }
    
    // Fallback to other origins
    for (const origin of origins) {
      if (origin !== selectedOrigin) {
        try {
          const response = await fetch(origin + request.url, {
            method: request.method,
            headers: request.headers,
            body: request.body
          });
          
          if (response.ok) {
            return response;
          }
        } catch (error) {
          continue;
        }
      }
    }
    
    return new Response('Service unavailable', { status: 503 });
  }
};
```

**Best Practices**:
- Implement health checks for origin servers
- Use geographic routing when appropriate
- Implement circuit breakers for failing origins
- Monitor and log routing decisions

### Pattern 3: Security and Authentication

**The Problem**: Implementing security measures at the edge while maintaining performance.

**The Solution**: Use edge computing for lightweight security checks and authentication validation.

**Implementation**:

```javascript
export default {
  async fetch(request, env) {
    // Rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP');
    const rateLimitKey = `rate_limit:${clientIP}`;
    
    const rateLimit = await env.RATE_LIMIT_KV.get(rateLimitKey);
    if (rateLimit && parseInt(rateLimit) > 100) {
      return new Response('Rate limit exceeded', { status: 429 });
    }
    
    // Increment rate limit counter
    await env.RATE_LIMIT_KV.put(rateLimitKey, 
      (parseInt(rateLimit) || 0) + 1, 
      { expirationTtl: 3600 }
    );
    
    // JWT validation
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const payload = await verifyJWT(token, env.JWT_SECRET);
        
        // Add user info to request headers
        const modifiedRequest = new Request(request, {
          headers: {
            ...request.headers,
            'X-User-ID': payload.userId,
            'X-User-Role': payload.role
          }
        });
        
        return fetch(modifiedRequest);
      } catch (error) {
        return new Response('Invalid token', { status: 401 });
      }
    }
    
    // For public endpoints, continue without authentication
    return fetch(request);
  }
};

async function verifyJWT(token, secret) {
  // Simplified JWT verification
  // In production, use a proper JWT library
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }
  
  const payload = JSON.parse(atob(parts[1]));
  const now = Math.floor(Date.now() / 1000);
  
  if (payload.exp < now) {
    throw new Error('Token expired');
  }
  
  return payload;
}
```

**Best Practices**:
- Implement rate limiting to prevent abuse
- Use JWT for stateless authentication
- Validate tokens at the edge when possible
- Implement proper error handling and logging

### Pattern 4: Dynamic Content Generation

**The Problem**: Generating personalized content at the edge while maintaining performance.

**The Solution**: Use edge computing to generate dynamic content based on user context and cached data.

**Implementation**:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Get user context
    const country = request.cf.country;
    const city = request.cf.city;
    const userAgent = request.headers.get('User-Agent');
    
    // Generate personalized content
    const personalizedContent = await generatePersonalizedContent({
      country,
      city,
      userAgent,
      env
    });
    
    return new Response(JSON.stringify(personalizedContent), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // 5 minutes
        'X-Generated-At': new Date().toISOString()
      }
    });
  }
};

async function generatePersonalizedContent(context) {
  const { country, city, userAgent, env } = context;
  
  // Get localized content from KV
  const localizedContent = await env.CONTENT_KV.get(`content:${country}`);
  const baseContent = JSON.parse(localizedContent || '{}');
  
  // Detect device type
  const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
  
  // Generate personalized recommendations
  const recommendations = await generateRecommendations({
    location: { country, city },
    device: isMobile ? 'mobile' : 'desktop',
    env
  });
  
  return {
    ...baseContent,
    recommendations,
    device: isMobile ? 'mobile' : 'desktop',
    location: { country, city },
    timestamp: new Date().toISOString()
  };
}

async function generateRecommendations(context) {
  // Simplified recommendation logic
  // In production, this would use ML models or complex algorithms
  const { location, device, env } = context;
  
  const popularItems = await env.POPULAR_KV.get(`popular:${location.country}`);
  const items = JSON.parse(popularItems || '[]');
  
  return items.slice(0, device === 'mobile' ? 3 : 5);
}
```

**Best Practices**:
- Cache generated content appropriately
- Use user context for personalization
- Implement fallbacks for missing data
- Monitor performance of dynamic generation

### Pattern 5: API Gateway and Request Transformation

**The Problem**: Managing multiple APIs and transforming requests/responses at the edge.

**The Solution**: Implement an API gateway pattern at the edge for request routing, transformation, and aggregation.

**Implementation**:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Route to appropriate service
    if (path.startsWith('/api/users')) {
      return handleUserAPI(request, env);
    } else if (path.startsWith('/api/products')) {
      return handleProductAPI(request, env);
    } else if (path.startsWith('/api/orders')) {
      return handleOrderAPI(request, env);
    }
    
    // Default response
    return new Response('Not found', { status: 404 });
  }
};

async function handleUserAPI(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/users', '');
  
  // Transform request for user service
  const userServiceRequest = new Request(
    `https://user-service.example.com${path}`,
    {
      method: request.method,
      headers: {
        ...request.headers,
        'X-Service': 'user-service',
        'X-Request-ID': crypto.randomUUID()
      },
      body: request.body
    }
  );
  
  const response = await fetch(userServiceRequest);
  
  // Transform response
  if (response.ok) {
    const data = await response.json();
    
    // Add additional fields or transform data
    const transformedData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'edge-gateway'
    };
    
    return new Response(JSON.stringify(transformedData), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'X-Transformed': 'true'
      }
    });
  }
  
  return response;
}

async function handleProductAPI(request, env) {
  // Similar implementation for product API
  // ...
}

async function handleOrderAPI(request, env) {
  // Similar implementation for order API
  // ...
}
```

**Best Practices**:
- Implement proper request/response transformation
- Add monitoring and logging
- Handle errors gracefully
- Use consistent error formats

## Advanced Edge Patterns

### Pattern 6: Real-time Data Synchronization

**The Problem**: Keeping data synchronized across edge locations in real-time.

**The Solution**: Use Durable Objects for stateful edge computing and real-time synchronization.

**Implementation**:

```javascript
// Durable Object for real-time synchronization
export class RealtimeSync {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }
  
  async fetch(request) {
    const url = new URL(request.url);
    
    if (request.method === 'POST') {
      // Update data
      const data = await request.json();
      await this.state.storage.put('data', data);
      
      // Notify all connected clients
      const clients = this.state.getWebSockets();
      for (const client of clients) {
        client.send(JSON.stringify({
          type: 'update',
          data: data,
          timestamp: Date.now()
        }));
      }
      
      return new Response('OK');
    } else if (request.method === 'GET') {
      // Get current data
      const data = await this.state.storage.get('data');
      return new Response(JSON.stringify(data || {}));
    }
    
    return new Response('Method not allowed', { status: 405 });
  }
  
  async webSocket(ws) {
    // Handle WebSocket connections for real-time updates
    ws.accept();
    
    // Send current data to new client
    const data = await this.state.storage.get('data');
    ws.send(JSON.stringify({
      type: 'init',
      data: data || {},
      timestamp: Date.now()
    }));
  }
}

// Worker that uses the Durable Object
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const id = env.REALTIME_SYNC.idFromName('global');
    const obj = env.REALTIME_SYNC.get(id);
    
    return obj.fetch(request);
  }
};
```

### Pattern 7: Edge-Side Includes (ESI)

**The Problem**: Combining static and dynamic content efficiently at the edge.

**The Solution**: Use edge-side includes to compose pages from multiple sources.

**Implementation**:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/dashboard') {
      // Compose dashboard from multiple sources
      const [header, content, footer] = await Promise.all([
        fetch('https://api.example.com/header'),
        fetch('https://api.example.com/dashboard-content'),
        fetch('https://api.example.com/footer')
      ]);
      
      const headerHtml = await header.text();
      const contentHtml = await content.text();
      const footerHtml = await footer.text();
      
      const composedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Dashboard</title>
            <style>
              /* Inline critical CSS */
              body { font-family: Arial, sans-serif; margin: 0; }
              .header { background: #333; color: white; padding: 1rem; }
              .content { padding: 2rem; }
              .footer { background: #f5f5f5; padding: 1rem; text-align: center; }
            </style>
          </head>
          <body>
            <div class="header">${headerHtml}</div>
            <div class="content">${contentHtml}</div>
            <div class="footer">${footerHtml}</div>
          </body>
        </html>
      `;
      
      return new Response(composedHtml, {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=300'
        }
      });
    }
    
    return fetch(request);
  }
};
```

### Pattern 8: A/B Testing at the Edge

**The Problem**: Implementing A/B tests without impacting performance.

**The Solution**: Use edge computing to determine test variants and serve appropriate content.

**Implementation**:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Determine A/B test variant
    const variant = await determineABTestVariant(request, env);
    
    // Route to appropriate content based on variant
    if (variant === 'A') {
      return serveVariantA(request, env);
    } else {
      return serveVariantB(request, env);
    }
  }
};

async function determineABTestVariant(request, env) {
  const clientIP = request.headers.get('CF-Connecting-IP');
  const userAgent = request.headers.get('User-Agent');
  
  // Create consistent hash for user
  const userHash = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(clientIP + userAgent)
  );
  
  const hashValue = new Uint8Array(userHash)[0];
  
  // 50/50 split
  return hashValue < 128 ? 'A' : 'B';
}

async function serveVariantA(request, env) {
  // Serve variant A content
  const content = await env.CONTENT_KV.get('variant-a');
  return new Response(content, {
    headers: {
      'Content-Type': 'text/html',
      'X-AB-Test': 'A'
    }
  });
}

async function serveVariantB(request, env) {
  // Serve variant B content
  const content = await env.CONTENT_KV.get('variant-b');
  return new Response(content, {
    headers: {
      'Content-Type': 'text/html',
      'X-AB-Test': 'B'
    }
  });
}
```

## Performance Optimization Strategies

### Caching Optimization

**Cache Key Design**: Design cache keys that maximize hit rates while maintaining data freshness.

```javascript
function generateCacheKey(request, context) {
  const url = new URL(request.url);
  const country = context.country;
  const userAgent = request.headers.get('User-Agent');
  const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
  
  // Include relevant factors in cache key
  return `${url.pathname}:${country}:${isMobile ? 'mobile' : 'desktop'}`;
}
```

**Cache Invalidation**: Implement smart cache invalidation strategies.

```javascript
async function invalidateCache(pattern, env) {
  // Invalidate edge cache
  await caches.default.delete(pattern);
  
  // Invalidate KV store
  const keys = await env.CACHE_KV.list({ prefix: pattern });
  for (const key of keys.keys) {
    await env.CACHE_KV.delete(key.name);
  }
}
```

### Request Optimization

**Request Deduplication**: Prevent duplicate requests to origin servers.

```javascript
const pendingRequests = new Map();

export default {
  async fetch(request, env) {
    const cacheKey = request.url;
    
    if (pendingRequests.has(cacheKey)) {
      // Wait for existing request
      return pendingRequests.get(cacheKey);
    }
    
    const promise = fetch(request);
    pendingRequests.set(cacheKey, promise);
    
    try {
      const response = await promise;
      return response;
    } finally {
      pendingRequests.delete(cacheKey);
    }
  }
};
```

**Request Batching**: Batch multiple requests to reduce origin load.

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/batch') {
      const requests = await request.json();
      
      const responses = await Promise.all(
        requests.map(req => fetch(req.url, req.options))
      );
      
      return new Response(JSON.stringify(responses), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return fetch(request);
  }
};
```

## Monitoring and Observability

### Performance Monitoring

**Response Time Tracking**: Monitor response times across different edge locations.

```javascript
export default {
  async fetch(request, env) {
    const startTime = Date.now();
    
    try {
      const response = await fetch(request);
      
      const responseTime = Date.now() - startTime;
      
      // Log performance metrics
      await env.ANALYTICS_KV.put(
        `perf:${Date.now()}`,
        JSON.stringify({
          url: request.url,
          responseTime,
          status: response.status,
          location: request.cf.colo
        }),
        { expirationTtl: 86400 }
      );
      
      return response;
    } catch (error) {
      // Log errors
      await env.ERRORS_KV.put(
        `error:${Date.now()}`,
        JSON.stringify({
          url: request.url,
          error: error.message,
          location: request.cf.colo
        }),
        { expirationTtl: 86400 }
      );
      
      throw error;
    }
  }
};
```

**Cache Hit Rate Monitoring**: Track cache performance.

```javascript
export default {
  async fetch(request, env) {
    const cacheKey = new Request(request.url, request);
    const cachedResponse = await caches.default.match(cacheKey);
    
    if (cachedResponse) {
      // Log cache hit
      await env.CACHE_STATS_KV.put(
        `hit:${Date.now()}`,
        JSON.stringify({
          url: request.url,
          location: request.cf.colo
        }),
        { expirationTtl: 86400 }
      );
      
      return cachedResponse;
    }
    
    // Log cache miss
    await env.CACHE_STATS_KV.put(
      `miss:${Date.now()}`,
      JSON.stringify({
        url: request.url,
        location: request.cf.colo
      }),
      { expirationTtl: 86400 }
    );
    
    const response = await fetch(request);
    
    if (response.ok) {
      caches.default.put(cacheKey, response.clone());
    }
    
    return response;
  }
};
```

## Security Considerations

### Input Validation

**Sanitization**: Validate and sanitize all inputs at the edge.

```javascript
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Sanitize query parameters
    const sanitizedParams = new URLSearchParams();
    for (const [key, value] of searchParams) {
      sanitizedParams.set(key, sanitizeInput(value));
    }
    
    // Create new request with sanitized parameters
    const sanitizedUrl = new URL(request.url);
    sanitizedUrl.search = sanitizedParams.toString();
    
    const sanitizedRequest = new Request(sanitizedUrl, request);
    
    return fetch(sanitizedRequest);
  }
};
```

### Rate Limiting

**Advanced Rate Limiting**: Implement sophisticated rate limiting strategies.

```javascript
export default {
  async fetch(request, env) {
    const clientIP = request.headers.get('CF-Connecting-IP');
    const userAgent = request.headers.get('User-Agent');
    
    // Different rate limits for different endpoints
    const url = new URL(request.url);
    const endpoint = url.pathname;
    
    let rateLimit = 100; // Default
    if (endpoint.startsWith('/api/')) {
      rateLimit = 50;
    } else if (endpoint.startsWith('/upload/')) {
      rateLimit = 10;
    }
    
    const rateLimitKey = `rate:${clientIP}:${endpoint}`;
    const currentCount = await env.RATE_LIMIT_KV.get(rateLimitKey);
    
    if (currentCount && parseInt(currentCount) >= rateLimit) {
      return new Response('Rate limit exceeded', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': rateLimit.toString(),
          'X-RateLimit-Remaining': '0'
        }
      });
    }
    
    // Increment counter
    await env.RATE_LIMIT_KV.put(
      rateLimitKey,
      (parseInt(currentCount) || 0) + 1,
      { expirationTtl: 3600 }
    );
    
    return fetch(request);
  }
};
```

## Cost Optimization

### Bandwidth Optimization

**Response Compression**: Compress responses to reduce bandwidth usage.

```javascript
export default {
  async fetch(request, env) {
    const response = await fetch(request);
    
    if (response.ok && response.headers.get('Content-Type')?.includes('text')) {
      const text = await response.text();
      const compressed = new CompressionStream('gzip');
      const writer = compressed.writable.getWriter();
      const reader = compressed.readable.getReader();
      
      writer.write(new TextEncoder().encode(text));
      writer.close();
      
      const chunks = [];
      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) chunks.push(value);
      }
      
      const compressedData = new Uint8Array(
        chunks.reduce((acc, chunk) => acc + chunk.length, 0)
      );
      let offset = 0;
      for (const chunk of chunks) {
        compressedData.set(chunk, offset);
        offset += chunk.length;
      }
      
      return new Response(compressedData, {
        headers: {
          ...response.headers,
          'Content-Encoding': 'gzip',
          'Content-Length': compressedData.length.toString()
        }
      });
    }
    
    return response;
  }
};
```

### Origin Load Reduction

**Smart Caching**: Implement intelligent caching to reduce origin server load.

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Check if content should be cached
    const shouldCache = shouldCacheRequest(request);
    
    if (shouldCache) {
      const cacheKey = new Request(url, request);
      const cachedResponse = await caches.default.match(cacheKey);
      
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    const response = await fetch(request);
    
    if (shouldCache && response.ok) {
      caches.default.put(cacheKey, response.clone());
    }
    
    return response;
  }
};

function shouldCacheRequest(request) {
  const url = new URL(request.url);
  
  // Cache static assets
  if (url.pathname.match(/\.(css|js|png|jpg|gif|svg)$/)) {
    return true;
  }
  
  // Cache API responses for GET requests
  if (request.method === 'GET' && url.pathname.startsWith('/api/')) {
    return true;
  }
  
  return false;
}
```

## Common Pitfalls and Solutions

### Pitfall 1: Over-Caching

**Problem**: Caching too aggressively can lead to stale data and poor user experience.

**Solution**: Implement appropriate cache invalidation and TTL strategies.

```javascript
// Smart cache TTL based on content type
function getCacheTTL(request) {
  const url = new URL(request.url);
  
  if (url.pathname.match(/\.(css|js|png|jpg|gif|svg)$/)) {
    return 86400; // 24 hours for static assets
  } else if (url.pathname.startsWith('/api/')) {
    return 300; // 5 minutes for API responses
  } else {
    return 60; // 1 minute for dynamic content
  }
}
```

### Pitfall 2: Cold Start Performance

**Problem**: Cold starts can impact performance for infrequently accessed functions.

**Solution**: Implement warming strategies and optimize initialization.

```javascript
// Optimize cold starts by pre-loading dependencies
const dependencies = {
  // Pre-load commonly used modules
  crypto: globalThis.crypto,
  fetch: globalThis.fetch
};

export default {
  async fetch(request, env) {
    // Use pre-loaded dependencies
    const response = await dependencies.fetch(request);
    return response;
  }
};
```

### Pitfall 3: Memory Leaks

**Problem**: Edge functions can accumulate memory over time.

**Solution**: Implement proper cleanup and resource management.

```javascript
export default {
  async fetch(request, env) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    try {
      const response = await fetch(request, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
};
```

## Best Practices Summary

### Development Best Practices

1. **Start Simple**: Begin with basic caching and gradually add complexity
2. **Test Locally**: Use Wrangler for local development and testing
3. **Monitor Performance**: Implement comprehensive monitoring from day one
4. **Version Control**: Use proper versioning for edge functions
5. **Documentation**: Document edge-specific behavior and constraints

### Deployment Best Practices

1. **Gradual Rollout**: Use canary deployments for edge functions
2. **Rollback Strategy**: Always have a rollback plan
3. **Environment Separation**: Use different environments for testing and production
4. **Configuration Management**: Externalize configuration and secrets
5. **Health Checks**: Implement health checks for edge functions

### Operational Best Practices

1. **Monitoring**: Set up alerts for performance and error rates
2. **Logging**: Implement structured logging for debugging
3. **Metrics**: Track key performance indicators
4. **Incident Response**: Have procedures for handling edge function failures
5. **Capacity Planning**: Monitor usage and plan for scaling

## Conclusion

Cloudflare's edge computing platform provides powerful capabilities for building fast, resilient, and cost-effective applications. The patterns outlined in this guide represent proven approaches that have been successfully implemented across various projects and use cases.

The key to success with edge computing lies in understanding its unique characteristics and constraints, then designing systems that leverage its strengths while working around its limitations. By implementing these patterns thoughtfully and monitoring their performance carefully, you can build applications that provide exceptional user experiences while reducing costs and complexity.

Remember that edge computing is not a silver bullet—it's a tool that, when used appropriately, can significantly improve your application's performance and user experience. Start with simple patterns, measure their impact, and gradually add complexity as your needs evolve.

The future of web development is distributed, and edge computing is a crucial part of that future. By mastering these patterns now, you'll be well-positioned to build the next generation of web applications that are fast, reliable, and truly global.

## Table of Contents

1. [Where the Edge Wins](#where-the-edge-wins)
2. [Caching Beyond Assets](#caching-beyond-assets)
3. [State and Coordination](#state-and-coordination)
4. [Data at the Edge](#data-at-the-edge)
5. [Security and Safety](#security-and-safety)
6. [Observability and Tuning](#observability-and-tuning)
7. [Rollout Strategy](#rollout-strategy)
8. [Common Pitfalls](#common-pitfalls)

## Where the Edge Wins

- **Latency**: Shorter round‑trips for time‑sensitive paths
- **Availability**: Survive regional failures with smart fallbacks
- **Cost**: Offload hot reads from origin infrastructure
- **Scale**: Absorb spikes with cache and lightweight compute

## Caching Beyond Assets

- **Cache HTML** for anonymous users; keep TTLs short and revalidate in background
- **Key design**: Include only fields that materially change content
- **Personalization split**: Edge for layout/data shells; hydrate private bits later
- **Invalidate deliberately**: Purge on content updates, not on every request

## State and Coordination

- **Coordination**: Use durable coordination for counters, sessions, and queues
- **Locality**: Keep related work in the same location to minimize hops
- **Idempotency**: Make retried edge work safe by design
- **Back‑pressure**: Bound queues and reject early on overload

## Data at the Edge

- **Configs and flags**: Use edge‑local KV or config stores
- **Warm paths**: Replicate read‑heavy data close to users
- **Consistency**: Be explicit about eventual vs. strong needs
- **Fallbacks**: Define behavior when data is cold or unavailable

## Security and Safety

- **Zero trust mindset**: Validate inputs at the edge; sanitize aggressively
- **Secrets**: Rotate and scope narrowly; avoid leaking via logs
- **Abuse protection**: Rate limit and challenge suspicious traffic
- **Privacy**: Minimize sensitive data at the edge; anonymize where possible

## Observability and Tuning

- **Hit ratios**: Track cache hits/misses by route and geography
- **Tail latency**: Watch P95/P99; they define perceived speed
- **Request sampling**: Log representative requests for analysis
- **Feature flags**: Roll out per‑route and per‑region; compare metrics

## Rollout Strategy

1. Pick one hot, cacheable path
2. Ship behind a flag to a small region
3. Measure hit ratio, latency, and error budget
4. Iterate keys/headers until results stabilize
5. Expand gradually; keep an easy rollback

## Common Pitfalls

- **Cache stampedes**: Use locks or SWR to avoid thundering herds
- **Over‑personalization**: Busts cache and hurts latency
- **Edge‑origin mismatch**: Excess round‑trips negate benefits
- **Under‑observed rollouts**: Fly blind and miss regressions

Latency is a feature. Put the right logic near users, measure relentlessly, and let the data guide how far you go.