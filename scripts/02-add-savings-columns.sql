-- Add savings columns to searches table
ALTER TABLE searches ADD COLUMN IF NOT EXISTS savings NUMERIC DEFAULT 0;
ALTER TABLE searches ADD COLUMN IF NOT EXISTS savings_percent NUMERIC DEFAULT 0;
ALTER TABLE searches ADD COLUMN IF NOT EXISTS original_price NUMERIC;
ALTER TABLE searches ADD COLUMN IF NOT EXISTS cheapest_price NUMERIC;

-- Create index for savings queries
CREATE INDEX IF NOT EXISTS idx_searches_savings ON searches(savings DESC);
