import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";




type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  
};

const DataTable = (props: Props) => {



  const [width, setWidth] = useState(0); // Initialize state with a default value

  const updateSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setWidth(80);
    } else {
      setWidth(100);
    }
  }

useEffect(() => {
 
  updateSize();

  // Add event listener for window resize
  window.addEventListener("resize", updateSize);

  return () => {
    window.removeEventListener("resize", updateSize);
  };
}, []);
const handleDelete = ({}) =>{

}

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: width,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
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
