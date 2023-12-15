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
    let search = document.getElementById("search").value.toLowerCase();

    drawMap(locations, search)
}

function drawMap(locations, search){

    const map = new google.maps.Map(document.getElementById("map"),{
        zoom: 13,
        center: new google.maps.LatLng(locations[0][1],locations[0][2]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    console.log(search)
    const infowindow = new google.maps.InfoWindow();

    let marker, i;


    for(i = 0; i< locations.length; i++){

        let locationsname= locations[i][0].toLowerCase();

        if(locationsname.includes(search)) {

            marker = new google.maps.Marker ({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
            });
            google.maps.event.addListener(
                marker,
                "click",
                (function (marker, i) {
                    return function () {

                        var totalAccidents = locations[i][3] + locations[i][4];
                        var warningCount = Math.floor(totalAccidents / 3); // Calculate the number of warning images


                        infowindow.setContent(
                            `<h6><b>${locations[i][0]}</b></h6>
                        위험도 : 
                        <script type="application/javascript">
                            var warningCount = ${warningCount};
                        </script>
                        ${'<img src=\'../img/warning.png\' width=\'20px\' height=\'20px\'>'.repeat(warningCount)}
                        <br>
                        발생건수: ${locations[i][3]}
                        <br>
                        사상자수: ${locations[i][4]}`);
                        infowindow.open(map, marker);
                    }
                })(marker, i)
            );
        }





    }
}



getData();