// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/cryptosms';
// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
//   'CREATE TABLE IF NOT EXISTS ACCOUNTS(ID INT PRIMARY KEY NOT NULL, CRYPTO TEXT NOT NULL, MOBILE CHAR(50) NOT NULL)'
// );
// query.on('end', () => { client.end(); });

// var getAccounts = function(callback) {
//   client.connect(function() {
//     client.query("SELECT * FROM accounts", function(err, results) { 
//       if (err) {
//         console.log('Error query database for all account records: ', err)
//       } else {
//         console.log('Database query successful!')
//         callback(results);
//       }
//       client.end(function (err) {
//         if (err) throw err;
//       });
//     })
//   })
// };

// var exportObj = {getAccounts: getAccounts};

// module.exports = exportObj;




// router.get('/api/v1/todos', (req, res, next) => {
//   const results = [];
//   // Get a Postgres client from the connection pool
//   });
// });

