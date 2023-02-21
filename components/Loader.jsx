import React from 'react';
import styles from '../styles/loader.module.css'
const Loader = () => (
    <div className='justify-center flex items-center'>
        <div className={styles.spinner} ></div>  
    </div>
);

export default Loader;