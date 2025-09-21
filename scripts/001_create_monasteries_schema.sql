-- Create monasteries table with comprehensive information
CREATE TABLE IF NOT EXISTS public.monasteries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  altitude INTEGER,
  founded_year INTEGER,
  tradition TEXT, -- Buddhist tradition (Nyingma, Kagyu, Gelug, Sakya)
  main_deity TEXT,
  significance TEXT,
  visiting_hours TEXT,
  entry_fee TEXT,
  contact_info JSONB,
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  virtual_tour_url TEXT,
  audio_guide_urls JSONB DEFAULT '{}'::jsonb, -- Object with language codes as keys
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for location-based queries
CREATE INDEX IF NOT EXISTS idx_monasteries_location ON public.monasteries (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_monasteries_tradition ON public.monasteries (tradition);

-- Enable Row Level Security
ALTER TABLE public.monasteries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (monasteries are public information)
CREATE POLICY "Allow public read access to monasteries" 
  ON public.monasteries FOR SELECT 
  USING (true);

-- Create admin table for content management
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin policies
CREATE POLICY "Allow admins to view their own data" 
  ON public.admin_users FOR SELECT 
  USING (auth.uid() = id);

-- Only admins can modify monastery data
CREATE POLICY "Allow admins to insert monasteries" 
  ON public.monasteries FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Allow admins to update monasteries" 
  ON public.monasteries FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Allow admins to delete monasteries" 
  ON public.monasteries FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );
