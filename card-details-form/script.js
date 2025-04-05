document.addEventListener('DOMContentLoaded', () => {
    const cardNumber = document.querySelector('.card-number');
    const cardHolder = document.querySelector('.card-holder');
    const cardExpiry = document.querySelector('.expiry');
    const cardCvc = document.querySelector('.card-cvc');
    
    const form = document.getElementById('cardForm');
    const inputs = {
        number: document.getElementById('cardNumber'),
        holder: document.getElementById('cardHolder'),
        month: document.getElementById('month'),
        year: document.getElementById('year'),
        cvc: document.getElementById('cvc')
    };

    function formatCardNumber(value) {
        const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
        const onlyNumbers = value.replace(/[^\d]/g, '');
        
        return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
            [$1, $2, $3, $4].filter(group => !!group).join(' ')
        );
    }

    inputs.number.addEventListener('input', (e) => {
        let value = e.target.value;
        value = formatCardNumber(value);
        e.target.value = value;
        cardNumber.textContent = value || '0000 0000 0000 0000';
    });

    inputs.holder.addEventListener('input', (e) => {
        cardHolder.textContent = e.target.value.toUpperCase() || 'JANE APPLESEED';
    });

    inputs.month.addEventListener('input', (e) => {
        if (e.target.value > 12) e.target.value = 12;
        updateExpiry();
    });

    inputs.year.addEventListener('input', (e) => {
        updateExpiry();
    });

    inputs.cvc.addEventListener('input', (e) => {
        cardCvc.textContent = e.target.value || '000';
    });

    function updateExpiry() {
        const month = inputs.month.value.padStart(2, '0');
        const year = inputs.year.value.padStart(2, '0');
        cardExpiry.textContent = `${month}/${year}`;
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        input.classList.add('error');
        errorElement.style.display = 'block';
        errorElement.textContent = message;
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        input.classList.remove('error');
        errorElement.style.display = 'none';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (!/^\d{16}$/.test(inputs.number.value.replace(/\s/g, ''))) {
            showError(inputs.number, 'Please enter a valid 16-digit card number');
            isValid = false;
        } else {
            clearError(inputs.number);
        }

        if (!inputs.holder.value.trim()) {
            showError(inputs.holder, 'Cardholder name is required');
            isValid = false;
        } else {
            clearError(inputs.holder);
        }

        const expiryGroup = document.querySelector('.expiry-group');
        const expiryError = expiryGroup.querySelector('.error-message');

        if (!/^\d{1,2}$/.test(inputs.month.value) || inputs.month.value > 12 || inputs.month.value < 1) {
            inputs.month.classList.add('error');
            inputs.year.classList.add('error');
            expiryError.style.display = 'block';
            expiryError.textContent = 'Invalid month';
            isValid = false;
        } else if (!/^\d{2}$/.test(inputs.year.value)) {
            inputs.month.classList.add('error');
            inputs.year.classList.add('error');
            expiryError.style.display = 'block';
            expiryError.textContent = 'Invalid year';
            isValid = false;
        } else {
            inputs.month.classList.remove('error');
            inputs.year.classList.remove('error');
            expiryError.style.display = 'none';
        }

        if (!/^\d{3}$/.test(inputs.cvc.value)) {
            showError(inputs.cvc, 'Invalid CVC');
            isValid = false;
        } else {
            clearError(inputs.cvc);
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            cardNumber.textContent = '0000 0000 0000 0000';
            cardHolder.textContent = 'JHON DOE';
            cardExpiry.textContent = '00/00';
            cardCvc.textContent = '000';
        }
    });

    inputs.cvc.addEventListener('focus', () => {
        document.querySelector('.card.front').style.transform = 'rotateY(180deg)';
        document.querySelector('.card.back').style.transform = 'translateY(60px) rotateY(0deg)';
    });

    inputs.cvc.addEventListener('blur', () => {
        document.querySelector('.card.front').style.transform = 'rotateY(0deg)';
        document.querySelector('.card.back').style.transform = 'translateY(60px) rotateY(180deg)';
    });

    const numericInputs = [inputs.number, inputs.month, inputs.year, inputs.cvc];
    numericInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
    });
});