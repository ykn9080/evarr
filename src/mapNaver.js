// import {
//   RenderAfterNavermapsLoaded,
//   NaverMap,
//   Marker,
//   Polyline,
// } from "react-naver-maps";
import React from "react";
import $ from "jquery";
import { useEffect } from "react";

const Map = () => {
  const navermaps = window.naver.maps;
  const { naver } = window; // 혹은 withNavermaps hoc을 사용
  const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
  };

  const map = new naver.maps.Map("map", mapOptions);
  //   useEffect(() => {
  //     navermaps.Event.addListener($("#poly"), "mouseup", function () {
  //       this.setOptions({
  //         strokeWeight: 6,
  //       });
  //     });

  //     navermaps.Event.addListener($("#poly"), "click", function () {
  //       alert("polyline click");
  //     });
  //   }, []);
  return (
    <div id="map" style={{ width: "100%", height: "500px" }} />
    // <RenderAfterNavermapsLoaded clientId="9o8ku8accr">
    //   <NaverMap
    //     id="map"
    //     mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
    //     defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
    //     defaultZoom={10}
    //     zoomControl={true} //줌 컨트롤의 표시 여부
    //     zoomControlOptions={{
    //       //줌 컨트롤의 옵션
    //       position: navermaps.Position.TOP_RIGHT,
    //     }}
    //   >
    //     <Marker
    //       position={new navermaps.LatLng(37.3595704, 127.105399)}
    //       //   animation={navermaps.Animation.BOUNCE}
    //       onClick={() => {
    //         alert("여기는 네이버 입니다.");
    //       }}
    //     />
    //     <Polyline
    //       id="poly"
    //       path={[
    //         new navermaps.LatLng(37.365620929135716, 127.1036195755005),
    //         new navermaps.LatLng(37.365620929135716, 127.11353302001953),
    //         new navermaps.LatLng(37.3606921307849, 127.10452079772949),
    //         new navermaps.LatLng(37.36821310838941, 127.10814714431763),
    //         new navermaps.LatLng(37.360760351656545, 127.11299657821654),
    //         new navermaps.LatLng(37.365620929135716, 127.1036195755005),
    //       ]}
    //       // clickable // 사용자 인터랙션을 받기 위해 clickable을 true로 설정합니다.
    //       strokeColor={"#5347AA"}
    //       strokeStyle={"longdash"}
    //       strokeOpacity={0.5}
    //       strokeWeight={5}
    //       clickable={true}
    //       onClick={() => {
    //         alert("여기는 네이버 입니다.");
    //       }}
    //     />
    //   </NaverMap>
    // </RenderAfterNavermapsLoaded>
  );
};

export default Map;
