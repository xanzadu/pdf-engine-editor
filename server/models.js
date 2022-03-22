const { createPdf, getPdf } = require('./pdfTester');

const updatePdf = (req, res) => {
  const { lastName, firstName } = req.body;
  createPdf('src/output.pdf', 'src/output.pdf', lastName, firstName);
  if (error) {
    res.status(404).send(error);
  } else {
    res.status(201).send('pdf created!');
  }
};

const getPdfInfo = (req, res) => {
    const results = getPdf('src/output.pdf');
    res.status(201).send(results);
}

module.exports = {
  updatePdf,
  getPdfInfo
};