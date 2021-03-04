import { useState, useEffect, useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import cx from 'classnames';
import { Console } from 'console';
import { ChallengesContext } from '../contexts/ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [sencondsLeft, sencondsRight] = String(seconds).padStart(2, '0').split('');


    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.05 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => { setTime(time - 1); }, 1000);
        } else
            if (time == 0 && isActive) {
                setHasFinished(true);
                setIsActive(false);
                startNewChallenge();
            }

    }, [isActive, time]);

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