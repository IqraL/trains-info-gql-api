module.exports = {
  parseResponse: (rawResponse) => {
    try {
      const stationBoardResult =
        rawResponse["soap:Envelope"]["soap:Body"][0][
          "GetDepBoardWithDetailsResponse"
        ][0]["GetStationBoardResult"][0];

      const depatureStation = {
        name: stationBoardResult["lt4:locationName"][0],
        crs: stationBoardResult["lt4:crs"][0],
      };

      const messages = stationBoardResult["lt4:nrccMessages"]
        ? stationBoardResult["lt4:nrccMessages"][0]["lt:message"]
        : null;

      const rawTrainServices =
        stationBoardResult["lt7:trainServices"][0]["lt7:service"] || [];

      //processedServices
      const services = [];

      for (const service of rawTrainServices) {
        try {
          let parsedservice = extracSeviceDetails(service);
          const callingPoints = extractCallingPoints(
            "lt7:subsequentCallingPoints",
            service
          );
          services.push({ ...parsedservice, callingPoints });
        } catch (e) {
          console.log(e);
        }
      }
      return { depatureStation, services, messages };
      //return rawResponse;
    } catch (e) {
      throw e;
    }
  },
};

const extracSeviceDetails = (service) => {
  try {
    //console.log(service);
    const serviceID = service["lt4:serviceID"][0]; // ID!
    const dueTime = service["lt4:std"][0]; //String!
    const etaORetd = service["lt4:etd"][0]; //String
    const noOfCarriages = service["lt4:length"]
      ? parseInt(service["lt4:length"][0])
      : null; // Int
    const platform = service["lt4:platform"]
      ? service["lt4:platform"][0]
      : null; // String
    const origin = {
      name: service["lt5:origin"][0]["lt4:location"][0]["lt4:locationName"][0],
      crs: service["lt5:origin"][0]["lt4:location"][0]["lt4:crs"][0],
    };

    const destination = {
      name:
        service["lt5:destination"][0]["lt4:location"][0]["lt4:locationName"][0],
      crs: service["lt5:destination"][0]["lt4:location"][0]["lt4:crs"][0],
    };

    const isDelayed = service["lt4:delayReason"] ? true : false;
    const delayReason = service["lt4:delayReason"]
      ? service["lt4:delayReason"][0]
      : null;
    const isCancelled = service["lt4:cancelReason"] ? true : false; // Boolean!
    const cancelReason = service["lt4:cancelReason"]
      ? service["lt4:cancelReason"][0]
      : null;

    const operator = service["lt4:operator"][0];

    return {
      serviceID,
      dueTime,
      etaORetd,
      noOfCarriages,
      platform,
      origin,
      destination,
      isDelayed,
      delayReason,
      isCancelled,
      cancelReason,
      operator,
    };
  } catch (e) {
    throw e;
  }
};
const extractCallingPoints = (type, service) => {
  try {
    const rawCallingPoints =
      service[type][0]["lt7:callingPointList"][0]["lt7:callingPoint"];
    const callingPoints = rawCallingPoints.map((cp) => {
      try {
        const trainStation = {
          name: cp["lt7:locationName"][0],
          crs: cp["lt7:crs"][0],
        };
        const duetime = cp["lt7:st"][0];
        const etORat =
          type === "lt7:subsequentCallingPoints"
            ? cp["lt7:et"][0]
            : cp["lt7:at"][0];
        const noOfCarriages = cp["lt7:length"] ? cp["lt7:length"][0] : null;
        return { trainStation, duetime, etORat, noOfCarriages };
      } catch (e) {
        console.log(e);
      }
    });
    return callingPoints;
  } catch (e) {
    console.log(e);
  }
};

/*
type trainStation {
  name: String!
  crs: String!
}
type callingPoint {
  trainStation: trainStation!
  duetime: String!
  etORat: String!
  noOfCarriages: Int
}

type service {
  serviceID: ID!
  dueTime: String!
  eta: String
  noOfCarriages: Int
  platform: String
  origin: trainStation
  destination: trainStation
  callingPoints: [callingPoint]
  isDelayed: Boolean!
  delayReason: String
  isCancelled: Boolean!
  cancelReason: String
}

type depatures {
  depatureStation: trainStation
  services: [service]
}
*/
