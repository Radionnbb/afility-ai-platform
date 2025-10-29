# Afility Platform - Quick Start Guide

## What's New in This Version

### 1. Savings Tracking System
- Automatic calculation of savings on every search
- Total savings displayed on user profile
- Historical tracking of all searches and savings

### 2. OpenAI Integration (Replaces Gemini)
- Uses OpenAI's GPT-3.5-turbo for text analysis
- Uses GPT-4 Vision for image analysis
- More accurate product analysis and recommendations

### 3. Enhanced Results Page
- Displays savings amount and percentage
- Shows best deal prominently
- Improved filtering and sorting options

### 4. Profile Dashboard
- Total money saved display
- Activity history with savings per transaction
- Account statistics and quick actions

## Setup Instructions

### 1. Environment Variables

Copy `.env.placeholder` to `.env.local` and fill in your credentials:

\`\`\`bash
# Required for Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key

# Required for OpenAI (Primary AI Service)
OPENAI_API_KEY=your_openai_key

# Optional integrations
MANUS_API_KEY=your_manus_key
ADMITAD_CLIENT_ID=your_id
ADMITAD_CLIENT_SECRET=your_secret
AMAZON_ASSOCIATE_TAG=your_tag
\`\`\`

### 2. Database Setup

Run the migration scripts to set up the database:

\`\`\`bash
# Create searches table
npm run db:migrate -- scripts/01-create-searches-table.sql

# Add savings columns
npm run db:migrate -- scripts/02-add-savings-columns.sql
\`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## Key Features

### Search Page (`/search`)
- Text, image, or URL search
- WebPreview component shows product page
- Live Agent View displays analysis progress
- Real-time savings calculation

### Results Page (`/results`)
- Displays all product alternatives
- Shows total savings and best deal
- Filter by store, price range, rating
- Sort by price, rating, or reviews
- AI analysis tab with pros/cons

### Profile Page (`/profile`)
- Total money saved (cumulative)
- Activity history with individual savings
- Account information and settings
- Quick actions for new searches

## API Endpoints

### POST `/api/search`
Search for products and get alternatives with savings

**Request:**
\`\`\`json
{
  "query": "laptop",
  "type": "text"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "query": "laptop",
    "results": [...],
    "savings": {
      "amount": "150.00",
      "percent": "15.5",
      "originalPrice": 1000,
      "cheapestPrice": 850
    }
  }
}
\`\`\`

### GET `/api/health`
Check API health status

## Troubleshooting

### OpenAI API Errors
- Verify `OPENAI_API_KEY` is set correctly
- Check API key has sufficient credits
- Ensure model `gpt-3.5-turbo` is available in your account

### Supabase Connection Issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check database migrations have run
- Ensure RLS policies are enabled

### Savings Not Displaying
- Check database migrations completed
- Verify `savings` and `savings_percent` columns exist
- Clear browser cache and reload

## Performance Tips

- Enable caching with `CACHE_TTL_HOURS=24`
- Use rate limiting to prevent abuse
- Index frequently queried columns
- Monitor API usage and costs

## Security Best Practices

- Never commit `.env.local` to version control
- Use environment variables for all secrets
- Enable RLS on all database tables
- Implement rate limiting on API endpoints
- Sanitize user inputs and logs

## Support

For issues or questions:
1. Check the documentation files
2. Review error logs in console
3. Check Supabase dashboard for database issues
4. Verify API keys and credentials
