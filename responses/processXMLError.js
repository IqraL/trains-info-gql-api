module.exports = {
  processError: (err) => {
    try {
      const fault = err["soap:Envelope"]["soap:Body"][0]["soap:Fault"][0];
      const faultCode = fault["faultcode"][0];
      const faultString = fault["faultstring"][0];

      throw new Error(`${faultCode} , ${faultString}`);
    } catch (e) {
      throw e;
    }
  },
};
