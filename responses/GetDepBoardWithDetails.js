module.exports = {
  parseResponse: (rawResponse) => {
    try {
      return rawResponse["soap:Envelope"]["soap:Body"];
    } catch (e) {}
  },
};

/*
type trainStation {
  name: String!
  crs: String!
}
type callingPoint {
  trainStation: trainStation!
  duetime: String!
  eta: String!
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
