let stationConnections = {};

// Load station connections from the JSON file
fetch('setsuzoku.json')
    .then(response => response.json())
    .then(data => {
        stationConnections = data;

        const dropdown = document.getElementById('dropdown');
        const stationNames = Object.keys(stationConnections);

        stationNames.forEach(station => {
            const option = document.createElement('option');
            option.value = station;
            option.textContent = station;
            dropdown.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error loading station connections:', error);
    });

// Generate a random route and display the result
function generateRandomRoute() {
    const dropdown = document.getElementById('dropdown');
    const selectedSection = dropdown.value;

    const [startStation, goalStation] = selectedSection.split(" - ");
    
    if (stationConnections[startStation] && stationConnections[goalStation]) {
        let result = [];
        do {
            result = generateRandomRoutePython(startStation, goalStation);
        } while (result.length <= 1);

        const output = document.getElementById('output');
        output.textContent = `Random Route: ${result.join(' → ')}`;
    } else {
        console.error('Selected section not found in stationConnections.');
    }
}

// Rest of the code remains unchanged

