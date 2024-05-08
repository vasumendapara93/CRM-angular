import { Component } from '@angular/core';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  isDragover: boolean = false
  allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'csv']
  file: File | null = null
  sheetNames : string[] = []
  isFileAccepted = false
  isReadingFile = false
  showFileTypeError = false
  jsonExcelData : any

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
    console.log(this.file)
    this.getJsonFromExel()
  }

  getJsonFromExel() {
    var fileReader = new FileReader()
    fileReader.readAsArrayBuffer(this.file!)

    fileReader.onload = ()=>{
      var workBook = XLSX.read(fileReader.result, {type:'binary'});
      this.sheetNames = workBook.SheetNames
      this.jsonExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[this.sheetNames[0]])
      console.log(typeof this.jsonExcelData)
      console.log(this.jsonExcelData)
    }
  }

  openFileInput(event: Event) {
    event.preventDefault()
    var fileInput = document.getElementById('fileInput')
    fileInput?.click()
  }
  
  cancelFile(){
    this.file = null
    this.isFileAccepted = false
  }
}
