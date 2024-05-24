import FieldInDb from "./FieldInDB.model"

export default interface MappedField {
    FieldInFile :string
    FieldInDb? : FieldInDb ,
    valueForEmpty? : string | null
}