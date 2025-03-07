import React, { useState } from "react";
import { jsPDF } from "jspdf";

const App = () => {
  // Define state for inputs
  const [offPeakUnits, setOffPeakUnits] = useState("");
  const [peakUnits, setPeakUnits] = useState("");
  const [offPeakRate, setOffPeakRate] = useState(41.68);
  const [peakRate, setPeakRate] = useState(48.0);
  // Tax percentage (default 53% expressed as 0.53)
  const [taxRate, setTaxRate] = useState(0.53);
  // Results state
  const [results, setResults] = useState(null);

  // Function to calculate costs
  const calculateBill = () => {
    const offPeakCost = parseFloat(offPeakUnits || 0) * parseFloat(offPeakRate);
    const peakCost = parseFloat(peakUnits || 0) * parseFloat(peakRate);
    const totalCost = offPeakCost + peakCost;
    const taxAmount = totalCost * parseFloat(taxRate);
    const finalCost = totalCost + taxAmount;
    
    setResults({
      offPeakCost: offPeakCost.toFixed(2),
      peakCost: peakCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      finalCost: finalCost.toFixed(2)
    });
  };

  // Function to export results and form data as PDF
  const exportPDF = () => {
      if (!results) return;
    
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Electricity Bill Details", 10, 20);
    
      // Include Form Fields Data
      doc.setFontSize(12);
      doc.text("Meter Readings:", 10, 30);
      doc.text(`Off Peak Units: ${offPeakUnits}`, 10, 40);
      doc.text(`Peak Units: ${peakUnits}`, 10, 50);
      doc.text(`Off Peak Rate (Rs.): ${offPeakRate}`, 10, 60);
      doc.text(`Peak Rate (Rs.): ${peakRate}`, 10, 70);
      doc.text(`Tax Rate: ${parseFloat(taxRate) * 100}%`, 10, 80);
    
      // Include Calculated Results
      doc.text("Bill Calculations:", 10, 100);
      doc.text(`Off Peak Cost: Rs. ${results.offPeakCost}`, 10, 110);
      doc.text(`Peak Cost: Rs. ${results.peakCost}`, 10, 120);
      doc.text(`Total Electricity Cost: Rs. ${results.totalCost}`, 10, 130);
      doc.text(`Tax Amount: Rs. ${results.taxAmount}`, 10, 140);
      doc.text(`Final Cost (inclusive of tax): Rs. ${results.finalCost}`, 10, 150);
  
      doc.save("electricity_bill.pdf");
    };
  

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Electricity Bill Calculator</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>Off Peak Units:</label>
        <input
          type="number"
          value={offPeakUnits}
          onChange={(e) => setOffPeakUnits(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Peak Units:</label>
        <input
          type="number"
          value={peakUnits}
          onChange={(e) => setPeakUnits(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Off Peak Rate (Rs.):</label>
        <input
          type="number"
          value={offPeakRate}
          onChange={(e) => setOffPeakRate(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Peak Rate (Rs.):</label>
        <input
          type="number"
          value={peakRate}
          onChange={(e) => setPeakRate(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Tax Rate (%):</label>
        <input
          type="number"
          step="0.01"
          value={parseFloat(taxRate) * 100}
          onChange={(e) => setTaxRate(e.target.value / 100)}
          style={{ marginLeft: "10px" }}
        />
      </div>
      <button onClick={calculateBill}>Calculate Bill</button>
      {results && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results</h2>
          <p>Off Peak Cost: Rs. {results.offPeakCost}</p>
          <p>Peak Cost: Rs. {results.peakCost}</p>
          <p>Total Electricity Cost: Rs. {results.totalCost}</p>
          <p>Tax Amount: Rs. {results.taxAmount}</p>
          <p>Final Cost (inclusive of tax): Rs. {results.finalCost}</p>
          <button onClick={exportPDF} style={{ marginTop: "10px" }}>
            Export to PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
