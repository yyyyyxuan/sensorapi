"use client"

import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Link from 'next/link'
import styles from '../styles/NavBar.module.css'
export default function NavBar() {
  return(
    <>
    <div className={styles.navbar}>
      <div className={styles.links}>
        
        <Link href="/">
          <Typography style=
          {{display: 'flex',
            alignItems: "center",
}}>
            Home
            <HomeIcon/>
          </Typography>
          
        </Link>
        <Link href="/about">
          <Typography style=
          {{display: 'flex',
            alignItems: "center",
}}>
            About
            <InfoOutlinedIcon/>
          </Typography>
          
        </Link>
        
  
      </div>
    </div>
    </>
  )

}