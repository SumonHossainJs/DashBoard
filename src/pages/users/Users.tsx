import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
    renderCell: (params) => (
      <div className="customClassName">{params.value}</div>
    )
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 100,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [filteredColumns, setFilteredColumns] = useState<GridColDef[]>(columns);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = window.innerWidth;
      
      if (screenWidth < 480) {
        const filter = columns.filter(col => col.field === "id" || col.field === "firstName")
        const addwidth = filter.map(col => {
          if (col.field === "firstName") {
            return { ...col, width: 110 };
          } else if (col.field === "id") {
            return { ...col, width: 55 }; 
          }
          return col;
        })
        setFilteredColumns(addwidth);
      } else if (screenWidth < 768) {
        setFilteredColumns(columns.filter(col => col.field === "id" || col.field === "firstName" || col.field === "lastName"));
      } else if (screenWidth < 1024) {
        setFilteredColumns(columns.filter(col => col.field === "id" || col.field === "firstName" || col.field === "lastName"));
      } else if (screenWidth < 1400) {
        setFilteredColumns(columns);
      }
    };

    // Initial column setup
    updateColumns();

    // Add event listener for window resize
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={filteredColumns} rows={userRows}/>
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
