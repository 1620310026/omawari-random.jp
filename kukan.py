import json

# JSONファイルからデータを読み込む
with open('setsuzoku.json', 'r', encoding='utf-8') as f:
    station_connections = json.load(f)

# すべての区間を出力するプログラム
print("All Sections:")
printed_sections = set()  # 既に出力した区間を記録するセット

for start_station, destinations in station_connections.items():
    for end_station in destinations:
        # 始点と終点が同じでなく、まだ出力されていない場合のみ出力
        if start_station != end_station and (start_station, end_station) not in printed_sections:
            print('<option value="'f'{start_station} - {end_station}''">'f'{start_station} - {end_station}''</option>')
            printed_sections.add((start_station, end_station))
            printed_sections.add((end_station, start_station))  # 入れ替えた方向も記録

