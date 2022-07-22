import classes from './style.module.scss';
import React from 'react';
import NavMenuItem from '@/components/admin/Navbar/NavMenu/NavMenuItem';
import { faChartLine ,faChartPie} from '@fortawesome/free-solid-svg-icons';

const NavMenu =() =>{
  return <ul className={classes.menu}>
    <NavMenuItem label={"Dashboard"} onClick={()=>{}} icon={faChartPie}/>
    <NavMenuItem label={"abc"} onClick={()=>{}} icon={faChartLine}/>
    <NavMenuItem label={"abc"} onClick={()=>{}} icon={faChartLine}/>
    <NavMenuItem label={"abc"} onClick={()=>{}} icon={faChartLine}/>
  </ul>;
}

export default NavMenu;
