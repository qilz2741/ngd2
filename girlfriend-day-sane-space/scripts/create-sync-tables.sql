-- Create a table to store sync sessions (optional, for persistence)
CREATE TABLE IF NOT EXISTS music_sync_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sync_code VARCHAR(6) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_song INTEGER DEFAULT 0,
  is_playing BOOLEAN DEFAULT FALSE,
  playback_position INTEGER DEFAULT 0
);

-- Create an index on sync_code for faster lookups
CREATE INDEX IF NOT EXISTS idx_music_sync_sessions_code ON music_sync_sessions(sync_code);

-- Enable Row Level Security
ALTER TABLE music_sync_sessions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read and write (for demo purposes)
CREATE POLICY "Allow all operations on music_sync_sessions" ON music_sync_sessions
  FOR ALL USING (true) WITH CHECK (true);
