import { BtnText } from "src/assets/static/BtnText"
import { Color } from "src/assets/static/Color"

export default interface Alert {
    title: string
    okBtnText: BtnText,
    cancelBtnText: BtnText,
    okBtnColor: Color
    msg: string
}