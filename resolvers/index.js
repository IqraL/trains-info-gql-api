const axios = require("axios");
const xml2js = require("xml2js");
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
          console.log(res);
          const jsonRes = await parser.parseStringPromise(res.data);
          // console.log(
          //   jsonRes["soap:Envelope"]["soap:Body"][0][
          //     "GetDepBoardWithDetailsResponse"
          //   ]
          // );
          return jsonRes;
        })
        .catch((err) => {
          console.log(err);
        });

      ///return null;
    },
  },
};
