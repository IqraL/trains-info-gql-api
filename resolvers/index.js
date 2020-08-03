const axios = require("axios");
const xml2js = require("xml2js");
const {
  parseResponse: depBoardWithDetailsResParse,
} = require("../responses/GetDepBoardWithDetails");

const parser = new xml2js.Parser();
const {
  xlmBuilder: depBoardWithDetailsReq,
} = require("../requests/GetDepBoardWithDetails.js");
module.exports = {
  Query: {
    getDepartureBoard: async (obj, args) => {
      const xmls = depBoardWithDetailsReq(args);
      //console.log(xmls);
      return await axios
        .post(process.env.WSDL_URL, xmls, {
          headers: { "Content-Type": "text/xml" },
        })
        .then(async (res) => {
          //console.log(args);
          //console.log(res);
          const jsonRes = await parser.parseStringPromise(res.data);
          //depBoardWithDetailsResParse(jsonRes);
          // console.log(
          //   jsonRes["soap:Envelope"]["soap:Body"][0][
          //     "GetDepBoardWithDetailsResponse"
          //   ]
          // );
          return jsonRes;
        })
        .catch((err) => {
          console.log("**********************");
          //console.log(err.config);
          console.log(err.response.data);
          console.log("**********************");
        });

      ///return null;
    },
  },
};
