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
  ActivityQueue = "activity_queue",
  EmailQueue = "email_queue"
}

export enum ServiceUnion {
  ActivityMicroService = "ACTIVITY_MICROSERVICE",
  EmailMicroService = "EMAIL_MICROSERVICE"
}