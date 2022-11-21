SELECT 
    "Users".email,
    "Users".name,
    "PublicServant".department
FROM "Record"
JOIN "PublicServant" ON "PublicServant".email = "Record".email
JOIN "Users" ON "Users".email = "PublicServant".email
WHERE "Record".total_patients > 100000 AND "Record".total_patients < 999999;