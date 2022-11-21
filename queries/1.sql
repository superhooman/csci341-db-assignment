SELECT 
    "Discover".disease_code,
    "Disease".description
FROM "Discover"
JOIN "Disease"
    ON "Discover".disease_code = "Disease".disease_code
WHERE "Discover".first_enc_date < '1990-01-01' AND "Disease".pathogen = 'bacteria';
