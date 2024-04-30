// the global vars to store values 

// getting the main input method in Node.js 
const prompt = require("prompt-sync")(); 


const ROWS = 3;
const COLS = 3; 



const SYMBOLS_COUNT ={ // a map in JS,also (Objects)
    "A": 2,
    "B":4,
    "C":6,
    "D":8
}//end of the table / obj

// this is the multiply values of which the user, in case of getting a line of 
// any one of these givens will by times the value
//eg a line of all A's the bet will be multiplied by 5
const SYMBOL_VALUES = { 
    "A":5,
    "B":4,
    "C":2,
    "D":2
    
} // 


// One put in some money


const deposit = () =>{
    while(true)
    {
        const depositAmount = prompt("Enter The amout of money: ")
        const NumberDepositAmount= parseFloat(depositAmount)
        if(isNaN(NumberDepositAmount) || (NumberDepositAmount <=0))
        {
            console.log("Not a vaild number, try again")
        }
        else{
            return NumberDepositAmount
        }
    }// end of the loop
}// end of deposit func


// Two determine the number of lines to bet on 
const getNumberOfLines  = ()=>{
    while(true)
    {
        const Lines= prompt("Enter The Number of lines to bet on(1 to 3): ")
        const NumberOfLines= parseFloat(Lines)
        if(isNaN(NumberOfLines) || (NumberOfLines <=0) || (NumberOfLines >3))
        {
            console.log("Not a vaild number, try again")
        }
        else{
            return NumberOfLines
        }
    }// end of the loop

} // end of the getNumberOfLines func



// Three get a bet amount 
// make sure the bet is less then the current balance amout
const getBet = (balance, lines) => {
    while(true)
    {
        const betAmount= prompt("Enter the bet per line: ")
        const BetAmount= parseFloat(betAmount)
        if(isNaN(BetAmount) || (BetAmount > (balance / lines)) || (BetAmount <= 0))
        {
            console.log("Invaild bet, Try again!")
        }
        else{
            return BetAmount
        }
    }// end of
    
}// end of GetBet function




//Four spin the slot machine 
const Spin=() => {
    const symbols = []; 
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol)
        }

    }// end of the loop

    const reels = []
    for(let i  = 0; i<COLS;i++) {
        reels.push([])
        const reelSymbols = [...symbols]
        for(let j  = 0 ;  j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbols.splice(randomIndex, 1);
            
        }// enf of the inner loop
    } // end of the outer loop 
    return reels 

} // end of the function


//Five check if the suer won
const transpose = (reels) => {

    const rows = []

    for(let  i = 0 ; i<ROWS ; i++){
        rows.push([])
        for(let j = 0 ; j < COLS ; j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows 
} // end of the function 

const printSlotMachine = (rows) => {

    for(const row of rows){
        let rowString = ""
        for(const [i,symbol] of row.entries()){
            rowString += symbol
            if(i!= row.length -1)
            {
                rowString +=" | "
            }
        }// end of the inner 

        // print the line of string 
        console.log(rowString)
        
    }// end of the outer 
   
} // end of the function

//Six give the user their winnings 

const getWinnings = (rows,bet,lines) =>{
    let winnings = 0 
    for(let row = 0 ; row < lines  ; row++)
    {
        const symbols = rows[row]
        let allSame = true 
        for(const symbol of symbols)
        {
            if(symbol != symbols[0]){ 
                // compare the first to the rest, once not equal then break 
                allSame =false 
                break ;
            }
        }
        if(allSame){
            // 
            winnings +=bet * SYMBOL_VALUES[symbols[0] ]
        }
    }

    return winnings

} // end of the function 

//seven Play again 


const game = () =>{

    // put a balance in the account
    let balance = deposit()


    while(true){
        console.log('You have a balance of $' + balance)

        // get the number of lines that you wound bet on 
        const numberOfLines = getNumberOfLines()
        // get a bet based on the balance 
        const bet = getBet(balance,numberOfLines)
        // get the balance for the user 
        balance -= bet*numberOfLines; 
        // spin the wheel for the user 
        const reels = Spin()

        const rows = transpose(reels)

         printSlotMachine(rows)

        const get_win = getWinnings(rows,bet,numberOfLines)

        balance += get_win
        console.log(`You won a ${get_win} total`)

        if(balance<= 0 ) {
            console.log('You ran out of money')
            break; 
        }
        const playAgain = prompt('Do you want to Play Again? y/n ')

        if(playAgain !='y' )  break; 


    }
    

}// end of the function 



//*************** this the main function call  */

game()


