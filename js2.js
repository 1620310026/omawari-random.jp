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

// Generate a random goal station
function generateRandomGoal(availableStations) {
    if (availableStations) {
        return availableStations[Math.floor(Math.random() * availableStations.length)];
    } else {
        console.error('No available stations provided.');
        return '';
    }
}

// Generate a random route and display the result
function generateRandomRoute() {
    const dropdown = document.getElementById('dropdown');
    const selectedStation = dropdown.value;

    if (stationConnections[selectedStation]) {
        const goalStation = generateRandomGoal(stationConnections[selectedStation]);
        const result = generateRandomRoutePython(selectedStation, goalStation);

        const output = document.getElementById('output');
        output.textContent = `Random Route: ${result.join(' → ')}`;
    } else {
        console.error('Selected station not found in stationConnections.');
    }
}



// Call the Python equivalent to generate a random route
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
