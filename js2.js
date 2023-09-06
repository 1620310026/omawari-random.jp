let stationConnections = {
    "友部": ["小山", "我孫子"],
    "我孫子": ["友部", "新松戸", "成田"],
    "小山": ["友部", "大宮", "高崎"],
    "新松戸": ["南浦和", "日暮里", "西船橋", "我孫子"],
    "成田": ["香取", "我孫子", "佐倉"],
    "大宮": ["小山", "高麗川", "倉賀野", "南浦和", "武蔵浦和"],
    "南浦和": ["新松戸", "武蔵浦和", "大宮", "赤羽"],
    "上野": ["秋葉原", "日暮里"],
    "尾久": ["日暮里", "赤羽"],
    "西船橋": ["新松戸", "千葉", "錦糸町", "南船橋", "市川塩浜"],
    "香取": ["松岸", "成田"],
    "佐倉": ["成田", "成東", "千葉"],
    "高麗川": ["大宮", "倉賀野", "拝島"],
    "倉賀野": ["大宮", "高麗川", "高崎"],
    "武蔵浦和": ["南浦和", "大宮", "赤羽", "西国分寺"],
    "赤羽": ["南浦和", "武蔵浦和", "尾久", "田端", "池袋"],
    "田端": ["池袋", "赤羽", "日暮里"],
    "秋葉原": ["上野", "御茶ノ水", "神田", "錦糸町"],
    "千葉": ["佐倉", "蘇我", "西船橋"],
    "錦糸町": ["西船橋", "秋葉原", "東京"],
    "南船橋": ["西船橋", "市川塩浜", "蘇我"],
    "市川塩浜": ["南船橋", "西船橋", "東京"],
    "松岸": ["香取", "成東"],
    "成東": ["佐倉", "松岸", "大網"],
    "拝島": ["高麗川", "立川", "八王子"],
    "西国分寺": ["新宿", "武蔵浦和", "府中本町", "立川"],
    "池袋": ["赤羽", "田端", "新宿"],
    "御茶ノ水": ["秋葉原", "神田", "代々木"],
    "神田": ["秋葉原", "御茶ノ水", "東京"],
    "蘇我": ["千葉", "大網", "南船橋", "木更津"],
    "東京": ["神田", "品川", "錦糸町", "市川塩浜"],
    "大網": ["蘇我", "成東", "安房鴨川"],
    "立川": ["八王子", "府中本町", "西国分寺", "拝島"],
    "八王子": ["立川", "拝島", "橋本"],
    "府中本町": ["立川", "西国分寺", "武蔵小杉"],
    "新宿": ["池袋", "代々木", "西国分寺"],
    "代々木": ["御茶ノ水", "新宿", "品川"],
    "安房鴨川": ["木更津", "大網"],
    "木更津": ["安房鴨川", "蘇我"],
    "橋本": ["八王子", "茅ヶ崎", "東神奈川"],
    "武蔵小杉": ["府中本町", "品川", "尻手", "鶴見"],
    "品川": ["代々木", "東京", "川崎", "武蔵小杉"],
    "茅ヶ崎": ["橋本", "大船"],
    "東神奈川": ["橋本", "横浜", "鶴見"],
    "尻手": ["武蔵小杉", "浜川崎", "川崎"],
    "鶴見": ["浜川崎", "武蔵小杉", "東神奈川", "川崎"],
    "大船": ["茅ヶ崎", "横浜", "磯子"],
    "横浜": ["東神奈川", "磯子", "大船"],
    "磯子": ["大船", "横浜"],
    "川崎": ["品川", "鶴見", "尻手"],
    "高崎": ["小山", "倉賀野"],
    "浜川崎": ["鶴見", "尻手"],
    "日暮里": ["上野", "田端", "尾久", "新松戸"]
};
let ekisuumin = 0
let ekisuumax = 100


// プルダウンメニューに駅の情報を追加
const dropdown = document.getElementById("dropdown");
for (const station in stationConnections) {
    const option = document.createElement("option");
    option.value = station;
    option.textContent = station;
    dropdown.appendChild(option);
}

function generateRandomRouteJS(selectedStation) {
    const stationList = Object.keys(stationConnections);
    const startGoal = selectedStation;
    const route = [startGoal];
    const visitedStations = new Set();
    const selectedEkisuu = document.querySelector('input[name="ekisuu"]:checked').value;
    const [ekisuumin, ekisuumax] = selectedEkisuu.split(",").map(Number);
    let keiyufuka = liststation();
    if (isInArray(keiyufuka, startGoal)) {
        const output = document.getElementById('output');
        output.textContent = "経由不可の駅を通らないルートを作成できません。";
    }else{
        try {
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
                    
                    if (nextStation === startGoal) {
                        if (new Set(route).size === 2) {
                            route.pop();
                            continue;
                        }
                        
                        if (route.length >= ekisuumin && route.length <= ekisuumax && !isInArray(keiyufuka,"ルート: " + route.join(" → "))) {
                            console.log("ルート: " + route.join(" → "));
                            const output = document.getElementById('output');
                            output.textContent = route.join(" → ");
    
                            
                            return route;
    
                        } else {
                            route.length = 1;
                            visitedStations.clear();
                            continue;
                        }
                    }
                    visitedStations.add(nextStation);
                }
            }
        } catch (error) {
            console.error("エラーが発生しました。ルートを再生成します。");
            return generateRandomRouteJS(selectedStation, ekisuumin, ekisuumax);
        }
    }
}



function generateRandomRoute(selectedValues) {
    const dropdown = document.getElementById('dropdown');
    const selectedSection = dropdown.value;
    if (isInArray(selectedValues, selectedSection)) {
        const output = document.getElementById('output');
        output.textContent = "経由不可の駅を通らないルートを作成できません。";

    } else {
        if (selectedSection.includes(" - ")) {
            const [startStation, goalStation] = selectedSection.split(" - ");
            const shouldSwap = Math.random() < 0.5;
            const selectedEkisuu = document.querySelector('input[name="ekisuu"]:checked').value;
            const [ekisuumin, ekisuumax] = selectedEkisuu.split(",").map(Number);
            const [actualStart, actualGoal] = shouldSwap ? [goalStation, startStation] : [startStation, goalStation];
    
            let result = [];
            do {
                result = generateRandomRoutePython(actualStart, actualGoal);
            }while (
                result.length <= 1 ||
                result.length > ekisuumax ||
                result.length < ekisuumin ||
                isInArray(selectedValues, `始点駅 → ${result.join(' → ')} → 終点駅`)
            );
    
    
            const output = document.getElementById('output');
            output.textContent = `始点駅 → ${result.join(' → ')} → 終点駅`;
            
        } else {
            console.error('Invalid section format.');
        }
      }      
}


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

function generateRoute() {
    const dropdown = document.getElementById("dropdown");
    const selectedSection = dropdown.value;
    let result = liststation();
    if (selectedSection.includes(" - ")) {
        generateRandomRoute(result);
    } else {
        generateRandomRouteJS(selectedSection);
    }
}

function liststation(){
    var checkboxes = document.querySelectorAll('input[name="keiyufuka"]:checked');
    var selectedValues = [];
    checkboxes.forEach(function(checkbox) {
        selectedValues.push(checkbox.value);
    });
    if (selectedValues.includes("高崎") && selectedValues.includes("友部")) {
        selectedValues.push("小山");
    } 
    if (selectedValues.includes("倉賀野") && selectedValues.includes("友部")) {
        selectedValues.push("小山");
        selectedValues.push("高崎");

    } 
    return selectedValues
}

function isInArray(array, value){
    for (let i = 0; i < array.length; i++) {
      const key = array[i];
      if (key === '') {
        continue;
      }
      if (value.includes(key)) {
        return true;
      }
    }
    return false; 
  }
