/*global kakao*/

import React, { useEffect } from "react";
import bus from "./images/bus.png";
import axios from "axios";
import { xmlParse } from "./utils/publicApi";

const Location = () => {
  var markers = [];
  const key = process.env.REACT_APP_BUS_LOCATION_KEY;
  const baseurl = process.env.REACT_APP_SERVER;

  //"jmMJDKdbuZ8hYoXuyXlCKHYlNp02SQOlUaXXtTfryLsNQmC8HjxAnAe1NFofJ91BANDONhet17UQuHzY3DHJcw%3D%3D"; //
  const truckset = (map) => {
    // var positions = [
    //   {
    //     title: "start",
    //     latlng: new kakao.maps.LatLng(37.40974, 126.89414),
    //   },

    //   {
    //     title: "end",
    //     latlng: new kakao.maps.LatLng(37.4083717, 126.89305),
    //   },
    //   {
    //     title: "카카오",
    //     latlng: new kakao.maps.LatLng(37.4227867,126.9895283),
    //   },
    // ];

    var positions = [
      {
        title: "카카오",
        latlng: new kakao.maps.LatLng(37.483683333, 126.925328333),
      },
      // {
      //   title: "생태연못",
      //   latlng: new kakao.maps.LatLng(37.409655, 126.893705),
      // },
      // {
      //   title: "텃밭",
      //   latlng: new kakao.maps.LatLng(37.4012733, 126.9483883),
      // },
      // {
      //   title: "근린공원",
      //   latlng: new kakao.maps.LatLng(37.40513, 126.9714233),
      // },
      // {
      //   title: "카카오",
      //   latlng: new kakao.maps.LatLng(37.4227867, 126.9895283),
      // },
    ];

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = bus;
    //"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

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
  const getBusLocation = async (routeId) => {
    const url = `${baseurl}/api/buslocation/${routeId}`;
    const data = await axios.get(url);

    return data;
  };

  useEffect(() => {
    const data = getBusLocation(19);
    console.log(data);
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(37.483683333, 126.925328333),
      //center: new kakao.maps.LatLng(37.40737, 126.8973083),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);
    // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위치에 마커를 표시합니다
      addMarker(map, mouseEvent.latLng);
    });

    // const interval = setInterval(() => {
    //   console.log("This will run every 10 second!");
    //   getBusLocation("208000001");
    // }, 10000);
    // return () => clearInterval(interval);

    // var markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
    // var marker = new kakao.maps.Marker({
    //   position: markerPosition
    // 마커를 표시할 위치와 title 객체 배열입니다
    truckset(map).setMap(map);

    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다

    var linePath = [
      new kakao.maps.LatLng(37.33225, 126.9261167),
      new kakao.maps.LatLng(37.3329833, 126.9282167),
      new kakao.maps.LatLng(37.3352833, 126.93435),
      new kakao.maps.LatLng(37.3398333, 126.9377667),
      new kakao.maps.LatLng(37.34245, 126.9388833),
      new kakao.maps.LatLng(37.34245, 126.9406167),
      new kakao.maps.LatLng(37.3437333, 126.9429833),
      new kakao.maps.LatLng(37.3467167, 126.9434667),
    ];

    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "red", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(map);
  }, []);

  return <div id="map"></div>;
};

export default Location;
