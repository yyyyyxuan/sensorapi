import mysql from 'mysql';

const dbConfig = {
  host: '217.21.74.1',
  user: 'u896730304_internuser',
  password: 'Password123',
  database: 'u896730304_sensordb',
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
