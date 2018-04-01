const app = require('express')();
const massive = require('massive');
const bodyParser = require('body-parser');
const Cont = require('./controller/controller')
require('dotenv').config();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('connected to db')
    // Initialize user table and vehicle table.
    db.init_tables.user_create_seed().then( response => {
      console.log('User table init');
      db.init_tables.vehicle_create_seed().then( response => {
        console.log('Vehicle table init');
      }).catch(error => console.log('1', error))
    }).catch(error => console.log('2', error))
  }).catch(error => console.log('3', error));


app.get('/api/users', Cont.getUsers);  
app.get('/api/vehicles', Cont.getVehicles);

app.post('/api/users', Cont.addUser);
app.post('/api/vehicles', Cont.addVehicle);

app.get('/api/user/:userId/vehiclecount', Cont.vehicleCount);
app.get('/api/user/:userId/vehicle', Cont.vehicleById);

app.get('/api/vehicle', Cont.getVehicleByEmail);
app.get('/api/newervehiclesbyyear', Cont.getNewerVehiclesByYear);

app.put('/api/vehicle/:vehicleId/user/:userId', Cont.changeOwnership);

app.delete('/api/user/:userId/vehicle/:vehicleId', Cont.removeOwnership);
app.delete('/api/vehicle/:vehicleId', Cont.removeVehicle);

app.listen(3000,()=> console.log('listening on port 3000'))