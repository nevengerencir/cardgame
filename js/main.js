document.querySelector('h2').innerText = `PLAYER 1 : ${Number(localStorage.getItem('count1'))} \n\n PLAYER 2 : ${Number(localStorage.getItem('count2'))}`
document.querySelector('span').innerText = `Remaining cards : ${Number(localStorage.getItem('remaining_cards'))}`
document.querySelector('#player1').src =  localStorage.getItem('player1card')
document.querySelector('#player2').src =  localStorage.getItem('player2card')



if (!localStorage.getItem('deck') && !localStorage.getItem('count'))
{  getDeck()}

function getDeck(){
    const url = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
    fetch(url)
        .then(res => res.json())
        .then (data => { 
            localStorage.setItem('deck',data.deck_id)
            localStorage.setItem('count1',0)
            localStorage.setItem('count2',0)
            localStorage.setItem('remaining_cards',data.remaining)
            localStorage.setItem('player1card','')
            localStorage.setItem('player2card','')

    })
        .catch(err => {
            console.log(`error ${err}`);
          
  })}
  
  function start(){
    if(document.querySelector('h3').innerText === 'You have finished your deck, if you want to play again please reshuffle'
    && localStorage.getItem('remaining_cards') == '0'){
        return
    }
    else if (localStorage.getItem('remaining_cards') == '0'){
      document.querySelector('h3').innerText = 'You have finished your deck, if you want to play again please reshuffle';
      document.querySelector('#reshuffle').classList.toggle('hidden')  }
    else{
        draw2cards()
    }
    }
  document.querySelector('#drawTwo').addEventListener('click',start) 
   document.querySelector('#reshuffle').addEventListener('click',reshuffle)


  transformToValue = value => {
    if(value === 'KING'){
        return 13
    }
    else if(value === 'ACE'){
        return 14
    } 
    else if(value === 'QUEEN'){
        return 12
    } 
    else if(value === 'JACK'){
        return 11
    }
    else {
        return value
    }}
   
    function draw2cards(){
        const url = `https://www.deckofcardsapi.com/api/deck/${localStorage.getItem('deck')}/draw/?count=2`
        fetch(url)
            .then(res => res.json())
            .then (data => { 
            
                document.querySelector('#player1').src = data.cards[0].image;
                document.querySelector('#player2').src = data.cards[1].image;
                let player1value = transformToValue(data.cards[0].value)
                localStorage.setItem('player1card',data.cards[0].image)
    
                let player2value = transformToValue(data.cards[1].value)
                localStorage.setItem('player2card',data.cards[1].image)
    
                localStorage.setItem('remaining_cards',(Number(localStorage.getItem('remaining_cards'))-2))
                checkResult(player1value,player2value)
                
            }
            )
            .then(resultat => { 
                document.querySelector('h2').innerText = `PLAYER 1 : ${Number(localStorage.getItem('count1'))} \n\n PLAYER 2 : ${Number(localStorage.getItem('count2'))}`
                document.querySelector('span').innerText = `Remaining cards : ${localStorage.getItem('remaining_cards')} `
        })
            
            .catch(err => {
                console.log(`error ${err}`);
              
      })}

    function checkResult(player1value,player2value){
    if (player1value<player2value){
        document.querySelector('h3').innerText = 'Player 2 wins'
        localStorage.setItem('count2',(Number(localStorage.getItem('count2'))+1))
    }
    else if (player1value>player2value){
        document.querySelector('h3').innerText = 'Player 1 wins'
        localStorage.setItem('count1',(Number(localStorage.getItem('count1'))+1))
    }
    else if (player1value=player2value){
        document.querySelector('h3').innerText = 'Draw'
    }}

    function reshuffle(){
        const url = `https://www.deckofcardsapi.com/api/deck/${localStorage.getItem('deck')}/return/`
        fetch(url)
            .then(res => res.json())
            .then (data => localStorage.setItem('remaining_cards',data.remaining))
            document.querySelector('#reshuffle').classList.toggle('hidden')
            document.querySelector('h3').innerText = 'Press play when you want to start again!';
            

            }