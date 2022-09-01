/*global kakao*/

import React, { useEffect, useState } from "react";
import bus from "./images/bus.svg";
import station from "./images/station2.png";
import axios from "axios";
import _ from "lodash";
import { xmlParse } from "./utils/publicApi";
import { getLatLngCenter } from "./utils/gps";
import { Spin } from "antd";

const Location = () => {
  var markers = [];
  const key = process.env.REACT_APP_BUS_LOCATION_KEY;
  const baseurl = process.env.REACT_APP_SERVER;
  const [loading, setLoading] = useState(false);
  //"jmMJDKdbuZ8hYoXuyXlCKHYlNp02SQOlUaXXtTfryLsNQmC8HjxAnAe1NFofJ91BANDONhet17UQuHzY3DHJcw%3D%3D"; //
  const busPos = (map, data) => {
    var positions = [];
    data.data.object.map((k, i) => {
      if (k.busArrival)
        positions.push({
          title: k.busNumber,
          latlng: new kakao.maps.LatLng(k.y, k.x),
        });
    });
    // 마커 이미지의 이미지 주소입니다
    var imageSrc = bus;

    for (var i = 0; i < positions.length; i++) {
      var imageSize = new kakao.maps.Size(35, 20);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage,
        zIndex: 3, // 마커 이미지
      });
      var content =
        '<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>';
      var customOverlay = new kakao.maps.CustomOverlay({
        position: positions[i].latlng,
        content: content,
      });
      customOverlay.setMap(map);
    }
    return marker;
  };

  const stationPos = (map, data) => {
    var positions = [];
    data.data.object.map((k, i) => {
      positions.push({
        title: k.busNumber,
        latlng: new kakao.maps.LatLng(k.y, k.x),
      });
    });
    // 마커 이미지의 이미지 주소입니다
    var imageSrc = station;

    for (var i = 0; i < positions.length; i++) {
      var imageSize = new kakao.maps.Size(10, 10);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
        zIndex: 2,
      });
    }
    return marker;
  };
  const makePolyLine = (map, data) => {
    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다

    var redPath = [],
      bluePath = [];

    const indx = _.findIndex(data.data.object, "isturn");
    console.log(indx);
    data.data.object.map((k, i) => {
      if (i <= indx) redPath.push(new kakao.maps.LatLng(k.y, k.x));
    });
    data.data.object.map((k, i) => {
      if (i >= indx) bluePath.push(new kakao.maps.LatLng(k.y, k.x));
    });
    var opt = {
      path: redPath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 3, // 선의 두께 입니다
      strokeColor: "red", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    };
    // 지도에 표시할 선을 생성합니다
    var redLine = new kakao.maps.Polyline(opt);
    // 지도에 선을 표시합니다
    redLine.setMap(map);

    opt.path = bluePath;
    opt.strokeColor = "blue";
    var blueLine = new kakao.maps.Polyline(opt);

    blueLine.setMap(map);
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
  const getBusLocation = async (routeId, map) => {
    const url = `${baseurl}/api/buslocation/${routeId}`;
    const data = await axios.get(url);
    console.log(data);
    busPos(map, data).setMap(map);
    return getCenterPoint(data);
  };
  const getCenterPoint = (data) => {
    var positions = [];
    data.data.object.map((k, i) => {
      positions.push([k.y, k.x]);
    });
    return getLatLngCenter(positions);
  };
  useEffect(() => {
    const url = `${baseurl}/api/buslocation/${19}`;
    axios
      .get(url)
      .then((data) => {
        const centerpoint = getCenterPoint(data);
        console.log(centerpoint);
        var container = document.getElementById("map");
        var options = {
          center: new kakao.maps.LatLng(centerpoint[0], centerpoint[1]),
          level: 7,
        };

        var map = new kakao.maps.Map(container, options);
        // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          // 클릭한 위치에 마커를 표시합니다
          addMarker(map, mouseEvent.latLng);
        });
        busPos(map, data).setMap(map);
        stationPos(map, data).setMap(map);
        makePolyLine(map, data);
      })
      .catch((e) => console.log(e));
    // getBusLocation(19, map);
  }, []);

  return (
    <div id="map">
      {loading && (
        <div className="spin_center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default Location;
