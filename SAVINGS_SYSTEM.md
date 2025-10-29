# Afility Savings System Documentation

## Overview

The Afility platform now includes a comprehensive savings tracking system that calculates and displays how much users save on every product search and purchase.

## Features

### 1. Savings Calculation
- **Automatic Calculation**: When a user searches for a product, the system automatically calculates savings between the original price and the cheapest available option.
- **Percentage Display**: Shows both absolute savings amount and percentage discount.
- **Real-time Updates**: Savings are calculated and displayed immediately in search results.

### 2. Savings Storage
- **Database Integration**: All savings data is stored in Supabase with the following fields:
  - `savings`: Amount saved in dollars
  - `savings_percent`: Percentage of savings
  - `original_price`: Original product price
  - `cheapest_price`: Cheapest available price

### 3. Profile Dashboard
- **Total Savings Display**: Users can see their cumulative savings on the profile page
- **Activity History**: Complete history of all searches with individual savings amounts
- **Statistics**: Overview cards showing total money saved and number of successful purchases

## Implementation Details

### Savings Utility (`lib/utils/savings.ts`)

\`\`\`typescript
calculateSavings(originalPrice: number, cheapestPrice: number): SavingsData
\`\`\`

Calculates savings between two prices and returns:
- `saved`: Formatted savings amount
- `percent`: Formatted percentage
- `originalPrice`: Original price
- `cheapestPrice`: Cheapest price

### Database Schema

\`\`\`sql
ALTER TABLE searches ADD COLUMN IF NOT EXISTS savings NUMERIC DEFAULT 0;
ALTER TABLE searches ADD COLUMN IF NOT EXISTS savings_percent NUMERIC DEFAULT 0;
ALTER TABLE searches ADD COLUMN IF NOT EXISTS original_price NUMERIC;
ALTER TABLE searches ADD COLUMN IF NOT EXISTS cheapest_price NUMERIC;
\`\`\`

### API Integration

The `/api/search` endpoint now:
1. Calculates savings for each search result
2. Identifies the cheapest option
3. Returns savings data in the response
4. Stores savings in Supabase for historical tracking

### Frontend Display

#### Results Page (`app/results/page.tsx`)
- Displays total savings in stats cards
- Shows savings percentage
- Highlights best deal with green styling
- Individual product savings visible in each result card

#### Profile Page (`app/profile/page.tsx`)
- Large savings total at the top
- Activity table showing per-transaction savings
- Statistics cards with cumulative data
- Historical search records

## User Flow

1. **Search**: User enters a product query or URL
2. **Analysis**: System finds alternatives and calculates savings
3. **Display**: Results page shows total savings and best deals
4. **Tracking**: Savings are automatically stored in user's profile
5. **History**: User can view all past searches and savings on profile page

## Data Privacy

- All savings data is protected by Supabase Row Level Security (RLS)
- Users can only see their own savings and search history
- Data is encrypted in transit and at rest
- Complies with GDPR and privacy regulations

## Future Enhancements

- Export savings reports as PDF
- Monthly savings summaries
- Savings goals and targets
- Referral bonuses based on savings
- Integration with email notifications for deals
