import React, { useState, useEffect } from "react"
import SushiContainer from "./SushiContainer"
import Table from "./Table"

const API = "http://localhost:3001/sushis"

function App() {
   const [sushis, setSushis] = useState([])
   const [wallet, setWallet] = useState(100)

   useEffect(() => {
      fetch(API)
         .then(r => r.json())
         .then(sushis => {
            const modifiedSushis = sushis.map(sushi => {
               return { ...sushi, isEaten: false }
            })
            setSushis(modifiedSushis)
         })
   }, [])

   function handleEatSushi(eatenSushi) {
      const remainder = wallet - eatenSushi.price

      if (remainder >= 0) {
         const updatedSushis = sushis.map(sushi => {
            if (sushi.id === eatenSushi.id) {
               return { ...sushi, isEaten: true }
            } else {
               return sushi
            }
         })
         setWallet(remainder)
         setSushis(updatedSushis)
      } else {
         alert("You don't have enough money to buy this sushi!")
      }
   }

   function handleAddMoney(amount) {
      setWallet(wallet => wallet + amount)
   }

   const emptyPlates = sushis.filter(sushi => sushi.isEaten)

   return (
      <div className="app">
         <SushiContainer sushis={sushis} onEatSushi={handleEatSushi} />
         <Table
            plates={emptyPlates}
            wallet={wallet}
            onAddMoney={handleAddMoney}
         />
      </div>
   )
}

export default App
