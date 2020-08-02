const xml2js = require("xml2js");
const parser = new xml2js.Parser();

module.exports = {
  xlmBuilder: (args) => {
    try {
      const {
        depatureStation,
        startTimeInterval,
        endTimeInterval,
        alldepartures,
        destinationLocation,
        numberOfResults,
      } = args;
      let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2017-10-01/ldb/">
 <soapenv:Header>
    <typ:AccessToken>
       <typ:TokenValue>${process.env.TOKEN}</typ:TokenValue>
    </typ:AccessToken>
 </soapenv:Header>
 <soapenv:Body>
    <ldb:GetDepBoardWithDetailsRequest>
       <ldb:numRows>${numberOfResults ? numberOfResults : 5}</ldb:numRows>
       <ldb:crs>${depatureStation}</ldb:crs>
       <!--Optional:-->
       ${
         !alldepartures
           ? `<ldb:filterCrs>${destinationLocation}</ldb:filterCrs>`
           : ``
       }
       <!--Optional:-->
       <ldb:filterType>to</ldb:filterType>
       <!--Optional:-->
       <ldb:timeOffset>${startTimeInterval}</ldb:timeOffset>
       <!--Optional:-->
       <ldb:timeWindow>${endTimeInterval}</ldb:timeWindow>
    </ldb:GetDepBoardWithDetailsRequest>
 </soapenv:Body>
</soapenv:Envelope>`;

      return xmls;
    } catch (e) {
      console.log(`XML builder error`);
      console.log(e);
      console.log(`XML builder error`);

      throw e;
    }
  },
};
