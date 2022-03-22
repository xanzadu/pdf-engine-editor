const { PDFDocument, rgb, degrees, ubuntuFont, colorToComponents } = require('pdf-lib');
const { readFile, writeFile } = require('mz/fs');

async function createPdf(input, output, familyName = 'Smith', givenName = 'John') {
    try {
      const pdfDoc = await PDFDocument.load(await readFile(input), { ignoreEncryption: true });
  
      // Modify doc, fill out the form...
      // const fieldNames = pdfDoc
      //   .getForm()
      //   .getFields()
      //   .map((f) => f.getName());
      // console.log({ fieldNames });
  
      const form = pdfDoc.getForm();
      // const pages = pdfDoc.getPages();
  
    //   const possibleFields = Array.from({ length: 111 }, (_, i) => i);
    //   possibleFields.forEach((possibleField) => {
    //     try {
    //       form
    //         .getTextField(`Text${possibleField}`)
    //         .setText(possibleField.toString());
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   });
  
      form.getTextField('form1[0].#subform[0].Pt2Line4a_FamilyName[0]').setText(familyName);
      form.getTextField('form1[0].#subform[0].Pt2Line4b_GivenName[0]').setText(givenName);
      const widget = form.getTextField('form1[0].#subform[0].Pt2Line4b_GivenName[0]').acroField.getWidgets()[0];
      const ac = widget.getAppearanceCharacteristics();
      ac.setBackgroundColor(colorToComponents(rgb(1,0,0)));
      form.getCheckBox('form1[0].#subform[0].CheckBox1[0]').check();
      // const linkButton = form.createButton('buttonlink');
      // linkButton.addToPage('Do Stuff', pages[0], {
      //   x: 50,
      //   y: 75,
      //   width: 200,
      //   height: 100,
      //   textColor: rgb(1, 0, 0),
      //   backgroundColor: rgb(0, 1, 0),
      //   borderColor: rgb(0, 0, 1),
      //   borderWidth: 2,
      //   rotate: degrees(90),
      //   font: ubuntuFont,
      // });
  
      const pdfBytes = await pdfDoc.save();
  
      await writeFile(output, pdfBytes);
      console.log('PDF created!');
    } catch (err) {
      console.log(err);
    }
  }

  async function getPdf(input) {
      const pdfDoc = await PDFDocument.load(await readFile(input), { ignoreEncryption: true });
  
      const form = pdfDoc.getForm();
      const results = {};
  
      results.lastName = form.getTextField('form1[0].#subform[0].Pt2Line4a_FamilyName[0]').getText();
      results.firstName = form.getTextField('form1[0].#subform[0].Pt2Line4b_GivenName[0]').getText();


      return results;
  }

  module.exports = {
    createPdf,
    getPdf
  };