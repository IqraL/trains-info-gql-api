const axios = require("axios");
module.exports = {
  Query: {
    getDepartureBoard: async () => {
      let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2017-10-01/ldb/">
   <soapenv:Header>
      <typ:AccessToken>
         <typ:TokenValue>7e8e81a0-405a-4235-ad83-e96ce3a78eee</typ:TokenValue>
      </typ:AccessToken>
   </soapenv:Header>
   <soapenv:Body>
      <ldb:GetDepBoardWithDetailsRequest>
         <ldb:numRows>5</ldb:numRows>
         <ldb:crs>RCD</ldb:crs>
         <!--Optional:-->
         <ldb:filterCrs>MSO</ldb:filterCrs>
         <!--Optional:-->
         <ldb:filterType>to</ldb:filterType>
         <!--Optional:-->
         <ldb:timeOffset>0</ldb:timeOffset>
         <!--Optional:-->
         <ldb:timeWindow>120</ldb:timeWindow>
      </ldb:GetDepBoardWithDetailsRequest>
   </soapenv:Body>
</soapenv:Envelope>`;

      await axios
        .post(
          "https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb11.asmx",
          xmls,
          {
            headers: { "Content-Type": "text/xml" },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      return null;
    },
  },
};
