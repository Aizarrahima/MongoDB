// jshint es version: 6

// versi terbaru
// const { MongoClient } = require("mongodb");

// // Connection URI
// const uri = "mongodb://localhost:27017";

// // Create a new MongoClient
// const client = new MongoClient(uri);

// async function run() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();

//         // Establish and verify connection
//         await client.db("fruitDB").command({ ping: 1 });
//         console.log("Connected successfully to server");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);


// versi lama
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert")

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "fruitsDB";

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // insertDocuments(db, function () {
    //     client.close();
    // });

    findDocuments(db, function () {
        client.close();
    })
});

const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection("fruits");
    // insert some documents
    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great fruit"
        },
        {
            name: "Orange",
            score: 6,
            review: "Kinda sour"
        },
        {
            name: "Banana",
            score: 9,
            review: "Great stuff!"
        }
    ], function (err, result) {
        assert.equal(err, null); // validate to make sure that there are no errors when inserted our document
        
        // ensure that we have 3 result that are inserted into our collection (error)
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        
        console.log("Inserted 3 documents into the collection"); // apabila berhasil akan menampilkan pesan
        callback(result);
    })
};

const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection("fruits");
    // Find some documents
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits)
        callback(fruits);
    });
}