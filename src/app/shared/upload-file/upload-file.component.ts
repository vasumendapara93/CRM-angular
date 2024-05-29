import { Component, EventEmitter, Input, Output } from '@angular/core';
import FieldInDb from 'src/app/model/FieldInDB.model';
import MappedField from 'src/app/model/MappedField.model';
import { FloatingDropdownService } from 'src/app/services/floating-dropdown.service';
import { MsgService } from 'src/app/services/msg.service';
import { Color } from 'src/assets/static/Color';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  @Input() mappingFieldsInput: FieldInDb[] = []
  @Output() onFinalListGenerated = new EventEmitter<{}[]>();

  msgBoxId = 'uploadFileMsgBoxID'
  isDragover: boolean = false
  allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv','application/vnd.ms-excel']
  file: File | null = null
  sheetNames: string[] = []
  isFileAccepted = false
  isReadingFile = false
  showFileTypeError = false
  isExtracting = false
  jsonExcelData: any
  selectedSheet: string = ''
  fieldsInFile: string[] = []
  mappingFields: { fieldInDb: FieldInDb, isMapped: boolean }[] = []
  isGeneratingFinalList = false

  mappedFields: MappedField[] = []
  defaultSelectedField = {
    displayName: '-- Select Field --',
    fieldName: '',
    isRequired: false
  }

  finalEntryList: {}[] = []


  constructor(
    private floatingDropdown: FloatingDropdownService,
    private msgService: MsgService
  ) { }

  getFile(event: Event) {
    this.isDragover = false
    this.isReadingFile = true

    this.file = (event as DragEvent).dataTransfer ?
      (event as DragEvent).dataTransfer?.files.item(0) ?? null :
      (event.target as HTMLInputElement).files?.item(0) ?? null

    console.log(this.file!.type)
    if (!this.file || !this.allowedFileTypes.includes(this.file.type)) {
      this.isReadingFile = false
      this.showFileTypeError = true
      return
    }
    this.isFileAccepted = true
    this.isReadingFile = false
    this.showFileTypeError = false
  }

  getJsonFromExel() {
    var fileReader = new FileReader()
    fileReader.readAsArrayBuffer(this.file!)

    fileReader.onload = () => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      this.sheetNames = workBook.SheetNames
      console.log(this.sheetNames)
      this.selectedSheet = this.sheetNames[0]
      this.jsonExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[this.selectedSheet])
      console.log(typeof this.jsonExcelData)
      console.log(this.jsonExcelData)
      this.getFields()

    }
  }

  getFields() {
    this.fieldsInFile = []
    this.mappedFields = []
    for (let key in this.jsonExcelData[0]) {
      this.fieldsInFile.push(key)
      this.mappedFields.push({
        FieldInFile: key,
        FieldInDb: this.defaultSelectedField,
        valueForEmpty: null
      })
    }

    this.mappingFields = []
    this.mappingFieldsInput.forEach(mappingField => {
      this.mappingFields.push({
        fieldInDb: mappingField,
        isMapped: false
      })
    });
  }


  resetMapping(event: Event) {
    event.preventDefault()
    this.mappedFields = []
    for (let key in this.jsonExcelData[0]) {
      this.mappedFields.push({
        FieldInFile: key,
        FieldInDb: this.defaultSelectedField,
        valueForEmpty: null
      })
    }
  }

  openFileInput(event: Event) {
    event.preventDefault()
    var fileInput = document.getElementById('fileInput')
    fileInput?.click()
  }

  cancelFile() {
    this.file = null
    this.isFileAccepted = false
    this.fieldsInFile = []
  }
  openFloatingDropdown(event: Event, id: string) {
    event.preventDefault();
    this.floatingDropdown.toggeleFloatingDropdown(id)
  }

  extractDataFromExcel(event: Event) {
    event.preventDefault()
    this.isExtracting = true
    this.getJsonFromExel()
  }

  selectSheet(event: Event, sheetName: string) {
    event.preventDefault()
    this.selectedSheet = sheetName
    this.getJsonFromExel()
  }

  mapField(index: number, mapfield: { fieldInDb: FieldInDb, isMapped: boolean }, alreadyMappedField: MappedField) {
    if(mapfield.fieldInDb.fieldName == alreadyMappedField.FieldInDb?.fieldName){
      return
    }
    var mappingField = this.mappingFields.find(element => element.fieldInDb.fieldName == alreadyMappedField.FieldInDb?.fieldName)
    if (mappingField) {
      mappingField!.isMapped = false
    }

    if (mapfield.isMapped) {
      var mappedField = this.mappedFields.find(element => element.FieldInDb!.fieldName == mapfield.fieldInDb.fieldName)
      if (mappedField) {
        mappedField!.FieldInDb = this.defaultSelectedField
        mappedField!.valueForEmpty = null
      }
    }
    this.mappedFields[index].FieldInDb = mapfield.fieldInDb
    this.mappedFields[index].valueForEmpty = null
    var i = this.mappingFields.findIndex(element => element == mapfield)
    this.mappingFields[i].isMapped = true
  }

  addDefaultValue(event: Event, mappedField: MappedField) {
    event.preventDefault()
    var inputField = event.target as HTMLInputElement
    var mf = this.mappedFields.find(element => element == mappedField)
    mf!.valueForEmpty = inputField.value != '' ? inputField.value : null
  }

  generateFinalList(event: Event) {
    event.preventDefault()
    this.isGeneratingFinalList = true
    this.finalEntryList = []
    var requiredFields = this.mappingFields.filter(e => e.fieldInDb.isRequired)
    var stop = false
    requiredFields.forEach(field => {
      if (!field.isMapped) {
        this.msgService.setColor(this.msgBoxId, Color.danger)
        this.msgService.setMsg(this.msgBoxId, `${field.fieldInDb.displayName} is required, It is not mapped to any field`)
        this.msgService.openMsgBox(this.msgBoxId)
        stop = true
        this.isGeneratingFinalList = false
        return
      }
    });
    if (stop) {
      this.isGeneratingFinalList = false
      return
    }

    var mappedFieldsLocal: { [key: string]: any } = {}
    this.mappedFields.forEach(mappedField => {
      if (mappedField.FieldInDb?.fieldName && mappedField.FieldInDb?.fieldName != '') {
        var key = mappedField.FieldInFile
        mappedFieldsLocal[key] = mappedField.FieldInDb?.fieldName
      }
    })

    console.log(this.mappedFields)

    this.jsonExcelData.forEach((dataRow: any) => {
      var objToPush: { [key: string]: any } = {}
      for (const key in mappedFieldsLocal) {
        var mappedField = this.mappedFields.find(mf => mf.FieldInFile == key)
        var objToPushKey = mappedField!.FieldInDb!.fieldName
        if (dataRow[key] == null || dataRow[key] == '' && mappedField?.valueForEmpty) {
          objToPush[objToPushKey] = mappedField?.valueForEmpty
          continue
        }
        objToPush[objToPushKey] = dataRow[key].toString()
      }
      this.finalEntryList.push(objToPush)
    })

    this.onFinalListGenerated.emit(this.finalEntryList)
    this.isGeneratingFinalList = false
  }

}
