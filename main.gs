let tenchijinUserName = PropertiesService.getScriptProperties().getProperty("TENCHIJIN_USER_NAME");
let tenchijinPassword = PropertiesService.getScriptProperties().getProperty("TENCHIJIN_PASSWORD");

function doGet(e) {
  var lat = e.parameter.lat;
  var lng = e.parameter.lng;
  var weather = getWeather(lat, lng);
  const json = JSON.stringify({"weather": weather}, null, 2);
  const type = ContentService.MimeType.JSON;
  return ContentService.createTextOutput(json).setMimeType(type);
}

function getAcessToken() {

  //HTTP POSTのAPI通信(リクルートのA3RTのAPI)
  let apiURLToken = "https://hackathon-api.compass.tenchijin.co.jp/v1/access-token";
  //APIのリクエストでPOSTデータするパラメーターを設定する
  let payload = {
    'username': tenchijinUserName,
    'password': tenchijinPassword,
  };
  //HTTP POSTで前述で設定したパラメーターをオプションで設定する。
  let options = {
    'method': 'post',
    'payload': payload
  };
  //APIにリクエストし、結果をログ出力する
  let responseDataPOST = UrlFetchApp.fetch(apiURLToken, options).getContentText();
  console.log(responseDataPOST);
  let responseDataJson = JSON.parse(responseDataPOST);
  return responseDataJson;
}

function getRainfall(lat,lng) {
  let accessToken = getAcessToken()['token'];
  console.log(accessToken);
  let apiURLRainfall = 'https://hackathon-api.compass.tenchijin.co.jp/v1/forecast/precipitation/latest';
  var headers = {
    'Authorization': "Bearer " + accessToken
  };
  let payload = {
    'lat': lat,
    'lng': lng,
  };
  //HTTP POSTで前述で設定したパラメーターをオプションで設定する。
  let options = {
    'headers': headers,
    'method': 'post',
    'payload': payload
  };
  //APIにリクエストし、結果をログ出力する
  let responseWeather = UrlFetchApp.fetch(apiURLRainfall, options).getContentText();
  console.log(responseWeather);
  var rainfallJson = JSON.parse(responseWeather);
  
  console.log(rainfallJson["data"]);
  console.log(rainfallJson["data"][0]);
  console.log(rainfallJson["data"][0]["precipition"]);
  var rainfall = rainfallJson["data"][0]["precipition"]
  return rainfall;
}

function testGetRainFall(){
  var rainFall = getRainfall(31.563466,130.554605);
}

function getWeather(lat, lng) {
  var rainfall = getRainfall(lat,lng);
  var weather;
  if (rainfall != 0) {
    weather = "rainy";
  } else {
    weather = "sunny";
  }
  return weather;
}

function testGetWeather() {
  var weather = getWeather(31.563466,130.554605);
}
