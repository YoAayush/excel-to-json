import React from 'react';  // Import React and useEffect
import * as XLSX from 'xlsx';  // Import the XLSX library
import './App.css';

export default function App() {

  function handleFile() {
    const fileInput = document.getElementById('fileInput');
    console.log(fileInput.files);
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        console.log(e)
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames;
        console.log(sheetName);
        for (let i = 0; i < sheetName.length; i = i + 1) {
          let sheet = workbook.SheetNames[i];
          let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          console.log(jsonData);
        }
      };
      reader.readAsBinaryString(file);
    }
  }

  return (
    <>
      <div>
        <input type="file" id="fileInput" accept=".xlsx, .xls" onChange={() => { handleFile() }} />
      </div>
    </>
  );
}
