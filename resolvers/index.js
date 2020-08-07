const axios = require("axios");
const xml2js = require("xml2js");
const {
  parseResponse: depBoardWithDetailsResParse,
} = require("../responses/GetDepBoardWithDetails");

const {
  xlmBuilder: depBoardWithDetailsReq,
} = require("../requests/GetDepBoardWithDetails.js");

const xmlErrorProcess = require("../responses/processXMLError");

const parser = new xml2js.Parser();

module.exports = {
  Query: {
    getCallingPoint: async () => {
      return { trainStation: { name: "name", crs: "crs" } };
    },
    getDepartureBoard: async (obj, args) => {
      try {
        const xmls = depBoardWithDetailsReq(args);
        return await axios
          .post(process.env.WSDL_URL, xmls, {
            headers: { "Content-Type": "text/xml" },
          })
          .then(async (res) => {
            const jsonRes = await parser.parseStringPromise(res.data);
            return depBoardWithDetailsResParse(jsonRes);
          })
          .catch(async (err) => {
            try {
              if (err.response && err.response.data) {
                const jsonRes = await parser.parseStringPromise(
                  err.response.data
                );
                xmlErrorProcess.processError(jsonRes);

                return jsonRes;
              } else {
                throw err;
              }
            } catch (e) {
              throw e;
            }
          });
      } catch (e) {
        throw e;
      }
    },
  },
};
