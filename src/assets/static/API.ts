export class API {
    static ORIGIN: string = "https://r1dq4k84-7246.inc1.devtunnels.ms"
    static LOGIN: string = this.ORIGIN + '/api/user/login'
    static SEND_OTP: string = this.ORIGIN + '/api/otp/send'
    static VERIFY_OTP: string = this.ORIGIN + '/api/otp/verify'
    static CHANGE_PASSWORD: string = this.ORIGIN + '/api/user/password/change'
    static REFRESH_TOKEN: string = this.ORIGIN + '/api/token/refresh'
    static GET_USER: string = this.ORIGIN + '/api/user'
    static GET_ORGANIZATIONS : string = this.ORIGIN + '/api/user/organization'
    static GET_EMPLOYEES : string = this.ORIGIN + '/api/user/employee'
    static GET_BRANCHES : string = this.ORIGIN + '/api/branch'
    static UPDATE_BRANCHE : string = this.ORIGIN + '/api/branch'
    static CREATE_BRANCHE : string = this.ORIGIN + '/api/branch'
    static CREATE_BRANCHE_RANGE : string = this.ORIGIN + '/api/branch/range'
    static REMOVE_BRANCHE_RANGE : string = this.ORIGIN + '/api/branch/range'
    static REMOVE_BRANCHE : string = this.ORIGIN + '/api/branch'
}