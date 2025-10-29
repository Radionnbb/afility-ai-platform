# Afility AI Platform - Setup Guide

## Quick Start

### 1. Clone and Install

\`\`\`bash
git clone https://github.com/Radionnbb/afility-ai-platform.git
cd afility-ai-platform
npm install
\`\`\`

### 2. Configure Environment

\`\`\`bash
cp .env.placeholder .env.local
\`\`\`

Edit `.env.local` with your API credentials:

\`\`\`env
# Required for core functionality
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
OPENAI_API_KEY=your_key
GEMINI_API_KEY=your_key

# Optional integrations
MANUS_API_KEY=your_key
ADMITAD_CLIENT_ID=your_id
ADMITAD_CLIENT_SECRET=your_secret
ADMITAD_BASE64_HEADER=your_header
AMAZON_ASSOCIATE_TAG=your_tag
\`\`\`

### 3. Setup Database

Run the migration script:

\`\`\`bash
# The script is located at scripts/01-create-searches-table.sql
# Execute it in your Supabase SQL editor or via CLI
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000`

### 5. Run Tests

\`\`\`bash
npm run test
\`\`\`

## API Credentials Setup

### Supabase
1. Create account at https://supabase.com
2. Create new project
3. Copy URL and anon key from project settings
4. Generate service role key

### OpenAI
1. Visit https://platform.openai.com
2. Create API key
3. Set usage limits for safety

### Gemini AI
1. Visit https://ai.google.dev
2. Create API key
3. Enable Generative AI API

### Manus API
1. Sign up at https://manus.ai
2. Create API key
3. Add to environment

### Admitad
1. Register at https://admitad.com
2. Create OAuth application
3. Get client ID and secret
4. Generate base64 header: `base64(client_id:client_secret)`

### Amazon Associates
1. Join Amazon Associates Program
2. Get your Associate Tag
3. Add to environment

## Project Structure

\`\`\`
afility-ai-platform/
├── app/
│   ├── api/
│   │   ├── search/              # Original search endpoint
│   │   ├── search-orchestrated/ # Enhanced search
│   │   ├── health/              # Health check
│   │   └── ...
│   ├── search/                  # Search page
│   ├── results/                 # Results page
│   ├── live-agent/              # Live agent view
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── integrations/
│   │   ├── manus.ts
│   │   ├── admitad.ts
│   │   ├── openai-analysis.ts
│   │   ├── affiliate-generator.ts
│   │   └── index.ts
│   ├── security/
│   │   ├── rate-limiter.ts
│   │   ├── sanitize.ts
│   │   ├── validation.ts
│   │   └── middleware.ts
│   ├── config/
│   │   └── env.ts
│   ├── search-orchestrator.ts
│   ├── supabase.ts
│   └── utils.ts
├── components/
│   └── ui/                      # shadcn components
├── __tests__/
│   ├── integrations/
│   ├── security/
│   └── orchestrator/
├── scripts/
│   └── 01-create-searches-table.sql
├── .github/
│   └── workflows/
│       └── ci.yml
├── middleware.ts
├── .env.placeholder
├── ENHANCEMENTS.md
├── SETUP_GUIDE.md
└── package.json
\`\`\`

## Key Features

### Search Methods
- **Text Search**: Search by product name or description
- **Image Search**: Upload product image for analysis
- **URL Search**: Paste product URL for detailed analysis

### Results Display
- **Best Deal Highlighting**: Prominently shows cheapest option
- **Filtering**: Filter by store, price range
- **Sorting**: Sort by price, rating, reviews
- **AI Analysis**: Pros, cons, and recommendations

### Live Agent View
- **Real-time Progress**: Watch analysis steps
- **Performance Metrics**: See how long each step takes
- **Status Updates**: Know what's happening

### Security
- **Rate Limiting**: 10 requests per minute per user
- **Input Validation**: All inputs validated with Zod
- **Secure Headers**: XSS, CSRF, and other protections
- **RLS**: Row-level security on database

## Common Issues

### "API key not configured"
- Check `.env.local` has all required keys
- Restart dev server after changing env
- Run `/api/health` to check status

### "Rate limit exceeded"
- Wait 1 minute before making new requests
- Adjust `RATE_LIMIT_MAX_REQUESTS` in `.env.local`

### "Database connection failed"
- Verify Supabase credentials
- Check database is running
- Run migration script

### "Search returns no results"
- Check internet connection
- Verify API credentials are valid
- Try different search query

## Performance Tips

1. **Enable Caching**: Set `CACHE_TTL_HOURS=24`
2. **Optimize Images**: Use WebP format
3. **Lazy Load Results**: Implement pagination
4. **Use CDN**: Deploy to Vercel for edge caching
5. **Monitor Performance**: Check `/api/health`

## Deployment

### Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
\`\`\`

### Deploy to Other Platforms

1. Build: `npm run build`
2. Start: `npm run start`
3. Set environment variables
4. Configure database connection

## Monitoring

### Health Check
\`\`\`bash
curl http://localhost:3000/api/health
\`\`\`

### View Logs
\`\`\`bash
# Development
npm run dev

# Production
vercel logs
\`\`\`

### Debug Mode
Add `[v0]` prefix to console logs for easy filtering:
\`\`\`typescript
console.log("[v0] Debug message:", data)
\`\`\`

## Testing

### Run All Tests
\`\`\`bash
npm run test
\`\`\`

### Watch Mode
\`\`\`bash
npm run test:watch
\`\`\`

### Coverage Report
\`\`\`bash
npm run test:coverage
\`\`\`

### Test Specific File
\`\`\`bash
npm run test -- __tests__/integrations/manus.test.ts
\`\`\`

## Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Run tests: `npm run test`
4. Run linter: `npm run lint`
5. Commit: `git commit -m "feat: description"`
6. Push: `git push origin feature/name`
7. Create pull request

## Troubleshooting

### Port Already in Use
\`\`\`bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
\`\`\`

### Clear Cache
\`\`\`bash
rm -rf .next
npm run dev
\`\`\`

### Reset Database
\`\`\`bash
# Drop all tables and re-run migration
# In Supabase SQL editor, run:
DROP TABLE IF EXISTS affiliate_links CASCADE;
DROP TABLE IF EXISTS product_cache CASCADE;
DROP TABLE IF EXISTS searches CASCADE;

# Then run migration script again
\`\`\`

## Next Steps

1. Customize branding in `app/page.tsx`
2. Add more integrations in `lib/integrations/`
3. Implement user authentication
4. Add analytics tracking
5. Deploy to production

## Support

- GitHub Issues: https://github.com/Radionnbb/afility-ai-platform/issues
- Documentation: See `ENHANCEMENTS.md`
- Tests: Check `__tests__/` for usage examples

## License

MIT - See LICENSE file
