const hints = document.querySelectorAll('.hint-title');
const hintContainer = document.querySelectorAll('.hint-desc');
const hintArrow = document.querySelectorAll('.hint-title::after');

[...hints].map(hint => {
    hint.addEventListener('click', function(){
        const desc = hint.nextElementSibling;
        desc.classList.toggle('show');
        
    })
})

function populateData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    console.log(queryString);
    console.log(urlParams);
    console.log(id);
}

populateData();
