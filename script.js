const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;


//save selcted movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selcetedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//Update total and count
const updateSelectedCount = () =>{
    const selectedSeats = document.querySelectorAll('.row .seat .selected');

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get Data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }
    
    const selcetedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selcetedMovieIndex !== null){
        movieSelect.selectedIndex = selcetedMovieIndex;
    }
}

//Movie select event
movieSelect.addEventListener('change', e =>{
    ticketPrice = +e.target.value;
    updateSelectedCount();
})

//Seat click event
container.addEventListener('click', e => {
    if(
        e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupid')
        ){
        e.target.classList.toggle('selected');

            setMovieData(e.target.selectedIndex, e.target.value);
        
        updateSelectedCount();
    }
})

//Initial count and total
updateSelectedCount();