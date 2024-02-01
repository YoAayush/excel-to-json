import React, { useState } from 'react';  // Import React and useEffect
import * as XLSX from 'xlsx';  // Import the XLSX library
import './App.css';

export default function App() {

  const [jsonData, setJsonData] = useState(null);

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
        const resultData = [];
        console.log(sheetName);
        for (let i = 0; i < sheetName.length; i = i + 1) {
          let sheet = workbook.SheetNames[i];
          let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          resultData.push({ sheetName: sheet, data: jsonData });
          console.log(jsonData);
        }
        setJsonData(resultData);
      };
      reader.readAsBinaryString(file);
    }
  }

  function downloadJson() {
    if (jsonData) {
      const jsonDataString = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonDataString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted_data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  return (
    <>
      <div>
        <input type="file" id="fileInput" accept=".xlsx, .xls" onChange={() => { handleFile() }} />
      </div>
      <div>
        {jsonData && (
          <button onClick={() => downloadJson()}>Download JSON</button>
        )}
      </div>
    </>
  );
}
