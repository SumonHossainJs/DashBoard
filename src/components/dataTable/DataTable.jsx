import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./dataTable.scss";
import Swal from "sweetalert2";

const DataTable = (props) => {
  const [width, setWidth] = useState(0);

  const updateSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setWidth(99);
    } else {
      setWidth(100);
    }
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const handleDelete = (params) => {
    console.log(params.row);
    Swal.fire({
      title: `User: ${params.row.firstName} ${params.row.lastName}`,
      text: "The User has been deleted",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: "100",
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="View" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params)}>
            <img src="/delete.svg" alt="Delete" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
