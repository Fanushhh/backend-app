const forgotPasswordFormContainer = document.querySelector('form');
const forgotPasswordInput = forgotPasswordFormContainer.querySelector('input');


forgotPasswordInput.addEventListener('focus', function(){
    forgotPasswordFormContainer.classList.add('focused');
});
forgotPasswordInput.addEventListener('blur', function(){
    forgotPasswordFormContainer.classList.add('focused');
});
