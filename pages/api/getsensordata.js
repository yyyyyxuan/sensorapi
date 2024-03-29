import mysql from 'mysql';
import { NextApiRequest, NextApiResponse } from 'next';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
};

export default function handler(req, res) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    connection.query(
      'SELECT data FROM sensordata ORDER BY id DESC LIMIT 1',
      (error, results) => {
        if (error) {
          console.error('Error querying data:', error);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (results.length > 0) {
          const plainTextData = results[0].data;

          // Parse plain text into JSON format
          const jsonData = {
            Tags: Object.entries(JSON.parse(plainTextData)).map(([key, value]) => ({
              Name: key,
              Value: value,
            })),
          };

          res.status(200).json(jsonData);
        } else {
          res.status(404).send('No data found');
        }

        connection.end();
      }
    );
  });
}
