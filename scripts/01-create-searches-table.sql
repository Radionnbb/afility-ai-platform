-- Create searches table for storing search history and results
CREATE TABLE IF NOT EXISTS searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  url TEXT,
  search_type TEXT CHECK (search_type IN ('text', 'image', 'url')),
  original_product JSONB,
  alternatives JSONB,
  analysis JSONB,
  cheapest_option JSONB,
  affiliate_links JSONB,
  search_results JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_searches_user_id ON searches(user_id);
CREATE INDEX IF NOT EXISTS idx_searches_created_at ON searches(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_searches_query ON searches USING GIN(to_tsvector('english', query));

-- Enable RLS (Row Level Security)
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: users can only see their own searches
CREATE POLICY "Users can view their own searches" ON searches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own searches" ON searches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own searches" ON searches
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own searches" ON searches
  FOR DELETE USING (auth.uid() = user_id);

-- Create products cache table
CREATE TABLE IF NOT EXISTS product_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT UNIQUE NOT NULL,
  product_data JSONB NOT NULL,
  source TEXT,
  cached_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT now() + INTERVAL '24 hours'
);

CREATE INDEX IF NOT EXISTS idx_product_cache_url ON product_cache(url);
CREATE INDEX IF NOT EXISTS idx_product_cache_expires_at ON product_cache(expires_at);

-- Create affiliate links table
CREATE TABLE IF NOT EXISTS affiliate_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
  store TEXT NOT NULL,
  original_url TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  commission_rate DECIMAL(5, 2),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_affiliate_links_search_id ON affiliate_links(search_id);
