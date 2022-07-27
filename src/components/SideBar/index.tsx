import { useMemo, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { useHistory, useLocation } from "react-router-dom";

// redux import
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hook";

// image import
import logo from './../../assets/images/swanlogo.png'
import avatar from './../../assets/images/avatar.png'

// icon import
import DashboardIcon from '@mui/icons-material/ViewCompactOutlined';
import StrategiesIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/HistoryOutlined';
import SupportIcon from '@mui/icons-material/HeadsetMicOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

// web3 import

const SideBar = () => {
  const base_URL = '/';
  const history = useHistory();
  const location = useLocation();
  const global = useAppSelector((state) => state.global);
  // web3 core
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.side_header}`}>
        <div className={styles.side_title}>
          <img src={logo} width='80%'></img>
        </div>
      </div>
      {/* <div className={styles.user_data}>
        <img src={avatar}></img>
        <div className={styles.user_name}>John Cornor</div>
        <div className={styles.mail_address}>johnc@gmail.com</div>
      </div> */}
      <div className={styles.side_content}>
        {/* <div className={`${styles.link} ${location.pathname == '/dashboard' ? styles.active : ''}`} onClick={() => history.push('/dashboard')}>
          <div id="dashboard" className={styles.link_content}>
            <DashboardIcon />
            <div className={styles.button_content}>DashBoard</div>
          </div>
        </div> */}

        <div className={`${styles.link} ${location.pathname == '/strategies' ? styles.active : ''}`} onClick={() => history.push('/strategies')}>
          <div id="strategies" className={styles.link_content}>
            <StrategiesIcon />
            <div className={styles.button_content}>Strategies</div>
          </div>
        </div>

        <div className={`${styles.link} ${location.pathname == '/history' ? styles.active : ''}`} onClick={() => history.push('/history')}>
          <div id="history" className={styles.link_content}>
            <HistoryIcon />
            <div className={styles.button_content}>History</div>
          </div>
        </div>

        <div className={`${styles.link} ${location.pathname == '/support' ? styles.active : ''}`} onClick={() => history.push('/support')}>
          <div id="support" className={styles.link_content}>
            <SupportIcon />
            <div className={styles.button_content}>Support</div>
          </div>
        </div>

        <div className={`${styles.link} ${location.pathname == '/settings' ? styles.active : ''}`} onClick={() => history.push('/settings')}>
          <div id="settings" className={styles.link_content}>
            <SettingsIcon />
            <div className={styles.button_content}>Settings</div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default SideBar;