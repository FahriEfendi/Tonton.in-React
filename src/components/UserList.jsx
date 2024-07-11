import React, { useState, useEffect } from "react";
import axios from "axios";
import { ColorModeContext, useMode } from "../theme";
import { MyProSidebarProvider } from "../pages/global/sidebar/sidebarContext";
import Topbar from "../pages/global/Topbar";
import { Helmet } from 'react-helmet-async';
import { CssBaseline, ThemeProvider, IconButton, Button,Box } from "@mui/material";
import { tokens } from "../theme";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };


  const navigateToEditPage = (uuid) => {
    // Gantilah '/borrowlist/edit/' sesuai dengan path yang sesuai untuk halaman edit Anda
    navigate(`/users/edit/${uuid}`);
  };

  // Define a function to map numeric roles to their corresponding labels
  const mapRoleToLabel = (role) => {
    switch (role) {
      case 1:
        return 'Admin';
      case 2:
        return 'Users';
      default:
        return 'Unknown';
    }
  };

  const renderActions = (params) => (
    <div>

      <IconButton onClick={() => navigateToEditPage(params.row.uuid)}>
        <EditIcon />
      </IconButton>


      <IconButton onClick={() => deleteUser(params.row.uuid)}>
        <DeleteIcon />
      </IconButton>

    </div>
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <Helmet>
              <title>Shifty | DaftarPengguna</title>
            </Helmet>
            <main>
              <Topbar />
              <Box m="20px">
                <div>
                  <h1 className="title">Daftar Pengguna</h1>
                  <h2 className="subtitle">List of Users</h2>
                  <Button href="/users/addusers" variant="contained" color="success">
                    New
                  </Button>
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={users}
                      columns={[
                        { field: 'id', headerName: 'No', width: 100 },
                        { field: 'nama', headerName: 'Name', width: 200 },
                        { field: 'uuid', headerName: 'UUID', width: 200 },
                        {
                          field: 'role',
                          headerName: 'Role',
                          width: 150,
                          valueGetter: (params) => mapRoleToLabel(params.row.role),
                        },
                        {
                          field: "action",
                          headerName: "Action",
                          width: 120,
                          renderCell: renderActions,

                        },
                      ]}
                      getRowId={(row) => row.uuid || row.id} // Use uuid or id as the row id
                    />
                  </div>
                </div>
                </Box>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Userlist;