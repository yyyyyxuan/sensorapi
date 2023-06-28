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
    const query = 'SELECT * FROM ( SELECT * FROM sensordata ORDER BY id DESC LIMIT 10 ) AS subquery ORDER BY id ASC;';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
 
      // Close the database connection
      connection.end();

      // Extract the data and time values from the result rows
      const data = results.map((row) => row.data);
      const time = results.map((row) => row.time);
    
      // Construct the response object with data and time properties
      const responseData = results.map((row) => {
        const parsedData = JSON.parse(row.data);
        return {
          data: parsedData,
          time: row.time,
        };
      });
    
      // Send the response as plain text
      res.status(200).json(responseData);
    });
  });
}
