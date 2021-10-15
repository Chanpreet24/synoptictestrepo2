
var accordian = document.getElementsByClassName('contentBox');

document.querySelector('#back-button').addEventListener('click', () => {
    window.location.href = './administratorGame.html';
});


for (i = 0; i < accordian.length; i++){
    accordian[i].addEventListener('click', function(){this.classList.toggle('active')})
}
