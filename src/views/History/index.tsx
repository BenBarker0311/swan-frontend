import React, { useState, useEffect } from 'react'
import HeaderPart from '../../components/HeaderPart';
import styles from './index.module.scss';
import {
	Grid,
	Typography,
	Link,
	CircularProgress,
	Box,
	Button,
	Modal
} from '@mui/material'

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { StyledPrimaryButton } from '../../components/Buttons'
import SideBar from '../../components/SideBar'

// toast import
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const History = () => {
    return (
		<>
		<SideBar />
			<div className={styles.home}>
				<HeaderPart></HeaderPart>
				<Grid container justifyContent="center" className={styles.main_content}
					sx={{ flexGrow: 1 }}
				>
					<Grid item xs={12} sm={12} md={4}>
						{/* <Typography className={styles.wallet_connection}>WALLET CONNECTION</Typography> */}
					</Grid>
					<Grid item xs={12} sm={12} md={8}>

					</Grid>
				</Grid >
			</div>
		</>
    )
}

export default History