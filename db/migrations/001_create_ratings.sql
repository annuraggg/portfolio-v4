-- Create ratings table for storing project ratings
CREATE TABLE IF NOT EXISTS ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  user_identifier TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, user_identifier)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_project_id ON ratings(project_id);
CREATE INDEX IF NOT EXISTS idx_user_identifier ON ratings(project_id, user_identifier);

-- Create aggregated view for ratings statistics
CREATE VIEW IF NOT EXISTS project_ratings_stats AS
SELECT 
  project_id,
  COUNT(*) as total_ratings,
  AVG(rating) as average_rating
FROM ratings
GROUP BY project_id;
