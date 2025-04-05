document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('card-form');
    const inputs = {
        name: document.getElementById('name'),
        number: document.getElementById('number'),
        month: document.getElementById('month'),
        year: document.getElementById('year'),
        cvv: document.getElementById('cvv')
    };

    const displays = {
        name: document.querySelector('.card-name'),
        number: document.querySelector('.card-number'),
        expiration: document.querySelector('.card-expiration'),
        cvv: document.querySelector('.cvv')
    };

    inputs.number.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        e.target.value = formattedValue;
        displays.number.textContent = formattedValue || '0000 0000 0000 0000';
    });

    [inputs.month, inputs.year, inputs.cvv].forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    });

    inputs.name.addEventListener('input', (e) => {
        displays.name.textContent = e.target.value || 'john doe';
    });

    const updateExpiration = () => {
        const month = inputs.month.value.padStart(2, '0');
        const year = inputs.year.value.padStart(2, '0');
        displays.expiration.textContent = `${month}/${year}`;
    };

    inputs.month.addEventListener('input', updateExpiration);
    inputs.year.addEventListener('input', updateExpiration);

    inputs.cvv.addEventListener('input', (e) => {
        displays.cvv.textContent = e.target.value || '000';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        Object.values(inputs).forEach(input => {
            if (!input.value) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        if (isValid) {
            const button = form.querySelector('button');
            button.textContent = '¡Tarjeta Agregada!';
            button.style.background = '#4BB543';
            
            setTimeout(() => {
                form.reset();
                button.textContent = 'Confirmar';
                button.style.background = '#21092f';
                displays.name.textContent = 'john doe';
                displays.number.textContent = '0000 0000 0000 0000';
                displays.expiration.textContent = '00/00';
                displays.cvv.textContent = '000';
            }, 2000);
        }
    });
});

