# Afility Platform - Complete Features Overview

## Platform Architecture

Afility is a comprehensive price comparison and savings platform that uses AI to help users find the best deals and track their savings.

### Core Components

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Afility Platform                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Frontend   │  │   Backend    │  │   Database   │     │
│  │              │  │              │  │              │     │
│  │ • Search     │  │ • OpenAI     │  │ • Supabase   │     │
│  │ • Results    │  │ • Manus      │  │ • Searches   │     │
│  │ • Profile    │  │ • Admitad    │  │ • Cache      │     │
│  │ • Live Agent │  │ • Affiliate  │  │ • Analytics  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Feature Breakdown

### 1. Search System

#### Search Types
- **Text Search**: Search by product name or keywords
- **Image Search**: Upload product image for analysis
- **URL Search**: Paste product URL for comparison

#### Search Features
- Real-time product analysis
- Alternative product discovery
- Price comparison across stores
- Automatic savings calculation
- AI-powered recommendations

#### Supported Stores
- Amazon
- eBay
- AliExpress
- Walmart
- Best Buy
- Target
- Newegg
- B&H Photo
- Costco
- Home Depot

### 2. Results & Comparison

#### Display Features
- **Best Deal Highlighting**: Green-themed card for cheapest option
- **Savings Display**: Shows amount and percentage saved
- **Product Cards**: Detailed information for each alternative
- **Ratings & Reviews**: Star ratings and review counts
- **Shipping Info**: Free or paid shipping details
- **Availability Status**: In stock or limited stock indicators

#### Filtering & Sorting
- Sort by: Price (low/high), Rating, Reviews
- Filter by: Store, Price Range
- Clear filters button for quick reset

#### AI Analysis Tab
- Product summary
- Pros and cons
- AI recommendations
- Alternative suggestions

### 3. Savings Tracking

#### Automatic Calculation
- Calculates savings on every search
- Compares original vs. cheapest price
- Shows percentage discount
- Stores data for history

#### Profile Dashboard
- **Total Savings**: Cumulative amount saved
- **Activity History**: All searches with individual savings
- **Statistics**: Number of purchases and transactions
- **Trends**: Visual representation of savings over time

#### Data Storage
- Supabase database integration
- Row-level security for privacy
- Indexed for fast queries
- Automatic backup and recovery

### 4. AI Integration

#### OpenAI Services
- **GPT-3.5-turbo**: Text and URL analysis
- **GPT-4 Vision**: Image analysis and recognition
- **Prompt Engineering**: Optimized for product analysis

#### Analysis Capabilities
- Product identification
- Feature extraction
- Price estimation
- Category classification
- Confidence scoring

#### Manus Integration
- Web scraping and data extraction
- Real-time price monitoring
- Product availability checking
- Store inventory tracking

### 5. Affiliate System

#### Link Generation
- Amazon Associate links with tag
- Admitad deeplinks
- Store-specific affiliate URLs
- Commission tracking

#### Monetization
- Earn commissions on referred purchases
- Track affiliate performance
- Multiple store support
- Automatic link generation

### 6. User Experience

#### WebPreview Component
- Shows product page in iframe
- Starts small (300px width)
- Expands during analysis
- Shrinks after completion
- Smooth animations with framer-motion

#### Live Agent View
- Real-time analysis progress
- Step-by-step breakdown
- Visual status indicators
- Smooth transitions
- Estimated time remaining

#### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Touch-friendly controls
- Accessible navigation

### 7. Security & Privacy

#### Data Protection
- Supabase Row-Level Security (RLS)
- End-to-end encryption
- Secure API endpoints
- Rate limiting (10 req/min)
- Input validation and sanitization

#### Privacy Features
- Users see only their own data
- No data sharing between users
- GDPR compliant
- Privacy policy included
- Data deletion on request

#### API Security
- Bearer token authentication
- CORS protection
- XSS prevention
- CSRF protection
- Referrer policy enforcement

### 8. Performance

#### Optimization Techniques
- Database indexing
- Query optimization
- Caching (24-hour TTL)
- Lazy loading
- Image optimization

#### Monitoring
- Error tracking with Sentry
- Performance metrics
- API usage monitoring
- Database query analysis
- User analytics

## User Workflows

### Workflow 1: Text Search
\`\`\`
1. User enters product name
2. System searches alternatives
3. OpenAI analyzes products
4. Results displayed with savings
5. User can filter and sort
6. Savings stored in profile
\`\`\`

### Workflow 2: Image Search
\`\`\`
1. User uploads product image
2. GPT-4 Vision analyzes image
3. Product identified
4. Similar products found
5. Prices compared
6. Savings calculated
\`\`\`

### Workflow 3: URL Search
\`\`\`
1. User pastes product URL
2. Manus extracts product data
3. OpenAI analyzes content
4. Alternatives discovered
5. Best deal highlighted
6. Affiliate link generated
\`\`\`

### Workflow 4: Profile Review
\`\`\`
1. User visits profile
2. Total savings displayed
3. Activity history shown
4. Statistics visible
5. Can start new search
6. Can view search history
\`\`\`

## Technical Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Components**: shadcn/ui
- **State Management**: React Hooks, SWR

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI Services**: OpenAI API
- **External APIs**: Manus, Admitad

### Infrastructure
- **Hosting**: Vercel
- **Database**: Supabase
- **Storage**: Vercel Blob
- **Monitoring**: Sentry
- **Analytics**: Vercel Analytics

## Configuration

### Environment Variables
\`\`\`
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY
MANUS_API_KEY
ADMITAD_CLIENT_ID
ADMITAD_CLIENT_SECRET
AMAZON_ASSOCIATE_TAG
CACHE_TTL_HOURS
RATE_LIMIT_WINDOW_MS
RATE_LIMIT_MAX_REQUESTS
\`\`\`

### Database Schema
- `searches`: Search history and results
- `product_cache`: Cached product data
- `affiliate_links`: Generated affiliate links
- RLS policies for data privacy

## API Reference

### Search Endpoint
\`\`\`
POST /api/search
Content-Type: application/json

{
  "query": "laptop",
  "type": "text|image|url",
  "imageData": "base64_string",
  "url": "https://..."
}

Response:
{
  "success": true,
  "data": {
    "query": "laptop",
    "results": [...],
    "savings": {
      "amount": "150.00",
      "percent": "15.5"
    }
  }
}
\`\`\`

### Health Check
\`\`\`
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

## Deployment

### Vercel Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

### Environment Setup
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Enable automatic deployments
4. Configure custom domain

### Database Setup
1. Create Supabase project
2. Run migration scripts
3. Enable RLS policies
4. Set up backups

## Monitoring & Analytics

### Key Metrics
- Search volume
- Average savings per search
- User retention
- API response time
- Error rates
- Conversion rates

### Dashboards
- Vercel Analytics
- Supabase Metrics
- Sentry Error Tracking
- Custom Analytics

## Future Roadmap

### Phase 1 (Q1 2024)
- [ ] Mobile app (iOS/Android)
- [ ] Browser extension
- [ ] Email notifications

### Phase 2 (Q2 2024)
- [ ] Advanced analytics
- [ ] Savings goals
- [ ] Referral program

### Phase 3 (Q3 2024)
- [ ] Machine learning recommendations
- [ ] Price prediction
- [ ] Wishlist features

### Phase 4 (Q4 2024)
- [ ] International expansion
- [ ] Multi-currency support
- [ ] Localization

## Support & Documentation

- **Quick Start**: `QUICK_START.md`
- **Savings System**: `SAVINGS_SYSTEM.md`
- **Enhancements**: `ENHANCEMENTS.md`
- **Setup Guide**: `SETUP_GUIDE.md`
- **Changelog**: `CHANGELOG_SAVINGS.md`

## License

MIT License - See LICENSE file for details

## Contact

For support or inquiries:
- Email: support@afility.ai
- Website: https://afility.ai
- GitHub: https://github.com/Radionnbb/afility-ai-platform
