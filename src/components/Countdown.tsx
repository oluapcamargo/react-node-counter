import { useState, useEffect, useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import cx from 'classnames';
import { Console } from 'console';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';


export function Countdown() {
    const {minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown} = useContext(CountdownContext);
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [sencondsLeft, sencondsRight] = String(seconds).padStart(2, '0').split('');   

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{sencondsLeft}</span>
                    <span>{sencondsRight}</span>
                </div>
            </div>
            { hasFinished ? (
                <button disabled type="button" className={styles.countdownButton}>
                    Ciclo Encerrado <img src="/icons/twitter.svg" />                    

                </button>
            ) : (
                <>
                {isActive ? (
                <button type="button" className={cx(styles.countdownButton, styles.countdownButtonActive)}
                    onClick={resetCountdown}>
                    Abandonar ciclo
                </button>
            ) : (
                    <button type="button" className={styles.countdownButton} onClick={startCountdown}>
                        Iniciar um Ciclo
                    </button>
                )}
                </>
            )
            }
        </div>
    );
}