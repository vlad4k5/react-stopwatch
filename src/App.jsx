import "./App.scss"
import { useEffect, useState, useCallback } from "react"
import  {Subject, interval } from "rxjs"
import { takeUntil } from "rxjs/operators"

const App = () => {

  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
 
  useEffect(() => {
    const unsubscribe$ = new Subject() 
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (isRunning) {
          setSeconds(val => val + 1000)
        }
      })
    return () => {
      unsubscribe$.next()
      unsubscribe$.complete()
    }
  }, [isRunning])
 
  const onClickStopStartButton = useCallback(() => {
    if (isRunning){
      setIsRunning(false)
      setSeconds(0)
    } else{
      setIsRunning(true)
    }
  }, [isRunning])
 
  const onClickResetButton = useCallback(() => {
    setSeconds(0)
    setIsRunning(true)
  }, [])
 
  const onClickWaitButton = useCallback(() => {
    if (isClicked){
      setIsRunning(false)
    }
    setTimeout(() => setIsClicked(false), 300)
    setIsClicked(true)
  }, [isClicked])
 
  return <div className="appContainer">

      <div className="timer"> {new Date(seconds).toISOString().slice(11, 19)}</div>

      <div className="buttons">
        <button className={isRunning ? "stopButton" : "startButton"} onClick={onClickStopStartButton}>
          {isRunning ? "Stop": "Start"}
        </button>
        <button className="waitButton" onClick={onClickWaitButton}>Wait</button>
        <button className="resetButton" onClick={onClickResetButton}>Reset</button>
      </div>
      
  </div>
}
export default App