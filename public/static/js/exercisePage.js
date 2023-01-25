const hints = document.querySelectorAll('.hint-title');
const hintContainer = document.querySelectorAll('.hint-desc');
const hintArrow = document.querySelectorAll('.hint-title::after');


[...hints].map(hint => {
    hint.addEventListener('click', function(){
        const desc = hint.nextElementSibling;
        desc.classList.toggle('show');
        
    })
})



