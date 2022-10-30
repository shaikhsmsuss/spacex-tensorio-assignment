import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Loader from "./Loader";

function TableGrid({ rows, columns, onRowClick, getRowId, isLoading }) {
  function CustomUnsortedIcon() {
    return null;
  }

  return (
    <Box className="table-grid">
      {isLoading ? (
        <DataGrid
          headerHeight={60}
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "break-spaces",
              lineHeight: 1,
            },
          }}
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnMenu
          components={{
            ColumnUnsortedIcon: CustomUnsortedIcon,
            LoadingOverlay: Loader,
          }}
          loading
          onRowClick={(params, event) => onRowClick(params, event)}
          getRowId={getRowId}
        />
      ) : (
        <DataGrid
          headerHeight={60}
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "break-spaces",
              lineHeight: 1,
            },
          }}
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnMenu
          components={{
            ColumnUnsortedIcon: CustomUnsortedIcon,
          }}
          onRowClick={(params, event) => onRowClick(params, event)}
          getRowId={getRowId}
        />
      )}
    </Box>
  );
}

export default TableGrid;
