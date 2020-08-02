const axios = require("axios");
const {
  xlmBuilder: depBoardWithDetailsReq,
} = require("../requests/GetDepBoardWithDetails.js");
module.exports = {
  Query: {
    getDepartureBoard: async (obj, args) => {
      const xmls = depBoardWithDetailsReq(args);
      console.log(xmls);
      await axios
        .post(process.env.WSDL_URL, xmls, {
          headers: { "Content-Type": "text/xml" },
        })
        .then((res) => {
          console.log(args);
          //console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      return null;
    },
  },
};
