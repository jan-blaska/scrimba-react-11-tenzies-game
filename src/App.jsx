import { useState, useEffect } from 'react'
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {
	const [dice, setDice] = useState(allNewDice())
	const [tenzies, setTenzies] = useState(false)

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid()
		}
	}

	function allNewDice() {
		const newDice = []
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie())
		}
		return newDice
	}

	function rollDice() {
		setDice(oldDice => oldDice.map(die => {
			return die.isHeld === true ? die : generateNewDie()
		}))
	}

	function playAgain() {
		setTenzies(false)
		setDice(allNewDice())
	}

	function holdDice(id) {
		setDice(oldDice => oldDice.map(die => {
			return id === die.id ? {...die, isHeld: !die.isHeld} : die
		}))
	}

	useEffect(() => {
		const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
	}, [dice])

	const dieElements = dice.map((die) => {
		return (
			<Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
		)
	})

	return (
		<main>
			{tenzies && <Confetti />}
			<h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			<div className='dice-container'>
				{dieElements}
			</div>
			<button 
				onClick={tenzies ? playAgain : rollDice} 
				className='roll-dice-btn'>{tenzies ? "New game" : "Roll"}</button>
		</main>
	)
}

export default App
