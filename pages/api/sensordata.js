import mysql from 'mysql';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;

    // Create a MySQL connection
    const connection = mysql.createConnection(dbConfig);

    // Connect to the database
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Define the data to be inserted
      const sensorData = { data: body };

      // Insert the data into the sensordata table
      connection.query('INSERT INTO sensordata SET ?', sensorData, (error, results) => {
        if (error) {
          console.error('Error inserting data:', error);
          res.status(500).send('Internal Server Error');
          return;
        }

        console.log('Data inserted successfully.');

        // Close the database connection
        connection.end();

        res.status(200).send('Received and saved text successfully.');
      });
    });
  } else {
    res.status(405).end();
  }
}
