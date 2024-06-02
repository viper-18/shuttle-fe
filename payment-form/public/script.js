document.getElementById('paymentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, amount })
        });

        const result = await response.json();
        displayResponse(result, true);
    } catch (error) {
        displayResponse({ error: 'An error occurred. Please try again.' }, false);
    }
});

function displayResponse(data, isSuccess) {
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '';

    if (isSuccess) {
        const balance = document.createElement('div');
        balance.classList.add('response-success');
        balance.textContent = `Balance: ${data.balance}`;

        const message = document.createElement('div');
        message.classList.add('response-success');
        message.textContent = `Message: ${data.message}`;

        responseDiv.appendChild(balance);
        responseDiv.appendChild(message);
    } else {
        const error = document.createElement('div');
        error.classList.add('response-error');
        error.textContent = data.error;

        responseDiv.appendChild(error);
    }
}
