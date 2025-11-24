# 地段號對照地段名示範地圖

這個專案示範如何在 Mapbox GL JS 上疊加台灣政府資料開放平台提供的地段 GeoJSON 底圖，並透過地段號（地號）快速查詢對應的地段名。

## 快速開始

1. 複製設定檔：
   ```bash
   cp config.example.js config.js
   ```
2. 編輯 `config.js`：
   - `MAPBOX_TOKEN`：Mapbox Access Token。範例已內建一組提供的 Token，可直接測試，建議自行替換。
   - `MAPBOX_STYLE_URL`：使用的 Mapbox 樣式（可用預設 `mapbox://styles/mapbox/streets-v11`）。
   - `WMS_TILE_URL`：可選，用於載入內政部地圖服務中心 WMS (LANDSECT) 底圖；若不想使用可留空。
     預設已填入官方 LANDSECT 瓦片 URL：`https://wms.nlsc.gov.tw/wms?service=WMS&request=GetMap&version=1.3.0&layers=LANDSECT&styles=default&format=image/png&transparent=true&crs=EPSG:4326&bbox={bbox-epsg-4326}&width=256&height=256&dpiMode=7&tilePixelRatio=0&featureCount=10&contextualWMSLegend=0`
   - `LAND_API_URL`：政府資料開放平台地段 GeoJSON API 連結（範例：`https://data.gov.tw/api/v1/rest/datastore/<dataset-id>?format=geojson`）。
   - `LAND_NUMBER_PROPERTY` 與 `LAND_NAME_PROPERTY`：GeoJSON 屬性中代表地段號、地段名的欄位名稱。
3. 啟動靜態伺服器（例如使用 Python）：
   ```bash
   python -m http.server 8000
   ```
4. 在瀏覽器開啟 `http://localhost:8000`，輸入地段號或點擊地塊即可看到地段名。

## 功能

- Mapbox 底圖與政府資料開放平台 GeoJSON 疊加。
- 點擊地塊顯示彈出資訊（地段號、地段名）。
- 透過地段號搜尋並自動定位至該地塊。
- 支援自訂 GeoJSON 屬性名稱與 Mapbox 樣式。

## 資料來源提示

- 政府資料開放平台（data.gov.tw）許多地籍相關資料均可輸出為 GeoJSON，請確認 dataset API URL 支援 `format=geojson`。
- 若資料為其他格式（如 WMS/WMTS 或向量磚），可使用對應的 Mapbox Source 類型 (`raster`, `vector`) 替換 `app.js` 內的 GeoJSON source。

## 開發備忘

- `config.js` 已被 `.gitignore` 排除，避免洩漏 Mapbox Token。
- 若需調整樣式或互動行為，可直接修改 `styles.css` 與 `app.js`。
