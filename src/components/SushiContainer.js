import React, { useState } from "react"
import MoreButton from "./MoreButton"
import Sushi from "./Sushi"

function SushiContainer({ sushis, onEatSushi }) {
   const [currentSushiIndex, setCurrentSushiIndex] = useState(0)

   const sushisToDisplay = sushis
      .slice(currentSushiIndex, currentSushiIndex + 4)
      .map(sushi => (
         <Sushi key={sushi.id} sushi={sushi} onEatSushi={onEatSushi} />
      ))

   function handleMoreSushi() {
      setCurrentSushiIndex(
         currentSushiIndex => (currentSushiIndex + 4) % sushis.length
      )
      // if (currentSushiIndex === sushis.length - 4) {
      //    setCurrentSushiIndex(0)
      // } else {
      //    setCurrentSushiIndex(currentSushiIndex => currentSushiIndex + 4)
      // }
   }

   // .slice(96, 100)
   return (
      <div className="belt">
         {sushisToDisplay}
         <MoreButton onMoreSushiClick={handleMoreSushi} />
      </div>
   )
}

export default SushiContainer
