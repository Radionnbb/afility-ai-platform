# Afility.AI - Complete Systems Implementation Guide

This document outlines the implementation of five major systems for the Afility.AI platform.

## Overview

This implementation adds the following systems to the Afility.AI platform:

1. **Purchase Tracking System** - Track clicks, conversions, and commissions
2. **Advanced Analytics** - Trends, forecasts, and performance dashboards
3. **Notifications System** - Real-time user notifications
4. **PWA Support** - Progressive Web App capabilities
5. **Tests & CI/CD** - Comprehensive testing and automated deployment

## System Architecture

### 1. Purchase Tracking System

#### Database Schema

Three new tables have been created:

- **clicks** - Records every product link click
  - Tracks: user_id, search_id, product_url, affiliate_url, store, price, currency
  - Indexes on user_id, created_at, search_id for performance

- **transactions** - Records purchase conversions
  - Tracks: user_id, search_id, product_url, amount, commission_amount, status
  - Status values: pending, confirmed, rejected, cancelled
  - Stores provider_raw data for webhook responses

- **error_logs** - System error tracking
  - Tracks: error_type, error_message, error_stack, context
  - Used for debugging and monitoring

#### API Endpoints

**POST /api/tracking/click**
- Records a product link click
- Request body: `{ user_id?, search_id?, product_url, affiliate_url, store, price, currency }`
- Response: `{ success: true, data }`

**POST /api/tracking/conversion**
- Records a purchase conversion
- Request body: `{ user_id?, search_id?, product_url, affiliate_url, store, amount, currency, provider_reference?, metadata? }`
- Response: `{ success: true, transaction_id, status: 'pending' }`

**POST /api/webhooks/admitad**
- Webhook endpoint for Admitad conversion callbacks
- Verifies HMAC-SHA256 signature
- Updates transaction status to 'confirmed'
- Stores provider_raw data

**POST /api/tracking/reconcile**
- Reconciliation job for pending transactions
- Requires: `Authorization: Bearer {INTERNAL_API_KEY}`
- Processes transactions older than 1 hour
- Returns: `{ success: true, reconciled, failed, total }`

#### Row Level Security (RLS)

All tables have RLS enabled:
- Users can only view/insert their own clicks and transactions
- Service role can update transactions (for webhooks)
- Error logs are service role only

### 2. Advanced Analytics System

#### API Endpoints

**GET /api/analytics/overview**
- Returns aggregated metrics for a date range
- Query params: `start`, `end` (ISO 8601 format)
- Response includes:
  - clicks_count
  - conversions_count
  - total_commission
  - total_amount
  - conversion_rate (percentage)

**GET /api/analytics/trends**
- Returns time-series data for the last N days
- Query params: `days` (default: 30)
- Response: Array of daily metrics
  \`\`\`json
  [
    { "date": "2025-01-01", "clicks": 10, "conversions": 1, "commission": 5.0 },
    ...
  ]
  \`\`\`

**GET /api/analytics/forecast**
- Generates sales forecast using moving average
- Query params: `forecast_days` (default: 7), `history_days` (default: 30)
- Response includes:
  - history: Historical data points
  - forecast: Predicted future values
  - average_daily_commission: Calculated average

### 3. Notifications System

#### Database Schema

**notifications** table:
- id, user_id, title, body, type, read, meta, created_at
- Types: info, success, warning, error
- Indexes on user_id, created_at, read for performance

#### API Endpoints

**GET /api/notifications/list**
- Returns user notifications
- Query params: `unread_only` (boolean), `limit` (default: 20)
- Response: Array of notification objects

**POST /api/notifications/mark-read**
- Marks notifications as read
- Request body: `{ notification_ids: string[], read: boolean }`
- Response: `{ success: true }`

#### Frontend Component

**NotificationsDropdown** component:
- Displays unread notification count in navbar
- Polls for new notifications every 30 seconds
- Shows notification dropdown with full details
- Allows marking notifications as read

### 4. PWA Support

#### Files Added

- **public/manifest.json** - PWA manifest with app metadata
- **public/service-worker.js** - Service worker for offline support
- **public/offline.html** - Offline fallback page
- **lib/register-service-worker.ts** - Service worker registration utility

#### Features

- App shell caching for offline access
- Network-first strategy for pages
- Stale-while-revalidate for API calls
- Install prompt on supported devices
- Offline fallback page

#### Configuration

- Theme color: #3b82f6 (blue)
- Display mode: standalone
- Start URL: /
- Icons: 192x192 and 512x512 (with maskable variants)

### 5. Tests & CI/CD

#### Test Files

- `__tests__/api/tracking.test.ts` - Tracking API tests
- `__tests__/api/analytics.test.ts` - Analytics API tests
- `__tests__/api/notifications.test.ts` - Notifications API tests
- `__tests__/utils/analytics.test.ts` - Utility function tests

#### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):
- Runs on push to main/develop and pull requests
- Tests on Node 18.x and 20.x
- Steps:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies
  4. Run linter
  5. Run tests with coverage
  6. Build project
  7. Security audit
  8. Secret scanning

## Setup Instructions

### 1. Database Setup

Run the migration files in Supabase:

\`\`\`bash
# In Supabase SQL Editor, run:
-- supabase/migrations/20250101000001_add_transactions_and_conversions.sql
-- supabase/migrations/20250101000002_add_notifications.sql
\`\`\`

### 2. Environment Variables

Copy `.env.placeholder` to `.env.local` and fill in:

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
ADMITAD_WEBHOOK_SECRET=your_secret
INTERNAL_API_KEY=your_key
\`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Run Tests

\`\`\`bash
npm run test
npm run test:coverage
\`\`\`

### 5. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

## Usage Examples

### Recording a Click

\`\`\`typescript
const response = await fetch('/api/tracking/click', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    product_url: 'https://amazon.com/product',
    affiliate_url: 'https://affiliate.amazon.com/product',
    store: 'Amazon',
    price: 99.99,
    currency: 'USD'
  })
})
\`\`\`

### Recording a Conversion

\`\`\`typescript
const response = await fetch('/api/tracking/conversion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    product_url: 'https://amazon.com/product',
    store: 'Amazon',
    amount: 99.99,
    currency: 'USD'
  })
})
\`\`\`

### Getting Analytics

\`\`\`typescript
const response = await fetch('/api/analytics/overview?start=2025-01-01&end=2025-01-31')
const data = await response.json()
console.log(data.conversion_rate) // 10.5
\`\`\`

### Getting Notifications

\`\`\`typescript
const response = await fetch('/api/notifications/list?unread_only=true')
const notifications = await response.json()
\`\`\`

## Security Considerations

1. **API Keys** - All API keys stored in environment variables, never committed
2. **Webhook Verification** - Admitad webhooks verified with HMAC-SHA256
3. **RLS Policies** - Database access controlled via Supabase RLS
4. **Rate Limiting** - API endpoints rate-limited to prevent abuse
5. **Secret Scanning** - GitHub Actions scans for leaked secrets

## Monitoring & Debugging

### Error Logging

Errors are logged to the `error_logs` table:

\`\`\`typescript
await supabase.from('error_logs').insert({
  error_type: 'API_ERROR',
  error_message: error.message,
  error_stack: error.stack,
  context: { endpoint: '/api/tracking/click' }
})
\`\`\`

### Performance Monitoring

- Database indexes on frequently queried columns
- Caching strategies for analytics data
- Service worker caching for offline support

## Future Enhancements

1. Real-time notifications via WebSocket
2. Advanced forecasting with machine learning
3. Multi-currency support
4. Affiliate network integrations
5. Mobile app with React Native
