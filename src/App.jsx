import {useCallback, useEffect, useState} from 'react'
import './App.css';
import robotImg from './robot.png'

function App() {
    const boardLength = 5;
    const [robot, setRobot] = useState([{x: 0, y: 0}])
    const [direction, setDirection] = useState('robotImage-right')

    const pressKeyHandler = useCallback((e) => {
        if (e.key === 'ArrowRight') {
            setDirection('robotImage-right');
        } else if (e.key === 'ArrowLeft') {
            setDirection('robotImage-left');
        } else if (e.key === 'ArrowUp') {
            setDirection('robotImage-up');
        } else if (e.key === 'ArrowDown') {
            setDirection('robotImage-down');
        }

        const newRobot = [...robot]
        const robotIcon = {...newRobot[0]}
        if (robotIcon.x < 4 && e.key === 'k' && direction === 'robotImage-right') {
            robotIcon.x += 1
            console.log(robotIcon.x)
        } else if (robotIcon.x > 0 && e.key === 'k' && direction === 'robotImage-left') {
            robotIcon.x -= 1
        } else if (robotIcon.y > 0 && e.key === 'k' && direction === 'robotImage-up') {
            robotIcon.y -= 1
        } else if (robotIcon.y < 4 && e.key === 'k' && direction === 'robotImage-down') {
            robotIcon.y += 1
        }
        newRobot.unshift(robotIcon)
        newRobot.pop()
        setRobot(newRobot)
    }, [robot, direction])

    useEffect(() => {
        document.addEventListener('keydown', pressKeyHandler)
        return () => {
            document.removeEventListener('keydown', pressKeyHandler)
        }
    }, [pressKeyHandler])

    return (
        <div className='game'>
            <h1>Robot Simulator</h1>
            <div className='gameBoard'>
                {Array.from({length: 25}, (_, i) => (
                    <div className='item' key={i}>
                        {robot.some((element) =>
                            element.x === i % boardLength && element.y === Math.floor(i / boardLength)) && (
                            <img className={direction} src={robotImg} alt={robot}/>
                        )}
                    </div>
                ))}
            </div>
            <div className='rules'>
                <p> Press </p>
                <button className='forwardButton'>←</button>
                <button className='forwardButton'>→</button>
                <button className='forwardButton'>↑</button>
                <button className='forwardButton'>↓</button>
                <p> to move the robot left, right, up and down.</p>

            </div>
            <div className='rules'>
                <p> Press </p>
                <button className='forwardButton'>K</button>
                <p> to move the robot forwards</p>
            </div>
        </div>
    );
}

export default App;
