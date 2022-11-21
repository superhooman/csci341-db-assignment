SELECT 
    "Users".cname,
    AVG("Users".salary)
FROM "Doctor"
    JOIN "Users" ON "Doctor".email = "Users".email 
    JOIN "Specialize" ON "Specialize".email = "Doctor".email
    JOIN "DiseaseType" ON "DiseaseType".id = "Specialize".id
    WHERE "DiseaseType".description = 'virology'
GROUP BY "Users".cname;