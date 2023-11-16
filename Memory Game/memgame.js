let cardavail = [
    {
        name : 'canobis',
        icon : '<i class="fa-solid fa-cannabis fa-lg" style="color: #b4f500;"></i>'
    },
    {
        name : 'bomb',
        icon : '<i class="fa-solid fa-bomb fa-lg" style="color: #010537;"></i>'
    },
    {
        name : 'carrot',
        icon : '<i class="fa-solid fa-carrot fa-lg" style="color: #fb7c13;"></i>'
    },
    {
        name : 'bird',
        icon : '<i class="fa-brands fa-twitter fa-lg" style="color: #00aaff;"></i>'
    },
    {
        name : 'leaves',
        icon : '<i class="fa-brands fa-pagelines fa-lg" style="color: #1fb222;"></i>'
    },
    {
        name : 'apple',
        icon : '<i class="fa-solid fa-apple-whole fa-lg" style="color: #fb0404;"></i>'
    },
    {
        name : 'lemon',
        icon : '<i class="fa-regular fa-lemon fa-lg" style="color: #eeff00;"></i>'
    },
    {
        name : 'chilly',
        icon : '<i class="fa-solid fa-pepper-hot fa-lg" style="color: #2b6803;"></i>'
    },
    {
        name : 'paw',
        icon : '<i class="fa-solid fa-paw" style="color: #ac6502;"></i>'
    },
    {
        name : 'snowflake',
        icon : '<i class="fa-regular fa-snowflake fa-lg" style="color: #07f2e3;"></i>'
    },
    {
        name : 'cap',
        icon : '<i class="fa-solid fa-graduation-cap fa-lg" style="color: #650158;"></i>'
    },
    {
        name : 'clover',
        icon : '<i class="fa-solid fa-clover fa-lg" style="color: #5ad00b;"></i>'
    }
];
let cardarr = [],playcards = [];
let easy = 4,diff = 8,hard=12;
let flippedCards = [];
let matchedCount = 0;
let attempt = 0;
let count = document.getElementById('count');
let m = document.getElementById('min');
let s =document.getElementById('sec');
let time;
let sec = 0 , min = 0;
// console.log(cardarr);shuffled cards on page load
let gameboard = document.getElementById('gameboard');
let scoreboard = document.getElementById('scoreboard');
let modes = document.getElementById('modes');
let end = document.getElementById('end');

function cards(mode)
{
    if(mode === 'easy')
    {
        for(let i=0;i<easy;i++)
            playcards[i] = cardavail[i];
    }
    else if(mode === 'diff')
    {
        for(let i=0;i<diff;i++)
            playcards[i] = cardavail[i];
    }
    else if(mode === 'hard')
    {
        for(let i=0;i<hard;i++)
            playcards[i] = cardavail[i];
    }
    cardarr = [].concat(playcards,playcards);
    playcards = [];
    scoreboard.style.display = 'block';
    modes.style.display = 'none';
    shuffleCards(); 
    startGame();
    displayCards();

}

 

function shuffleCards()
{
    for(let i=cardarr.length-1 ; i>=0 ; i--)
    {
        let randindex = Math.floor(Math.random()*(i+1));
        [cardarr[i],cardarr[randindex]] = [cardarr[randindex],cardarr[i]];
    }
    console.log(cardarr);
}

function displayCards()
{
    cardarr.forEach((item,index,arr)=>{
        let card = document.createElement('div');
        card.setAttribute('id',index);
        card.classList.add('cardback');//Card back design
        card.classList.add('active');//to check its existance, remove active when it finds its match 
        gameboard.append(card);
        card.addEventListener('click',flipCard);
    })
}
function startGame()
{
    time = setInterval(timer,1000);
}
function timer()
{
    sec++;
    if(sec < 10)
        s.innerHTML = '0' + sec;
    if(sec >= 10)
        s.innerHTML = sec;
    if(sec == 60)
    {
        min++;
        if(min < 10)
            m.innerHTML = '0' + min;
        else
            m.innerHTML = min;
        sec = 0;
        s.innerHTML = '0' + sec;
    }
}
function flipCard()
{
    if(flippedCards.length<2 && this.classList.contains('active'))
    {
        if(flippedCards[0] === this)
        {
            flippedCards[0].innerHTML = '';
            flippedCards[0].classList.add('cardback');
            flippedCards = [];
        }
        
        else
        {
            console.log(this);
            let cardID = this.getAttribute('id');//Flipped card's id
            flippedCards.push(this);
            this.classList.remove('cardback');
            this.innerHTML = cardarr[cardID].icon;
            if(flippedCards.length == 2)
            {
                // checkMatch(); cant view data as it is so fast so set a time to slowdown the process
                setTimeout(checkMatch,500);
                attempt++;
                console.log(attempt);
                count.textContent = attempt;
            }
        }
    }
}

function checkMatch()
{
    let card1id = flippedCards[0].getAttribute('id');
    let card2id = flippedCards[1].getAttribute('id');
    if(cardarr[card1id].name === cardarr[card2id].name)
    {
        flippedCards[0].style.border = 'none';
        flippedCards[0].style.backgroundColor = 'cornsilk';
        flippedCards[0].innerHTML = '';
        flippedCards[0].classList.remove('active');
        flippedCards[1].style.border = 'none';
        flippedCards[1].style.backgroundColor = 'cornsilk';
        flippedCards[1].innerHTML = '';
        flippedCards[1].classList.remove('active');
        matchedCount++;
        checkGameOver();
    }
    else
    {
        flippedCards[0].innerHTML = '';
        flippedCards[0].classList.add('cardback');
        flippedCards[1].innerHTML = '';
        flippedCards[1].classList.add('cardback');
    }
    flippedCards = [];

}

function checkGameOver()
{
    if(matchedCount == cardarr.length/2)
    {
        clearInterval(time);
        while(gameboard.firstChild)   
        {
            gameboard.removeChild(gameboard.firstChild);//remove each and every div 
        }
        gameboard.classList.remove('game');
        gameboard.classList.add('won');
        gameboard.innerHTML = `<h1>You Won!!</h1> <p> No. of Attempts :`+ attempt+ `</p>
                                <p> Time Consumed :`+min+`min `+sec+'sec</p>';
       scoreboard.innerHTML = '';
       end.style.display = 'block';
    }
}


