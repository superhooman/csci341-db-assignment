DELETE FROM "Users"
    WHERE (
        LOWER(name) LIKE '%bek%'
    ) OR (
        LOWER(name) LIKE '%gul%'
    );