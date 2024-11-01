"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@vscode/webview-ui-toolkit/react");
function App() {
    const rowData = [
        {
            cell1: "Cell Data",
            cell2: "Cell Data",
            cell3: "Cell Data",
            cell4: "Cell Data",
        },
        {
            cell1: "Cell Data",
            cell2: "Cell Data",
            cell3: "Cell Data",
            cell4: "Cell Data",
        },
        {
            cell1: "Cell Data",
            cell2: "Cell Data",
            cell3: "Cell Data",
            cell4: "Cell Data",
        },
    ];
    return (<div className="grid gap-3 p-2 place-items-start">
      <react_1.VSCodeDataGrid>
        <react_1.VSCodeDataGridRow row-type="header">
          <react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="1">
            A Custom Header Title
          </react_1.VSCodeDataGridCell>
          <react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="2">
            Another Custom Title
          </react_1.VSCodeDataGridCell>
          <react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="3">
            Title Is Custom
          </react_1.VSCodeDataGridCell>
          <react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="4">
            Custom Title
          </react_1.VSCodeDataGridCell>
        </react_1.VSCodeDataGridRow>
        {rowData.map((row) => (<react_1.VSCodeDataGridRow>
            <react_1.VSCodeDataGridCell grid-column="1">{row.cell1}</react_1.VSCodeDataGridCell>
            <react_1.VSCodeDataGridCell grid-column="2">{row.cell2}</react_1.VSCodeDataGridCell>
            <react_1.VSCodeDataGridCell grid-column="3">{row.cell3}</react_1.VSCodeDataGridCell>
            <react_1.VSCodeDataGridCell grid-column="4">{row.cell4}</react_1.VSCodeDataGridCell>
          </react_1.VSCodeDataGridRow>))}
      </react_1.VSCodeDataGrid>

      <span className="flex gap-3">
        <react_1.VSCodeProgressRing />
        <react_1.VSCodeTextField />
        <react_1.VSCodeButton>Add</react_1.VSCodeButton>
        <react_1.VSCodeButton appearance="secondary">Remove</react_1.VSCodeButton>
      </span>
    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map