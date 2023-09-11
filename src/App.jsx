import { useState } from 'react'
import Die from "./components/Die"

function App() {
	

	function allNewDice() {
		const newDice = []
		for (let i = 0; i < 10; i++) {
			let randomNumber = Math.floor(Math.random() * 6) + 1
			newDice.push(randomNumber)
		}
		return newDice
	}

	allNewDice()


	return (
		<main>
			<div className='dice-container'>
				<Die value={5} />
				<Die value={5} />
				<Die value={5} />
				<Die value={5} />
				<Die value={5} />
				<Die value={5} />
				<Die value={5} />
				<Die value={5} />
				<Die value={5} />
				<Die value={5} />
			</div>
		</main>
	)
}

export default App
