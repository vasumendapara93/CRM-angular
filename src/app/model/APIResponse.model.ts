import { HttpStatusCode } from "@angular/common/http";

export default interface IAPIRespose{
    statusCode : HttpStatusCode
    isSuccess : boolean
    ErrorMessage : string[]
    Data : any
}