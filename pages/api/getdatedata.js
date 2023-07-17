// pages/api/data.js
import mysql from 'mysql';

export default async function handler(req, res) {
  // Get the fromDate and toDate from the request body
  const { fromDate, toDate } = req.body;
  // Convert the fromDate to the database timezone 
  const adjustedFromDate = moment(fromDate).subtract(8, 'hours').format('YYYY-MM-DD');
  // Create a MySQL connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  });
  

  // Connect to the database
  connection.connect();

  // Query the sensordata table with the fromDate and toDate
  const query = `SELECT data,time FROM sensordata WHERE DATE(time) BETWEEN '${adjustedFromDate}' AND '${toDate}'`;
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
  

}
