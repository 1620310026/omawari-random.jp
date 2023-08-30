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

// Rest of the code remains unchanged// Call the Python equivalent to generate a random route
function generateRandomRoutePython(startStation, goalStation) {
    const stationList = Object.keys(stationConnections);

    const route = [startStation];
    const visitedStations = new Set();
    visitedStations.add(startStation);

    while (true) {
        const currentStation = route[route.length - 1];
        const availableStations = stationConnections[currentStation].filter(station => !route.slice(1).includes(station));

        const unvisitedStations = availableStations.filter(station => !visitedStations.has(station));

        if (unvisitedStations.length === 0) {
            if (route.length === 1) {
                break;
            }
            route.pop();
            continue;
        } else {
            const nextStation = unvisitedStations[Math.floor(Math.random() * unvisitedStations.length)];
            route.push(nextStation);

            if (nextStation === goalStation) {
                if (new Set(route).size === 2) {
                    route.pop();
                    continue;
                }

                return route;
            }

            visitedStations.add(nextStation);
        }
    }

    return route;
}


