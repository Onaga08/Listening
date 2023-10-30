// Using the Fetch API to make a request to the Flask backend
fetch('http://localhost:8000/get_data')  // Use the full URL to the backend route
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Update the HTML content dynamically
        document.getElementById('dataFromBackend').innerText = `Data from the Backend: ${data.message}`;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
