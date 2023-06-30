
import styles from '../styles/About.module.css'
import Image from 'next/image';


export default function About() {
  return(
    <>

      <div className={styles.mainheader}>
        <h1>About</h1>
      </div>
      <div className={styles.aboutcontainer}>
        <div className={styles.envcontainer}>
          <div className={styles.envsenimage}>
            <Image src="/assets/envsen.png" alt="envsen" width={421} height={181} className={styles.image} style={{objectFit: "contain"}}  />

            <b style={{
              fontSize: ' 10px',
              display: 'block',
            }}>ZPHS01B Multi-in-one Air Quality Monitoring Sensor Module</b><br/>
          
          </div>
          <div style={{padding: '15px'}}>
            <b>Target Gases:</b>
            <ul>
              <li>CO2</li>
              <li>PM2.5</li>
              <li>CH2O</li>
              <li>O3</li>
              <li>CO</li>
              <li>TVOC</li>
              <li>NO2</li>
              <li>Temperature</li>
              <li>Humidity</li>
            </ul>
          </div>

          <div className={styles.envsentext}>
            <p>
              Air quality monitoring sensor module, requires command byte to be sent over UART in order to get a response.
              
            </p>
          </div>
        </div>
        <div className={styles.systemarch}>
            <div style={{ display:'inline-block'}}>
              <Image src="/assets/systemarch.png" alt="systemarch" width={528} height={449} className={styles.image} style={{objectFit: "contain"}}/>
            </div>
            <div className={styles.systemarchtext}>
              <b style={{padding: '15px'}}>System architecture | Data handling</b>
              <p style={{padding: '15px'}}>
                Robustel R1511 router runs a script that will send the command bytes to the sensor module and receive the response.<br/>
                The response is processed and sent to a web server via HTTP post request.<br/>
                A converter is required to convert the UART output of the sensor module to RS232 for the router to communicate.
              </p>
            </div>
        </div>
      </div>


    </>
  )
}