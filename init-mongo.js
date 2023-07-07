db = db.getSiblingDB('dev');

db.createUser(
    {
        user: "dbuser",
        pwd: "thisIsReallyStrongPassword123",
        roles: [ { role: "readWrite", db: "dev" } ]
    }
)