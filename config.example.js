// 將此檔案複製為 config.js，並填入你的 Mapbox 與資料來源設定。
// config.js 已被 .gitignore 排除，不會被提交到版本控制。

// Mapbox Access Token（預設放入提供的示範 Token，可自行替換）
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoiam9obmNoZW4yMDI0IiwiYSI6ImNtZXdhZ3ZyMzBsemMya3F4Y2NwMHN3ZmwifQ.nawrXjd_rNZXL7xVFIMZ-g";
// Mapbox Access Token
const MAPBOX_TOKEN = "your_mapbox_access_token";

// Mapbox 樣式，可用 mapbox 官方樣式或自訂樣式
const MAPBOX_STYLE_URL = "mapbox://styles/mapbox/streets-v11";

// 若想使用內政部地圖服務中心 (NLSC) 的 WMS 底圖，可設定 WMS 瓦片 URL。
// 預設使用 LANDSECT 圖層，若要停用可留空。
const WMS_TILE_URL =
  // 參數含 crs=EPSG:4326 與 bbox={bbox-epsg-4326}，便於直接疊在 Mapbox 上。
  "https://wms.nlsc.gov.tw/wms?service=WMS&request=GetMap&version=1.3.0&layers=LANDSECT&styles=default&format=image/png&transparent=true&crs=EPSG:4326&bbox={bbox-epsg-4326}&width=256&height=256&dpiMode=7&tilePixelRatio=0&featureCount=10&contextualWMSLegend=0";
  "https://wms.nlsc.gov.tw/wms?service=WMS&request=GetMap&version=1.3.0&layers=LANDSECT&styles=default&format=image/png&transparent=true&crs=EPSG:4326&bbox={bbox-epsg-4326}&width=256&height=256";

// 來自政府資料開放平台的 GeoJSON API 連結。
// 範例（請替換為實際網址）：
// https://data.gov.tw/api/v1/rest/datastore/<dataset-id>?format=geojson
const LAND_API_URL = "https://example.com/path/to/land-parcels.geojson";

// GeoJSON 內地段號、地段名對應的屬性名稱
const LAND_NUMBER_PROPERTY = "land_number"; // 地段號（地號）欄位
const LAND_NAME_PROPERTY = "land_name"; // 地段名欄位
