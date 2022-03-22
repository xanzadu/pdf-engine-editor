import React, {useEffect} from 'react';
import { PDFObject } from 'react-pdfobject';
import output from './output.pdf';
import FormEditor from './FormEditor';
import axios from 'axios';

export default function App() {
  //useEffect(axios.get())
  return (
    <>
      <FormEditor output = {output}/>
      <div style={{ color: 'blue', lineHeight : 10, padding: 20, border: "blue", float: 'right', height: '80vh', width: '50vw'}}>
        <PDFObject url = {output} height='100vh' width='50vw'/>
      </div>
    </>
  );
}
