SELECT 
    DISTINCT
    "Users".name,
    "Users".surname,
    "Doctor".degree
FROM "Users"
    JOIN "Doctor" ON "Doctor".email = "Users".email 
    JOIN "Specialize" ON "Specialize".email = "Doctor".email
    JOIN "DiseaseType" ON "DiseaseType".id = "Specialize".id
    WHERE "DiseaseType".description != 'infectious';
