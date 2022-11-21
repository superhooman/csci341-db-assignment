SELECT cname FROM (
    SELECT cname, MAX(total_patients) AS total_patients
    FROM "Record"
    GROUP BY cname
    HAVING MAX(total_patients) > 0
    ORDER BY MAX(total_patients) DESC
    LIMIT 5
) AS top5;