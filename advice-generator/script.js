// --------------------------------------------------------------------
// Función para obtener los consejos (data/advices.json) y mostrarlos.
// --------------------------------------------------------------------

async function fetchAndDisplayAdvice() {
    try {
        const response = await fetch('data/advices.json');
        const advices = await response.json();

        const randomAdvice = advices[Math.floor(Math.random() * advices.length)];

        const adviceTextElement = document.getElementById('advice-text');
        adviceTextElement.textContent = randomAdvice.advice;
        const adviceIdElement = document.getElementById('advice-id');
        adviceIdElement.textContent = randomAdvice.id
    } catch (error) {
        console.error('Error fetching advice:', error);
    }
}

document.getElementById('generate-button').addEventListener('click', fetchAndDisplayAdvice);

fetchAndDisplayAdvice();


// 
// css, html, js vanilla :)
// 
// by https://dev.arturoiwnl.pro/
// 