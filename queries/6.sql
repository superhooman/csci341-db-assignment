UPDATE "Users"
SET salary = salary * 2
WHERE "Users".email IN (
    SELECT "Record".email
        FROM "Record"
        WHERE "Record".disease_code = 'COVID-2019'
        GROUP BY "Record".email HAVING COUNT("Record".cname) > 3
);