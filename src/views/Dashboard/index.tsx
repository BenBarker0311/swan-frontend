import { useState, useEffect } from 'react'
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

import HeaderPart from '../../components/HeaderPart'
import { StyledPrimaryButton } from '../../components/Buttons'
import SideBar from '../../components/SideBar'

// wallet image import
import metamaskIcon from './../../assets/images/wallets/metamask.png'
import authereumIcon from './../../assets/images/wallets/authereum.png'
import coinbaseIcon from './../../assets/images/wallets/coinbase.png'
import fortmaticIcon from './../../assets/images/wallets/fortmatic.png'
import gnosisIcon from './../../assets/images/wallets/gnosis.png'
import metamask2Icon from './../../assets/images/wallets/metamask2.png'
import metamask3Icon from './../../assets/images/wallets/metamask3.png'
import operaIcon from './../../assets/images/wallets/opera.png'
import trezorIcon from './../../assets/images/wallets/Trezor-logo.png'
import walletConnectIcon from './../../assets/images/wallets/walletConnect.png'

// chart import
import LineChart from '../../components/Chart/Line'
import DoughnutChart from '../../components/Chart/DoughNut'
import BarChart from '../../components/Chart/Bar'
import StackChart from '../../components/Chart/StackedBar'

// toast import
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useResize } from '../../utils/Helper'

// redux import
import { useAppSelector } from "../../redux/hook"
import { useDispatch } from "react-redux"

// sass import
import styles from './index.module.scss'
// web3 import
const style = {
	position: 'relative',
	margin: '50px auto',
	bgcolor: '#0F2D60',
	boxShadow: 24,
	padding: '40px',
	borderRadius: '12px'
}

const Dashboard = () => {
	const chainConfig = {
		chainId: '0x1',
		chainName: 'Ethereum Mainnet',
		nativeCurrency: {
			name: 'ETH',
			symbol: 'ETH',
			decimals: 18
		},
		rpcUrls: ['https://mainnet.infura.io/v3/'],
		blockExplorerUrls: ['https://etherscan.io']
	}
	const [openWalletModal, setOpenWalletModal] = useState(false);
	const handleOpenWalletModal = () => setOpenWalletModal(true);
	const handleCloseWalletModal = () => setOpenWalletModal(false);

	// see if wallet connected-any wallet connected
	const [walletConnected, setWalletConnected] = useState(false)

	// set individual wallet state
	const [metamaskState, setMetamaskState] = useState(false)
	const [walletConnectState, setWalletConnectState] = useState(false)
	const [gnosisState, setGnosisState] = useState(false)
	// web3 core
	// console.log("web3 data is:", active, account, activate, deactivate)
	// const provider = new WalletConnectProvider({
	// 	rpc: {
	// 	  1: "https://mainnet.infura.io/v3/"
	// 	},
	// 	bridge: 'https://bridge.walletconnect.org',
	// 	qrcode: true,
	// 	pollingInterval: 15000,
	// });
	useEffect(() => {
		(async () => {
			let chainId
			chainId = await (window as any).ethereum.request({ method: 'eth_chainId' })
			// console.log('chainid:', chainId)
			try {
				if (chainId !== 1 && chainId !== 56) {
					(window as any).ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: chainConfig.chainId }],
					})
				}
			} catch (switchError: any) {
				console.log('error adding chain:', switchError)
			}
		})()
	}, [])
	// useEffect(() => {
	// 	(async () => {
	// 		if (account === undefined) {
	// 			setOpenWalletModal(true)
	// 		}
	// 	})()
	// }, [openWalletModal])

	const handleWalletConnect = async () => {
		// console.log(metamaskState)

		if (metamaskState === true) {
			// console.log("active value", injected)
			// console.log("account value", window)
			if (window.ethereum === undefined) {
				toast.error("Please install a Metamask wallet on your browser.", { theme: 'dark' })
				return null
			}
			toast.success("Metamask wallet connected!", { theme: 'light' })
			setWalletConnected(true)
		}
		else if (walletConnectState === true) {
			try {
				// console.log("walletconnect", walletconnect)
				if (window.ethereum === undefined) {
					toast.error("Please install a wallet on your browser.", { theme: 'dark' })
					return null
				}
				toast.success("WalletConnect wallet connected!", { theme: 'light' })
				setWalletConnected(true)
			} catch (e) {
				toast.warning("Connection failed!", { theme: 'light' })
			}

		}
		else if (gnosisState === true) {
			if (window.ethereum === undefined) {
				toast.error("Please install a wallet on your browser.", { theme: 'dark' })
				return null
			}
			toast.success("Gnosis connected!", { theme: 'light' })
			setWalletConnected(true)
		}
		else {
			toast.error("No wallet connected", { theme: 'dark' })
		}
		setOpenWalletModal(false)

	}

	const handleMetamaskWallet = async () => {
		await setMetamaskState(true)
		await setWalletConnectState(false)
		await setGnosisState(false)
		// console.log("e", e.target.id)
	}

	const handleWalletConnectWallet = async () => {
		await setMetamaskState(false)
		await setWalletConnectState(true)
		await setGnosisState(false)
	}

	const handleGnosisWallet = async () => {
		await setMetamaskState(false)
		await setWalletConnectState(false)
		await setGnosisState(true)
	}


	const headerContent = 'Welcome, John'
	const { isMobile, isResponsive } = useResize()
	return (
		<>
			{/* <SideBar /> */}
			<div className={styles.home}>
				<Modal
					open={openWalletModal}
					onClose={handleCloseWalletModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					sx={{ overflow: 'auto' }}
				>
					<Box sx={style} style={{ width: isMobile ? '90%' : '700px' }}>
						<Typography className={styles.modal_header} id="modal-modal-title" variant="h6" component="h2">
							Select a Wallet
						</Typography>
						<Typography className={styles.modal_header_content} id="modal-modal-description" sx={{ mt: 1.5, mb: 1.5 }}>
							Please select a wallet to connect to Swan App:
						</Typography>
						<div className={styles.button_row}>
							<div id='metamask' className={`${styles.wallet_button} ${metamaskState ? styles.active : ''}`} onClick={handleMetamaskWallet}>
								<div className={styles.button_content}>
									<img src={metamaskIcon}></img>
									<div className={styles.button_name}>MetaMask</div>
								</div>
							</div>
							<div className={`${styles.wallet_button} ${walletConnectState ? styles.active : ''}`} onClick={handleWalletConnectWallet}>
								<div className={styles.button_content}>
									<img src={walletConnectIcon}></img>
									<div className={styles.button_name}>WalletConnect</div>
								</div>
							</div>
						</div>
						<div className={styles.button_row}>
							<div className={styles.wallet_button} onClick={handleOpenWalletModal}>
								<div className={styles.button_content}>
									<img src={authereumIcon}></img>
									<div className={styles.button_name}>Authereum</div>
								</div>
							</div>
							<div className={styles.wallet_button} onClick={handleOpenWalletModal}>
								<div className={styles.button_content}>
									<img src={fortmaticIcon}></img>
									<div className={styles.button_name}>Fortmatic</div>
								</div>
							</div>
						</div>
						<div className={styles.button_row}>
							<div className={styles.wallet_button} onClick={handleOpenWalletModal}>
								<div className={styles.button_content}>
									<img src={coinbaseIcon}></img>
									<div className={styles.button_name}>Coinbase Wallet</div>
								</div>
							</div>
							<div className={`${styles.wallet_button} ${gnosisState ? styles.active : ''}`} onClick={handleGnosisWallet}>
								<div className={styles.button_content}>
									<img src={gnosisIcon}></img>
									<div className={styles.button_name}>Gnosis Safe</div>
								</div>
							</div>
						</div>
						<div className={styles.button_row}>
							<div className={styles.wallet_button} onClick={handleOpenWalletModal}>
								<div className={styles.button_content}>
									<img src={operaIcon}></img>
									<div className={styles.button_name}>Opera</div>
								</div>
							</div>
							<div className={styles.wallet_button} onClick={handleOpenWalletModal}>
								<div className={styles.button_content}>
									<img src={trezorIcon}></img>
									<div className={styles.button_name} style={{ marginLeft: '35px' }}>MetaMask</div>
								</div>
							</div>
						</div>
						<div className={styles.button_row}>
							<div className={styles.wallet_button} onClick={handleOpenWalletModal}>
								<div className={styles.button_content}>
									<img src={metamask2Icon}></img>
									<div className={styles.button_name}>MetaMask</div>
								</div>
							</div>
							<div className={styles.wallet_button} onClick={handleOpenWalletModal}>
								<div className={styles.button_content}>
									<img src={metamask3Icon}></img>
									<div className={styles.button_name}>MetaMask</div>
								</div>
							</div>
						</div>

						<div className={styles.connect_button_row}>
							<div className={styles.connect_button}>
								<div className={styles.connect_content} onClick={handleWalletConnect}>Connect</div>
							</div>
						</div>

						<div className={styles.modal_footer}>
							<div className={styles.footer_content} onClick={handleCloseWalletModal}>How to add a wallet?</div>
							<div className={styles.footer_content} onClick={handleCloseWalletModal}>Show More</div>
						</div>
					</Box>
				</Modal>
				<HeaderPart headerContent={headerContent}></HeaderPart>
				<Grid container justifyContent="center" className={styles.main_content}
					sx={{ flexGrow: 1 }}
				>
					<Grid item xs={12} sm={12} md={8}>
						<Box className={styles.chart_area} sx={{ mr: isMobile ? 0 : 4 }}>
							<StackChart />
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<Box className={styles.chart_area} sx={{ mt: isMobile ? '30px' : 0 }}>
							<BarChart />
						</Box>
					</Grid>
				</Grid >
				<Grid container justifyContent="center" className={styles.main_content}
					sx={{ flexGrow: 1, mb: 2 }}
				>
					<Grid item xs={12} sm={12} md={6}>
						<Box className={styles.chart_area} sx={{ mr: isMobile ? 0 : 4 }}>
							<LineChart />
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={6} sx={{ mt: isMobile ? '30px' : 0 }}>
						<Box className={styles.chart_area}>
							<DoughnutChart />
						</Box>
					</Grid>
				</Grid >
			</div>
		</>
	)
}

export default Dashboard