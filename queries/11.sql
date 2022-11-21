SELECT
    description,
    COALESCE(total_patients - total_deaths, 0) as patients_treated
FROM (
    SELECT
        "DiseaseType".description,
        SUM("Record".total_patients) as total_patients,
        SUM("Record".total_deaths) as total_deaths
    FROM "Record"
    RIGHT JOIN "Disease"
        ON "Record".disease_code = "Disease".disease_code
    RIGHT JOIN "DiseaseType"
        ON "Disease".id = "DiseaseType".id
    GROUP BY "DiseaseType".description
) as subquery;
