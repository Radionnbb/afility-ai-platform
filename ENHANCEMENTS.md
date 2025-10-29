# Afility AI Platform - Comprehensive Enhancements

This document outlines all the enhancements made to transform Afility into a fully-integrated price comparison platform with AI analysis and affiliate link generation.

## Overview

The enhanced Afility platform now includes:
- Multi-source API integrations (Manus, Admitad, OpenAI)
- Intelligent search orchestration
- Real-time live agent view
- Enhanced results with AI analysis
- Comprehensive security and rate limiting
- Full test coverage

## Architecture

### 1. API Integrations

#### Manus Integration (`lib/integrations/manus.ts`)
- Extracts product data from URLs
- Returns structured product information (title, price, image, rating, reviews)
- Handles API errors gracefully with fallback mechanisms

**Usage:**
\`\`\`typescript
import { fetchManusProduct } from "@/lib/integrations/manus"

const result = await fetchManusProduct("https://example.com/product")
if (result.success) {
  console.log(result.product)
}
\`\`\`

#### Admitad Integration (`lib/integrations/admitad.ts`)
- Searches for product alternatives
- Generates affiliate deeplinks
- Manages OAuth token flow
- Supports Amazon Associate tags

**Usage:**
\`\`\`typescript
import { searchAdmitadProducts, generateAffiliateLink } from "@/lib/integrations/admitad"

const products = await searchAdmitadProducts("laptop")
const affiliateUrl = await generateAffiliateLink("Amazon", url, asin)
\`\`\`

#### OpenAI Integration (`lib/integrations/openai-analysis.ts`)
- Analyzes products with AI
- Generates pros/cons lists
- Provides recommendations
- Compares multiple products

**Usage:**
\`\`\`typescript
import { analyzeProductWithOpenAI } from "@/lib/integrations/openai-analysis"

const analysis = await analyzeProductWithOpenAI({
  title: "Product Name",
  description: "Product description",
  price: 99.99,
  store: "Store Name"
})
\`\`\`

#### Affiliate Generator (`lib/integrations/affiliate-generator.ts`)
- Generates affiliate links for multiple stores
- Adds Amazon Associate tags
- Supports custom affiliate parameters

### 2. Search Orchestrator (`lib/search-orchestrator.ts`)

The orchestrator coordinates all integrations in a logical flow:

1. **Extract Product Info** - Fetch from Manus if URL provided
2. **Search Alternatives** - Query Admitad for similar products
3. **AI Analysis** - Analyze with OpenAI
4. **Find Best Deal** - Identify cheapest option
5. **Generate Affiliate Links** - Create monetized links

**Usage:**
\`\`\`typescript
import { orchestrateSearch } from "@/lib/search-orchestrator"

const result = await orchestrateSearch({
  type: "url",
  url: "https://example.com/product"
})
\`\`\`

### 3. Database Schema

#### Searches Table
Stores all search history and results with RLS protection:
\`\`\`sql
CREATE TABLE searches (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  query TEXT,
  url TEXT,
  search_type TEXT,
  original_product JSONB,
  alternatives JSONB,
  analysis JSONB,
  cheapest_option JSONB,
  affiliate_links JSONB,
  created_at TIMESTAMPTZ
)
\`\`\`

#### Product Cache Table
Caches product data to reduce API calls:
\`\`\`sql
CREATE TABLE product_cache (
  id UUID PRIMARY KEY,
  url TEXT UNIQUE,
  product_data JSONB,
  expires_at TIMESTAMPTZ
)
\`\`\`

#### Affiliate Links Table
Tracks generated affiliate links:
\`\`\`sql
CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY,
  search_id UUID REFERENCES searches(id),
  store TEXT,
  original_url TEXT,
  affiliate_url TEXT,
  commission_rate DECIMAL
)
\`\`\`

### 4. Pages & Routes

#### `/search` - Search Interface
- Text search input
- Image upload
- URL input
- Three search methods in tabs

#### `/results` - Results Display
- Product grid with filters
- Sort by price, rating, reviews
- Filter by store and price range
- AI analysis tab
- Best deal highlighting

#### `/live-agent` - Live Agent View
- Real-time progress tracking
- Step-by-step analysis visualization
- Completion status
- Performance metrics

#### API Routes

**`/api/search`** - Original search endpoint
**`/api/search-orchestrated`** - Enhanced orchestrated search
**`/api/health`** - Health check with integration status

### 5. Security Features

#### Rate Limiting (`lib/security/rate-limiter.ts`)
- Per-user rate limiting
- Configurable window and limits
- Default: 10 requests per minute

#### Input Validation (`lib/security/validation.ts`)
- Zod schema validation
- URL validation
- Email validation
- Price validation

#### Sanitization (`lib/security/sanitize.ts`)
- Removes sensitive data from logs
- Sanitizes URLs
- Prevents credential leakage

#### Middleware (`middleware.ts`)
- Global security headers
- XSS protection
- CSRF prevention
- Referrer policy

### 6. Environment Configuration

Copy `.env.placeholder` to `.env.local` and fill in your credentials:

\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# API Keys
MANUS_API_KEY=
ADMITAD_CLIENT_ID=
ADMITAD_CLIENT_SECRET=
ADMITAD_BASE64_HEADER=
OPENAI_API_KEY=
GEMINI_API_KEY=

# Affiliate
AMAZON_ASSOCIATE_TAG=

# Configuration
CACHE_TTL_HOURS=24
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
\`\`\`

### 7. Testing

Run tests with:
\`\`\`bash
npm run test          # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
\`\`\`

**Test Files:**
- `__tests__/integrations/manus.test.ts` - Manus API tests
- `__tests__/integrations/admitad.test.ts` - Admitad API tests
- `__tests__/integrations/openai.test.ts` - OpenAI tests
- `__tests__/security/rate-limiter.test.ts` - Rate limiting tests
- `__tests__/security/validation.test.ts` - Validation tests
- `__tests__/orchestrator/search.test.ts` - Orchestrator tests

### 8. CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):
- Runs on push to main/develop
- Tests on Node 18 and 20
- Linting
- Security audit
- Secret scanning

## User Flow

1. **User visits `/search`**
   - Chooses search method (text, image, URL)
   - Enters query or uploads content

2. **Search is submitted**
   - Redirects to `/live-agent` to show progress
   - Orchestrator processes request
   - Manus extracts product info
   - Admitad searches alternatives
   - OpenAI analyzes products
   - Affiliate links generated

3. **Results displayed on `/results`**
   - Shows best deal prominently
   - Lists all alternatives
   - Displays AI analysis
   - Provides affiliate links

4. **User takes action**
   - Clicks "Buy Now" or "View Deal"
   - Redirected via affiliate link
   - Commission earned

## Performance Optimizations

- **Caching**: Product data cached for 24 hours
- **Rate Limiting**: Prevents API abuse
- **Parallel Requests**: Multiple API calls run concurrently
- **Lazy Loading**: Results load on demand
- **Image Optimization**: Automatic image resizing

## Security Best Practices

- All API keys stored in environment variables
- No credentials in logs or error messages
- Input validation on all endpoints
- Rate limiting per user
- CORS headers configured
- XSS and CSRF protection enabled
- Row-level security on database

## Monitoring & Debugging

Enable debug logging with:
\`\`\`typescript
console.log("[v0] Debug message:", data)
\`\`\`

Health check endpoint:
\`\`\`bash
curl http://localhost:3000/api/health
\`\`\`

## Future Enhancements

- WebSocket support for real-time updates
- Machine learning for price predictions
- Browser extension for one-click comparison
- Mobile app
- Advanced analytics dashboard
- Multi-language support
- Payment integration for premium features

## Support

For issues or questions:
1. Check `.env.placeholder` for required variables
2. Run health check endpoint
3. Review test files for usage examples
4. Check GitHub issues

## License

MIT
