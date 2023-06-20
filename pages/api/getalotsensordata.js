const mysql = require('mysql');
const dbConfig = {
  host: '217.21.74.1',
  user: 'u896730304_internuser',
  password: 'Password123',
  database: 'u896730304_sensordb',
};

export default function handler(req, res) {
  // Create a MySQL connection
  const connection = mysql.createConnection(dbConfig);

  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Execute the query to retrieve the data column from the sensordata table
    const query = 'SELECT data FROM sensordata ORDER BY id DESC LIMIT 20';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Close the database connection
      connection.end();

      // Extract the data values from the result rows and parse each JSON string
      const jsonData = results.map((row) => JSON.parse(row.data));

      // Send the JSON array as the API response
      res.status(200).json(jsonData);
    });
  });
}
