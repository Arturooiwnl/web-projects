document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('multi-step-form');
    const steps = form.querySelectorAll('.step');
    const nextBtn = form.querySelector('.btn-next');
    const backBtn = form.querySelector('.btn-back');
    const stepNumbers = document.querySelectorAll('.step-number');
    let currentStep = 1;

    showStep(currentStep);

    const planCards = document.querySelectorAll('.plan-card');
    const billingToggle = document.getElementById('billing-toggle');
    let selectedPlan = 'arcade';
    let isYearly = false;

    const planPrices = {
        arcade: { monthly: 9, yearly: 90 },
        advanced: { monthly: 12, yearly: 120 },
        pro: { monthly: 15, yearly: 150 }
    };

    const addonPrices = {
        'online-service': { monthly: 1, yearly: 10 },
        'larger-storage': { monthly: 2, yearly: 20 },
        'custom-profile': { monthly: 2, yearly: 20 }
    };

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < steps.length) {
                currentStep++;
                showStep(currentStep);
                updateSummary();
            }
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    planCards.forEach(card => {
        card.addEventListener('click', () => {
            planCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedPlan = card.dataset.plan;
            updateSummary();
        });
    });

    billingToggle.addEventListener('change', () => {
        isYearly = billingToggle.checked;
        updatePriceDisplay();
        updateSummary();
    });

    function showStep(step) {
        steps.forEach((s, index) => {
            s.classList.toggle('active', index + 1 === step);
            stepNumbers[index].style.backgroundColor = index + 1 === step ? 'var(--light-blue)' : 'transparent';
        });

        backBtn.style.display = step === 1 ? 'none' : 'block';
        nextBtn.textContent = step === steps.length ? 'Confirmar' : 'Siguiente Paso';
    }

    function validateStep(step) {
        const errorMessage = document.getElementById("error-message");
        const errorContainer = document.querySelector(".error");
    
        if (step === 1) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
    
            if (!name || !email || !phone) {
                errorMessage.textContent = "Por favor, completa todos los campos";
                errorContainer.style.visibility  = "visible"; 
    
                setTimeout(() => {
                    errorMessage.textContent = "";
                    errorContainer.style.visibility  = "hidden";
                }, 2000);
    
                return false;
            }
    
            if (!email.includes('@')) {
                errorMessage.textContent = "Por favor, ingrese un email válido. El suyo no contiene '@'";
                errorContainer.style.visibility  = "visible"; 
    
                setTimeout(() => {
                    errorMessage.textContent = "";
                    errorContainer.style.visibility  = "hidden"; 
                }, 2000);
    
                return false;
            }
        }
        return true;
    }
    

    function updatePriceDisplay() {
        planCards.forEach(card => {
            const plan = card.dataset.plan;
            const priceElement = card.querySelector('.price');
            const yearlyPriceElement = card.querySelector('.yearly-price');
            const yearlyBonus = card.querySelector('.yearly-bonus');

            if (isYearly) {
                priceElement.classList.add('hidden');
                yearlyPriceElement.classList.remove('hidden');
                yearlyBonus.classList.remove('hidden');
            } else {
                priceElement.classList.remove('hidden');
                yearlyPriceElement.classList.add('hidden');
                yearlyBonus.classList.add('hidden');
            }
        });

        const addonPriceElements = document.querySelectorAll('.addon-price');
        addonPriceElements.forEach(element => {
            const addon = element.parentElement.querySelector('input').id;
            const price = isYearly ? addonPrices[addon].yearly : addonPrices[addon].monthly;
            element.textContent = `+$${price}/${isYearly ? 'año' : 'mes'}`;
        });
    }

    function updateSummary() {
        if (currentStep === 4) {
            const selectedPlanPrice = isYearly ? planPrices[selectedPlan].yearly : planPrices[selectedPlan].monthly;
            const planSummary = document.querySelector('.selected-plan h3');
            const planPrice = document.querySelector('.plan-price');
            
            planSummary.textContent = `${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} (${isYearly ? 'Anual' : 'Mensual'})`;
            planPrice.textContent = `$${selectedPlanPrice}/${isYearly ? 'año' : 'mes'}`;

            const addonsSummary = document.querySelector('.addons-summary');
            addonsSummary.innerHTML = '';
            let totalPrice = selectedPlanPrice;

            document.querySelectorAll('.addon-card input:checked').forEach(addon => {
                const addonName = addon.parentElement.querySelector('h3').textContent;
                const addonPrice = isYearly ? addonPrices[addon.id].yearly : addonPrices[addon.id].monthly;
                totalPrice += addonPrice;

                addonsSummary.innerHTML += `
                    <div class="addon-summary-item">
                        <span>${addonName}</span>
                        <span>+$${addonPrice}/${isYearly ? 'año' : 'mes'}</span>
                    </div>
                `;
            });

            const totalText = document.querySelector('.total-summary span:first-child');
            const totalPriceElement = document.querySelector('.total-price');
            totalText.textContent = `Total (por ${isYearly ? 'año' : 'mes'})`;
            totalPriceElement.textContent = `$${totalPrice}/${isYearly ? 'año' : 'mes'}`;
        }
    }
});

