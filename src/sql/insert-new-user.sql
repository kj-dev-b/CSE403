INSERT INTO 
    u2g(uid, github_name)
VALUES
    ($1,$2)
ON CONFLICT 
    (uid) 
DO UPDATE 
  SET github_name = excluded.github_name;