const API_KEY = '0a424652be80d8340d176592369e8274';
const API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather/';
const ICON_URL = 'https://openweathermap.org/img/w/';

// ウィンドウロードの処理がないと最初に何も表示されません
$(window).on('load', function () {
  $('#btn-search').click();
  console.log($('img'));
})

$('#btn-search').click(function (event) {
  event.preventDefault();
  let zipcode = $('#zipcode').val();

  getCurrentWeather(zipcode);
});

function getCurrentWeather(zipcode) {
  // 郵便番号に '-'が含まれてない場合は付与します。 例: 8700001 -> 870-0001
  if (zipcode.indexOf('-') == -1) {
    zipcode = zipcode.slice(0, 3) + '-' + zipcode.slice(3)
  }

  let zip = zipcode + ',' + 'jp'

  $.ajax({
    url: API_ENDPOINT,
    type: 'GET',
    data: { zip: zip, units: 'metric', appid: API_KEY },
    cache: false,
  })
  .done((data) => {
    if (data["cod"] == "200") {
      showResult(data);
    }
  })
  .fail((data) => {
    showError(data);
  })
  .always((data) => {
    //  debug
    console.log(data);
  });
}

function showResult(data) {
  // let icon = ICON_URL + data['weather'][0]['icon'] + ".png" // 例: https://openweathermap.org/img/w/10d.png

  $('#icon').attr("src", icon); // アイコン
  $('#temp').text(data['main']['temp']); // 現在の気温
  $('#temp-max').text(data['main']['temp_max']); // 最高気温
  $('#temp-min').text(data['main']['temp_min']); // 最低気温

  // 結果を表示
  $('#result').removeClass('hidden');
  $('#error').addClass('hidden');
}

function showError(data) {
  $('#error-message').text(data['responseJSON']['message']);

  // エラーを表示
  $('#result').addClass('hidden');
  $('#error').removeClass('hidden');
}
