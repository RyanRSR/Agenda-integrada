let days = document.querySelector(".days");
let monthLabel = document.getElementById("month");
let prevM = document.querySelector(".material-symbols-outlined:first-child");
let nextM = document.querySelector(".material-symbols-outlined:last-child");

function rendeCalendar(date){
    let year = date.getFullYear();
    let month = date.getMonth();

    
}

const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
]

monthLabel.textContent = `${monthNames[month]}${year}`;
 
