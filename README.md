# hackday2022-tenchijin
指定した経度、緯度の1時間後の天気が雨かどうかを返すAPI。

## API End Point
`https://script.google.com/macros/s/AKfycbzLhA3kUuTGYZK2nvo9UyR83XHDRtZePOvKp3-WKFVoJDpap2Oi5TQzP35N3BoPs9Hd/exec`

## How to Get Reqest
### パラメータ
| パラメータ名 | データ型 | 概要 |
| ---- | ---- | ---- |
| lat | float | 緯度 |
| lng | float | 経度 |

## Sample Request
```
https://script.google.com/macros/s/AKfycbzLhA3kUuTGYZK2nvo9UyR83XHDRtZePOvKp3-WKFVoJDpap2Oi5TQzP35N3BoPs9Hd/exec?lat=31.563466&lng=130.554605
```

## Sample Response
### 雨の日
```
{
  "weather": "rainy"
}
```

### 雨以外の日
```
{
  "weather": "sunny"
}
```