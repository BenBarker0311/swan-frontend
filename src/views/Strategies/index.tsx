import { useState, useEffect } from 'react'
import {
	Grid,
	Typography,
	Link,
	CircularProgress,
	Box,
	Button,
	Modal,
	Stack
} from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ReactCountryFlag from "react-country-flag"

import HeaderPart from '../../components/HeaderPart'
import { StyledPrimaryButton } from '../../components/Buttons'
import SideBar from '../../components/SideBar'

// toast import
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useResize } from '../../utils/Helper'

// redux import
import { useAppSelector } from "../../redux/hook"
import { useDispatch } from "react-redux"

// sass import
import styles from './index.module.scss'

//image import 
import swanAvatar from './../../assets/images/swan_avatar.png'
import logo from '../../assets/images/swanlogo.png'
import DiscordIcon from '../../components/Icons'

// icon import
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';

// chart import
import LineChart from '../../components/Chart/Line'
import ValueChart from '../../components/Chart/Bar/valueChart'
import DoughnutChart from '../../components/Chart/DoughNut'
import ValueOverTime from '../../components/Chart/Line/valueOverTime'
import HornedPuffin from '../../components/Chart/pnl/PnlRealized'

import axios from 'axios'
import AWS from 'aws-sdk'
import { getHornedPuffin, parseData } from './../../api'

AWS.config.update({
	accessKeyId: 'AKIAYBV2Y46UFUA55CQP',
	secretAccessKey: '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',
	region: 'eu-central-1'
})

const S3 = new AWS.S3();
// console.log("s3", S3)

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	border: 'none',
	outline: 'none'
}

const Strategies = () => {

	const { isMobile, isResponsive } = useResize()
	const [isLoading, setLoading] = useState(false)
	const [jsonDate, setjsonDate] = useState([])
	const [jsonPnl, setjsonPnl] = useState<any>([])
	const [jsonDailyPnl, setjsonDailyPnl] = useState([])
	const [jsonHeat, setjsonHeat] = useState([])

	useEffect(() => {
		(async () => {
			// console.log("s3 data is", parseJson1)	

			setLoading(true)
			// console.log('getHornedPuffin', getHornedPuffin)
			const data: any = await getHornedPuffin()
			const parseJson1: any = await parseData(data)
			// console.log("data is", parseJson1)
			setjsonPnl(parseJson1.tempPnl)
			setjsonDailyPnl(parseJson1.tempDailyPnl)
			setjsonHeat(parseJson1.tempHeat)
			setjsonDate(parseJson1.tempDate)
			setLoading(false)
		})()
	}, [])

	const headerContent = 'Current Strategies with Swan'

	return (
		<>
			{isLoading &&
				< CircularProgress sx={{
					position: `fixed`,
					left: `50%`,
					top: `50%`,
					transform: `translate(-50%,-50%)`
				}} />}
			<SideBar />
			<div className={styles.home}>
				<HeaderPart headerContent={headerContent}></HeaderPart>
				{isMobile ?
					<div className={styles.header_button_group}>
						<div className={styles.header_button} style={{ backgroundColor: '#FFFFFF', color: '#585858' }}>
							<LockOpenIcon />
							<div style={{ fontSize: '14px', marginLeft: '5px' }}>Unlock</div>
						</div>
					</div>
					:
					<></>
				}

				<Grid container justifyContent="center" className={styles.main_content}
					sx={{ flexGrow: 1 }}
				>
					<Grid item xs={12} sm={12} md={12} style={{ padding: !isMobile ? '0 0px 0 0' : '20px 0' }}>
						<Box className={styles.objective_panel}
							sx={{ backgroundColor: '#FFFFFF', pt: 2, pb: 2, display: 'block', width: '100%' }}>
							<ValueOverTime />
						</Box>
					</Grid>
				</Grid >

				<Grid container justifyContent="center" className={styles.main_content}
					sx={{ flexGrow: 1 }}
				>
					<Grid item xs={12} sm={6} md={6} style={{ padding: !isMobile ? '0 24px 0 0' : '10px 0' }}>
						<Box className={styles.objective_panel}
							sx={{ backgroundColor: '#FFFFFF', display:'flex',height: '120px' }}>
								<div className={styles.objective_header}
									style={{ color: '#073763', fontSize: '18px', lineHeight: '19.6px', fontWeight: 400 }}>
									Current Treasury Total
								</div>
							<div style={{display:'flex',justifyContent:'space-between', alignItems:'center', width:'100%'}}>
								<div className={styles.objective_content}
									style={{
										paddingRight: isResponsive ? 0 : '20px', marginBottom: 0,
										color: '#073763',
										fontSize: '24px', lineHeight: '56px', fontWeight: 700
									}}>
									$6,193
								</div>
								<div className={styles.arrow_button} style={{ display: 'flex' }}><ArrowUpIcon />2.28%</div>
							</div>
						</Box>
					</Grid>
					<Grid item xs={12} sm={3} md={3} style={{ padding: !isMobile ? '0 24px 0 0' : '10px 0' }}>
						<Box className={styles.objective_panel}
							sx={{ backgroundColor: '#FFFFFF', display: 'flex', height: '120px'}}>
								<div className={styles.objective_header}
									style={{ color: '#073763', fontSize: '18px', lineHeight: '19.6px', fontWeight: 400 }}>
									Token Price
								</div>
							<div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
								<div className={styles.objective_content}
									style={{ paddingRight: isResponsive ? 0 : '20px', marginBottom: 0, color: '#073763', fontSize: '24px', lineHeight: '36px', fontWeight: 700 }}>
									$1,034
								</div>
								<div className={styles.arrow_button} style={{ display: 'flex', width: '30px', backgroundColor: '#DA1414' }}><ArrowDownIcon /></div>
							</div>
						</Box>
					</Grid>
					<Grid item xs={12} sm={3} md={3} style={{ padding: !isMobile ? '0 0px 0 0' : '10px 0' }}>
						<Box className={styles.objective_panel}
							sx={{ backgroundColor: '#FFFFFF', pt: 2, pb: 2, display: 'flex', height: '120px' }}>
								<div className={styles.objective_header}
									style={{ color: '#073763', fontSize: '18px', lineHeight: '19.6px', fontWeight: 400 }}>
									Other Price
								</div>
								<div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
									<div className={styles.objective_content}
										style={{ paddingRight: isResponsive ? 0 : '20px', marginBottom: 0, color: '#073763', fontSize: '24px', lineHeight: '36px', fontWeight: 700 }}>
										$1,034
									</div>
									<div className={styles.arrow_button} style={{ display: 'flex', width: '30px', backgroundColor: '#DA1414' }}><ArrowDownIcon /></div>
							</div>
						</Box>
					</Grid>
				</Grid >

				<Grid container justifyContent="center" className={styles.main_content}
					sx={{ flexGrow: 1 }} style={{ marginBottom: '0px' }}
				>
					<Grid item xs={12} sm={12} md={12} style={{ padding: 0 }}>
						<Box className={styles.objective_panel} sx={{ backgroundColor: '#FFFFFF', pt: 2, pb: 2, display: 'flex', borderRadius: '24px' }}>
							<HornedPuffin />
						</Box>
					</Grid>
				</Grid >

				<Grid container justifyContent="center" className={styles.main_content}
					sx={{ flexGrow: 1 }}
				>
					<Grid item xs={12} sm={12} md={6} style={{ padding: !isMobile ? '0 24px 0 0' : '20px 0' }}>
						<Box className={styles.objective_panel}
							sx={{ backgroundColor: '#FFFFFF', pt: 2, pb: 2, display: 'block', width: '100%', height: '400px' }}>
							<ValueChart />
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={6} style={{ padding: 0 }}>
						<Box className={styles.objective_panel}
							sx={{ backgroundColor: '#FFFFFF', pt: 2, pb: 2, display: 'block', width: '100%', height: '400px' }}>
							<DoughnutChart />
						</Box>
					</Grid>
				</Grid >

				<Grid container justifyContent="center" className={styles.main_content}
					sx={{ flexGrow: 1 }} style={{ marginBottom: '20px' }}
				>
					<Grid item xs={12} sm={12} md={6} style={{ padding: !isMobile ? '0 24px 0 0' : '20px 0' }}>
						<Box className={styles.objective_panel} sx={{ backgroundColor: '#FFFFFF', pt: 2, pb: 2, display: 'block', borderRadius: '24px' }}>
							<div className={styles.p_l_para}>PnL Realized</div>
							<div className={styles.pnl_data}>{jsonDailyPnl[jsonDailyPnl.length - 1]} $</div>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={6} style={{ padding: 0 }}>
						<Box className={styles.objective_panel} sx={{ backgroundColor: '#FFFFFF', pt: 2, pb: 2, display: 'block', borderRadius: '24px' }}>
							<div className={styles.p_l_para}>PnL Unrealized</div>
							<div className={styles.pnl_data}>{jsonPnl[jsonPnl.length - 1]} $</div>
						</Box>
					</Grid>
				</Grid >

				<Grid
					// className={styles.main_content}
					container
					spacing = {2}
					sx={{
						marginBottom: `10px`,
						background: `#FFFFFF`,
						color: `black`,
						padding: `15px 48px`
					}} >
					<Grid item lg={4} md={4} sm={12} sx={{textAlign:{lg:'start', md:'center', sm:'center', xs:'center'}}}>
						<img src={logo} width='50%'></img>
						<Typography variant='body2' sx={{marginTop:'10px'}}>Accessible, trustworthy financial performance</Typography>
					</Grid>	
					<Grid container item lg={4} md={4} sm={12} >
						<Grid container direction='column' item lg={6} sx={{textAlign:{lg:'start', md:'center', sm:'center', xs:'center'}}}>
							<Typography variant='h6' sx={{fontWeight:'bold'}}>INFO</Typography>
							<Typography>Docs</Typography>
							<Typography>Analytics</Typography>
							<Typography>Blog</Typography>
						</Grid>
						<Grid container direction='column' item lg={6} sx={{textAlign:{lg:'start', md:'center', sm:'center', xs:'center'}}}>
							<Typography variant='h6' sx={{fontWeight:'bold'}}>GOV</Typography>
							<Typography>Proposals</Typography>
							<Typography>Voting</Typography>
							<Typography>Roadmap</Typography>
						</Grid>
					</Grid>
					<Grid container direction='column' item lg={4} md={4} sm={12} sx={{gap:'5px',display:'flex', justifyContent:'space-between', textAlign:{lg:'start', md:'center', sm:'center', xs:'center'}}}>
						<Grid>
							<Typography variant='h6' sx={{fontWeight:'bold'}}>CONNECT</Typography>
						</Grid>
						<Stack direction='row' spacing={2} sx={{display:'flex',justifyContent:{lg:'start', md:'center', sm:'center', xs:'center'}}}>
							<a href='https://twitter.com/swan_solutions'><TwitterIcon sx={{color:'white', padding:'3px', backgroundColor:'black', borderRadius:'50%'}}/></a>
							<a href='https://discord.gg/KQmMWTNT8W'><DiscordIcon sx={{backgroundColor:'black', padding:'3px', borderRadius:'50%'}}/></a>
							<a href='https://telegram.com'><TelegramIcon sx={{color:'white', padding:'3px', backgroundColor:'black', borderRadius:'50%'}}/></a>
							<a href='https://www.youtube.com/channel/UCSl9Z-XfDv7c44pCByOuIHw/featured'><YouTubeIcon sx={{color:'white', padding:'3px', backgroundColor:'black', borderRadius:'50%'}}/></a>
						</Stack>
						<Stack direction='row' spacing={2} alignItems='center' sx={{justifyContent:{lg:'start', md:'center', sm:'center', xs:'center'}}}>
							<ReactCountryFlag 
								countryCode="GB"
								svg
								style={{
										width: '2em',
										height: '2em',
								}}
								title="GB"
							/>
							<Typography>English</Typography>
						</Stack>
					</Grid>
				</Grid>
			</div>
		</>
	)
}

export default Strategies