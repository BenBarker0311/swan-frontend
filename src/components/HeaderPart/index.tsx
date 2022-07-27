import { useMemo, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { toast } from 'react-toastify'

import { useResize } from "./../../utils/Helper";
import styles from './index.module.scss';

// image import
import logo from './../../assets/images/Logo_main.png'
import avatar from './../../assets/images/avatar.png'

// icon import
import DashboardIcon from '@mui/icons-material/ViewCompactOutlined';
import StrategiesIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/HistoryOutlined';
import SupportIcon from '@mui/icons-material/HeadsetMicOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';

// redux import
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hook";

import { setAuthorizeInfo, getDiscordAccountInfo, setDiscordAccountInfo } from '../../redux/actions'

const HeaderPart = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const { isMobile, isResponsive } = useResize();
    const dispatch = useDispatch();
    const global = useAppSelector((state) => state.global);
    const history = useHistory();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickAway = () => {
        setIsOpen(false);
    };

    const handleLogoutClick = () => {
        setIsClicked(!isClicked);
        // history.push('/dashboard');
    };

    const handleLogout = () => {
        // console.log("logout")
        localStorage.removeItem('authorize')
        localStorage.removeItem('lastAuthTime')

        setAuthorizeInfo({
            access_token: null,
            token_type: null,
            expires_in: null,
            scope: null
        }, dispatch)

        setDiscordAccountInfo({
            id: null,
            username: null,
            avatar: null,
            avatar_decoration: null,
            discriminator: null,
            public_flags: null,
            flags: null,
            banner: null,
            banner_color: null,
            accent_color: null,
            locale: null,
            mfa_enabled: null
        }, dispatch)

    };
    return (
        <div>
            {!isMobile ?
                <div className={styles.root}>
                    <div className={styles.header_content}>
                        <div className={styles.header_account}>
                            <div className={styles.account_name}>
                                {props.headerContent}
                            </div>
                        </div>
                        {(props.headerContent === 'Current Strategies with Swan') ?
                            <div className={styles.header_button_group}>
                                {/* <div className={styles.header_button}>
                                    <FileUploadOutlinedIcon />
                                    <div style={{fontSize: '14px', marginLeft: '5px'}}>Deposit</div>
                                </div> */}
                                <div className={styles.header_button} style={{ backgroundColor: '#FFFFFF', color: '#585858' }}>
                                    <LockOpenIcon />
                                    <div style={{ fontSize: '14px', marginLeft: '5px' }}>Unlock</div>
                                </div>
                                {/* <div className={styles.header_button} style={{backgroundColor:'#FFFFFF', color: '#585858', opacity: 0.5}}>
                                    <FileDownloadOutlinedIcon />
                                    <div style={{fontSize: '14px', marginLeft: '5px'}}>Withdraw</div>
                                </div> */}
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
                :
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div>
                        <div className={styles.root}>
                            <div className={styles.header_menubar}>
                                <a onClick={toggleMenu}><MenuIcon style={{ marginTop: '10px' }} sx={{ color: '#000000' }}></MenuIcon></a>
                            </div>
                            <div className={styles.header_content}>
                                <div className={styles.header_account}>
                                    <div className={styles.account_name}>
                                        Welcome, John
                                    </div>
                                    <img src={avatar}></img>
                                </div>
                            </div>
                        </div>
                        <div className={styles.side_content} style={{ visibility: isOpen ? `visible` : `hidden`, opacity: isOpen ? 1 : 0 }}>
                            <div className={`${styles.link}`} onClick={() => history.push('/dashboard')}>
                                <div id="dashboard" className={styles.link_content}>DashBoard</div>
                            </div>

                            <div className={styles.link} onClick={() => history.push('/strategies')}>
                                <div id="strategies" className={styles.link_content}>Strategies</div>
                            </div>
                            <div className={styles.link} onClick={() => history.push('/history')}>
                                <div id="history" className={styles.link_content}>History</div>
                            </div>

                            <div className={styles.link} onClick={() => history.push('/support')}>
                                <div id="support" className={styles.link_content}>Support</div>
                            </div>
                            <div className={styles.link} onClick={() => history.push('/settings')}>
                                <div id="settings" className={styles.link_content}>Settings</div>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
            }
        </div>
    )
}

export default HeaderPart;