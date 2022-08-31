import axios from "axios";
import xml2js from "xml2js";

/**
 *
 * @param {*} url 공공data url
 * @param {*} serviceKey 공공data 사용키
 * @param {*} routeId 버스노선ID
 * @param {*} realRouteId  버스노선DB 실제ID
 */
const publicFetch = async (url, serviceKey, routeId, realRouteId) => {
  const xml = await axios.get(
    `${url}?serviceKey=${serviceKey}&routeId=${routeId}`
  );
  xmlParse(xml.data, "busRouteStationList", returnObj);
};

/**
 *
 * @param {*} xmldata : fetch한 xml포맷 데이터
 * @param {*} bodyComponent: 파싱할 데이터 부분
 * @param {*} returnObj: 리턴할 데이터의 파싱된 결과물
 * @param {*} next: 후속작업이 필요할 경우지정
 */
const xmlParse = (xmldata, bodyComponent, returnObj) => {
  var extractedData = "";
  var parser = new xml2js.Parser();
  parser.parseString(xmldata, function (err, result) {
    //Extract the value from the data element
    extractedData = result.response.msgBody[0][bodyComponent].map((k, i) => {
      return returnObj(k);
    });
    //if (next) next(extractedData);
  });
};

/**
 * xml문서를 파싱하여 리턴할 형태
 * @param {*} k
 * @returns
 */
const returnObj = (k) => {
  return {
    iscenter: k.centerYn[0] === "N" ? 0 : 1,
    district_cd: parseInt(k.districtCd[0]),
    mobile_no: k.mobileNo ? k.mobileNo[0] : null,
    region_name: k.regionName[0],
    station_id: parseInt(k.stationId[0]),
    station_name: k.stationName[0],
    x: parseFloat(k.x[0]),
    y: parseFloat(k.y[0]),
    station_seq: parseInt(k.stationSeq[0]),
    isturn: k.turnYn[0] === "N" ? 0 : 1,
    route_id: 1,
  };
};

export { publicFetch, returnObj, xmlParse };
