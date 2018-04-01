module.exports = {
    getUsers: (req, res) => {
        const db = req.app.get('db');
        db.get_users().then(response => {
            res.status(200).send(response);
        })
    },
    getVehicles: (req, res) => {
        const db = req.app.get('db');
        db.get_vehicles().then(response => {
            res.status(200).send(response);
        })
    },
    addUser: (req, res) => {
        const db = req.app.get('db');
        const {name, email} = req.body;
        db.add_user([name, email]).then(response => {
            res.status(200).send(response);
        })
    },
    addVehicle: (req, res) => {
        const db = req.app.get('db');
        const {make, model, year, owner_id} = req.body;
        db.add_vehicles([make, model, year, owner_id]).then(response => {
            res.status(200).send(response);
        }).catch(error => console.log(error))
    }, 
    vehicleCount: (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        db.get_vehicle_count(userId).then(response => {
            res.status(200).send(response);
        }).catch(error => console.log(error))
    },
    vehicleById: (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.params;
        db.get_vehicles_by_id(userId).then(response => {
            res.status(200).send(response);
        }).catch(error => console.log(error))
    },
    getVehicleByEmail: (req, res) => {
        const db = req.app.get('db');
        const {userEmail, userFirstStart} = req.query;
        if(userEmail){
            db.get_vehicles_by_email(userEmail).then(response => {
                res.status(200).send(response);
            }).catch(error => console.log(error))
        }else if (userFirstStart){
            db.get_vehicles_by_letter(userFirstStart).then(response => {
                res.status(200).send(response);
            }).catch(error => console.log(error))
        }  
    },
    getNewerVehiclesByYear: (req, res) => {
        const db = req.app.get('db');
        db.get_newer_vehicles_by_year().then(response => {
            res.status(200).send(response);
        }).catch(error => console.log(error))
    },
    changeOwnership: (req, res) => {
        const db = req.app.get('db');

        const { userId, vehicleId } = req.params;
        db.change_ownership_by_id([userId, vehicleId]).then(response => {
            res.status(200).send(response)
        })
    },
    removeOwnership: (req, res) => {
        const db = req.app.get('db');

        const { userId, vehicleId } = req.params;

        console.log(userId, vehicleId)
        db.remove_ownership([userId, vehicleId]).then(response => {
            console.log(response)
            res.status(200).send(response)
        })
    },
    removeVehicle: (req, res) => {
        const db = req.app.get('db');

        const {vehicleId } = req.params;

        console.log(vehicleId)
        db.remove_vehicle(vehicleId).then(response => {
            console.log(response)
            res.status(200).send(response)
        })
    }
}