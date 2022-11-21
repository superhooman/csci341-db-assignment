SELECT "PublicServant".department, COUNT("PublicServant".email)
    FROM "PublicServant" WHERE "PublicServant".email IN (
        SELECT email
        FROM "Record" 
        WHERE "Record".disease_code = 'COVID-2019'
        GROUP BY "Record".email HAVING COUNT("Record".cname) > 1
    ) GROUP BY "PublicServant".department;
