import React from "react";

const invoiceStyles: React.CSSProperties = {
  width: "600px",
  margin: "20px auto",
  padding: "20px",
  border: "1px solid #ccc",
};

const headerStyles: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
};

const tableStyles: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const rowStyles: React.CSSProperties = {
  borderBottom: "1px solid #ddd",
};

const lastRowStyles: React.CSSProperties = {
  ...rowStyles,
  borderBottom: "none",
};

const Bill: React.FC = () => {
  return (
    <div style={invoiceStyles}>
      <div style={headerStyles}>
        <h2>Hóa đơn</h2>
      </div>
      <table style={tableStyles}>
        <thead>
          <tr style={rowStyles}>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr style={rowStyles}>
            <td>1</td>
            <td>Product A</td>
            <td>2</td>
            <td>$10.00</td>
            <td>$20.00</td>
          </tr>
          {/* Add more rows as needed */}
          <tr style={lastRowStyles}>
            <td colSpan={4} style={{ textAlign: "right" }}>
              <strong>Total:</strong>
            </td>
            <td>$20.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Bill;
