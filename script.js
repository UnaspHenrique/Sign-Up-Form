const init = () => {

    const inputName = document.getElementById('inputName')
    const inputEmail = document.getElementById('inputEmail')
    const inputPassword = document.getElementById('inputPassword')
    const submitButton = document.querySelector('button.submit')

    const validadeName = (event) => {
        const input = event.currentTarget;
        const regex = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/;
        const nameTest = regex.test(input.value);

        if(!nameTest) {
            submitButton.setAttribute('disabled', 'disabled');
            inputName.nextElementSibling.classList.add('error');
        }
        else {
            submitButton.removeAttribute('disabled', 'disabled');
            inputName.nextElementSibling.classList.remove('error');
        }
    }

    const validadeEmail = (event) => {
        const input = event.currentTarget;
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailTest = regex.test(input.value);

        if(!emailTest) {
            submitButton.setAttribute('disabled', 'disabled');
            inputEmail.nextElementSibling.classList.add('error');
        }
        else {
            submitButton.removeAttribute('disabled', 'disabled');
            inputEmail.nextElementSibling.classList.remove('error');
        }
    }

    const validadePassword = (event) => {
        const input = event.currentTarget;

        if(input.value.length < 4) {
            submitButton.setAttribute('disabled', 'disabled');
            inputPassword.nextElementSibling.classList.add('error');
        }
        else {
            submitButton.removeAttribute('disabled', 'disabled');
            inputPassword.nextElementSibling.classList.remove('error');
        }
    }

    inputName.addEventListener('input', validadeName);
    inputEmail.addEventListener('input', validadeEmail);
    inputPassword.addEventListener('input', validadePassword);

    const errorHandler = () => {
        submitButton.classList.remove('success');
        submitButton.classList.add('error');
        submitButton.textContent = 'Error :(';
    }

    const succesHandler = () => {
        submitButton.classList.remove('error');
        submitButton.classList.add('success');
        submitButton.textContent = 'Success :)'
    }

    if(submitButton) {
        submitButton.addEventListener('click', (event) =>{
            event.preventDefault();

            submitButton.textContent = "...Loading";

            fetch('https://reqres.in/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,  
                })
            }).then((response) =>{
                if(response.status !== 200) {
                    return errorHandler();
                }
                succesHandler();
            }).catch(()=> {
                errorHandler();
            })
        })
    }
}

window.onload = init;