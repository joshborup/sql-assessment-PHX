SELECT vehicles.*, users.name FROM vehicles
JOIN users
on(owner_id = users.id)
WHERE year > 2000
ORDER BY year DESC;