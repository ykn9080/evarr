/*global kakao*/

import React, { useEffect } from "react";

const Location = () => {
  var markers = [];
  const truckset = (map) => {
    var positions = [
      {
        title: "카카오",
        latlng: new kakao.maps.LatLng(33.450705, 126.570677),
      },
      {
        title: "생태연못",
        latlng: new kakao.maps.LatLng(33.450936, 126.569477),
      },
      {
        title: "텃밭",
        latlng: new kakao.maps.LatLng(33.450879, 126.56994),
      },
      {
        title: "근린공원",
        latlng: new kakao.maps.LatLng(33.451393, 126.570738),
      },
    ];

    // 마커 이미지의 이미지 주소입니다
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
    return marker;
  };
  function addMarker(map, position) {
    markers = [];
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: position,
    });
    // // 마커에 click 이벤트를 등록합니다
    // kakao.maps.event.addListener(marker, 'click', function() {

    //     // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
    //     // 마커의 이미지를 클릭 이미지로 변경합니다
    //     if (!selectedMarker || selectedMarker !== marker) {

    //         // 클릭된 마커 객체가 null이 아니면
    //         // 클릭된 마커의 이미지를 기본 이미지로 변경하고
    //         !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

    //         // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
    //         marker.setImage(clickImage);
    //     }

    //     // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
    //     selectedMarker = marker;
    // });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 생성된 마커를 배열에 추가합니다
    //markers.push(marker);
  }

  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);
    // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function(mouseEvent) {
      // 클릭한 위치에 마커를 표시합니다
      addMarker(map, mouseEvent.latLng);
    });

    // var markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
    // var marker = new kakao.maps.Marker({
    //   position: markerPosition
    // 마커를 표시할 위치와 title 객체 배열입니다
    truckset(map).setMap(map);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Location;
