
const searchDiv = document.querySelector('.searchDiv');
const searchCityDiv = document.querySelector('.searchCity');
const inputbox = document.querySelector('.inputbox');
const searchbtn = document.querySelector('.searchbtn');
const time = document.querySelector('.time');

searchDiv.addEventListener('click', () => {
    searchDiv.classList.add('searchActive');
    searchCityDiv.style.display = "none"
    inputbox.style.display = "unset";
    searchbtn.style.display = "unset";
})

let hours = new Date().getHours();
let minute = new Date().getMinutes();
let second = new Date().getSeconds();

setInterval(() => {
    if (second > 59) {
        minute++;
        if (minute > 59) {
            hours++
            if (hours > 23) {
                hours = 0;
            }
            minute = 0;
        }
        second = 0;
    }
    time.innerHTML = `${hours > 9 ? hours : "0" + hours}:${minute > 9 ? minute : "0" + minute}:${second > 9 ? second : "0" + second}`;
    second++;
}, 1000)