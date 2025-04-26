## my notes for asl space assignment

### commands to remember:

**important!** remember correct pathing. be specific!

for quick node.js access...<br>
`./bin/node`<br><br>
for migration pathing...<br>
`--migrations-path src/migrations`
<br><br>
for model pathing...<br>
`--models-path src/models`

## relationships to establish:

pay attention to singular versus many. **stars** refer to _many/more than one_ stars. **star** refers to _one_ star.

many to many... create a join table<br>
stars -> planets -> StarsPlanets <br><br>
**steps to edit the stars-planets migration (join table)**<br>

1. create a table called StarsPlanets
2. set up prime keys: StarId, PlanetId
3. add foreign key restraints to Stars and Planets
4. include timestamps
5. drop table
   <br>

### **galaxy model**

_one_ galaxy has _many_ stars:<Br>
galaxy -> stars
<br>

1. add star association to galaxy model with **hasMany** specifier
2. include **GalaxyId** as foreign key
3. add async **onDelete** and **onUpdate** params

### **star model**

stars belong to _one_ galaxy, stars have _many_ planets:<br>
stars -> galaxy<br>
stars -> planets<br>

1. add galaxy association to star model with **belongsTo** specifier
2. include **GalaxyId** as foreign key
3. add async **onDelete** and **onUpdate** params
4. add planet association to star model with **belongsToMany** specifier
5. include **StarId** as foreign key
6. include **PlanetId** as other key
7. use **THROUGH** (because stars belong to planets) param with **StarsPlanets** identifier
8. add async **onDelete** and **onUpdate** params

### **planet model**

planets belong to _many_ stars<br>
planets -> stars<br>

1. add star association to planet model with **belongsToMany** specifier
2. use **THROUGH** (because planets belong to stars) param with **StarsPlanets** specifier
3. include **PlanetId** as foreign key
4. include **StarId** as other key
5. add async **onDelete** and **onUpdate** params

## **endpoints**

all of my request templates will be stored here for ease of use!

### **postman**

using postman for quickly verifying and debugging errors in reaching endpoints before hitting those endpoints with cURL requests to fulfill assignment specs.
