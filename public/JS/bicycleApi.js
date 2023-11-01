const API_KEY= 'xVUaC9zwhd32aSIqjwN1WkJdvpC0qRFSSBGQ8weeuNVvvchGFAZM6C2z6x6u47zALTloPcxi3NzITaL7ouBQjw%3D%3D'
async function getData(){
    const url = `http://apis.data.go.kr/B552061/frequentzoneFreezing/getRestFrequentzoneFreezing?ServiceKey=${API_KEY}&searchYearCd=2021&siDo=&guGun=&type=json&numOfRows=100&pageNo=1`
    const response = await fetch(url)
    const data = await response.json()
    console.log("data",data)
    const locations = data.items.item.map((spot)=> [
        spot.spot_nm,
        spot.la_crd,
        spot.lo_crd,
        spot.occrrnc_cnt,
        spot.caslt_cnt
    ]);

    console.log("locations",locations)

    drawMap(locations)
}

function drawMap(locations){
    const map = new google.maps.Map(document.getElementById("map"),{
        zoom: 13,
        center: new google.maps.LatLng(locations[0][1],locations[0][2]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    const infowindow = new google.maps.InfoWindow();

    let marker, i;


    for(i = 0; i< locations.length; i++){
        marker = new google.maps.Marker ({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        });

        google.maps.event.addListener(
            marker,
            "click",
            (function (marker, i) {
                    return function () {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map,marker);
                    }
                })(marker, i)
        );
    }
}



getData();