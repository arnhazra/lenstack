export enum EventsUnion {
  SetToken = "setToken",
  GetToken = "getToken",
  DeleteToken = "deleteToken",
  SendEmail = "sendEmail",
  CreateActivity = "createActivity",
  GetUserDetails = "getUserDetails",
  GetOrgDetails = "getOrgDetails",
  CreateOrg = "createOrg",
}

export enum QueueUnion {
  EmailQueue = "email_queue",
}

export enum ServiceUnion {
  EmailMicroService = "EMAIL_MICROSERVICE",
}