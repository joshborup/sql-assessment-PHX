UPDATE vehicles
SET owner_id = null
WHERE owner_id = $1 AND vehicles.id = $2
RETURNING *;