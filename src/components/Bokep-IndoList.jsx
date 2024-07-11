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

const Characterlist = () => {
  const [character, setCharacter] = useState([]);
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  useEffect(() => {
    getBokepindo();
  }, []);

  const getBokepindo = async () => {
    const response = await axios.get("http://localhost:8080/getallvideos");
    setCharacter(response.data.data);
  };

  const deleteUser = async (Id) => {
    await axios.delete(`http://localhost:8080/videos/${Id}`);
    getBokepindo();
  };


  const navigateToEditPage = (id) => {
    navigate(`/character/edit/${id}`);
  };

  const Class = (kelas) => {
    switch (kelas) {
      case 1:
        return 'Attacker';
      case 2:
        return 'Defender';
        case 3:
        return 'Supporter';
      default:
        return 'Unknown';
    }
  };

  const Code = (code) => {
    switch (code) {
      case 1:
        return 'Fire';
      case 2:
        return 'Water';
      case 3:
        return 'Wind';
      case 4:
        return 'Electric';
      case 5:
        return 'Iron';
      default:
        return 'Unknown';
    }
  };

  const Weapon = (weapon) => {
    switch (weapon) {
      case 1:
        return 'AR';
      case 2:
        return 'SMG';
      case 3:
        return 'SG';
      case 4:
        return 'SR';
      case 5:
        return 'RL';
      case 6:
        return 'MG';
      default:
        return 'Unknown';
    }
  };

  const Company = (company) => {
    switch (company) {
      case 1:
        return 'Elysion';
      case 2:
        return 'Missilis';
      case 3:
        return 'Tetra';
      case 4:
        return 'Pilgrim';
      case 5:
        return 'Abnormal';
      default:
        return 'Unknown';
    }
  };

  const Squad = (squad) => {
    switch (squad) {
      case 1:
        return 'Pioneer';
      case 2:
        return '777';
      case 3:
        return 'Mighty Tools';
      case 4:
        return 'YoRHa';
      case 5:
        return 'Maid For You';
      case 6:
        return 'Counters';
      case 7:
        return 'A.C.P.U';
      case 8:
        return 'Unlimited';
      case 9:
        return 'Heretic';
       default:
        return 'Unknown';
    }
  };

  const Burst = (burst) => {
    switch (burst) {
      case 1:
        return '1';
      case 2:
        return '2';
        case 3:
        return '3';
      default:
        return 'Unknown';
    }
  };

  const Cube = (cube) => {
    switch (cube) {
      case 1:
        return 'Adjutant Cube';
      case 2:
        return 'Assault Cube';
      case 3:
        return 'Bastion Cube';
      case 4:
        return 'Onslaught Cube';
      case 5:
        return 'Quantum Cube';
      case 6:
        return 'Resilience Cube';
      case 7:
        return 'Vigor Cube';
      case 8:
        return 'Wingman Cube';
      default:
        return 'Unknown';
    }
  };

  const Tag = (id_tag) => {
    switch (id_tag) {
      case "1":
        return 'Bocil';
      case "2":
        return 'SSR';
      default:
        return 'asda';
    }
  };
  const Rarity = (ara) => {
    switch (ara) {
      case 1:
        return 'Bocil';
      case 2:
        return 'SSR';
      default:
        return 'Unknown';
    }
  };

  const renderActions = (params) => (
    <div>

      <IconButton onClick={() => navigateToEditPage(params.row.id)}>
        <EditIcon />
      </IconButton>


      <IconButton onClick={() => deleteUser(params.row.Uuid)}>
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
              <title>Shifty | Karakter</title>
            </Helmet>
            <main>
              <Topbar />
              <Box m="20px">
                <div>
                  <h1 className="title">Daftar Karakter</h1>
                  <h2 className="subtitle">List of Character</h2>
                  <Button href="/admin/addbokepindo" variant="contained" color="success">
                    Add New
                  </Button>
                  <div style={{ height: 800, width: '100%' }}>
                    <DataGrid
                      rows={character}
                      columns={[
                        { field: 'Id', headerName: 'Id', width: 100 },
                        { field: 'title', headerName: 'Title', width: 150 },
                        { field: 'slug', headerName: 'Slug', width: 150 },
                        { field: 'description', headerName: 'Description', width: 550 },
                        { field: 'views', headerName: 'views', width: 150 },
                        { field: 'vid_like', headerName: 'vid_like', width: 150 },
                        { field: 'dislike', headerName: 'dislike', width: 150 },
                        {
                            field: 'id_tag',
                            headerName: 'tag',
                            width: 150,
                            valueGetter: (params) => Tag(params.row.id_tag),
                          },
                        {
                          field: 'code',
                          headerName: 'Code',
                          width: 150,
                          valueGetter: (params) => Code(params.row.code),
                        },
                        {
                            field: 'weapon',
                            headerName: 'Weapon',
                            width: 150,
                            valueGetter: (params) => Weapon(params.row.weapon),
                          },
                          {
                            field: 'company',
                            headerName: 'Company ',
                            width: 150,
                            valueGetter: (params) => Company(params.row.company),
                          },
                          {
                            field: 'squad',
                            headerName: 'Squad ',
                            width: 150,
                            valueGetter: (params) => Squad(params.row.squad),
                          },
                          {
                            field: 'burst',
                            headerName: 'Burst',
                            width: 150,
                            valueGetter: (params) => Burst(params.row.burst),
                          },
                          {
                            field: 'cube',
                            headerName: 'Cube',
                            width: 150,
                            valueGetter: (params) => Cube(params.row.cube),
                          },
                          {
                            field: 'rarity',
                            headerName: 'Rarity',
                            width: 150,
                            valueGetter: (params) => Rarity(params.row.rarity),
                          },
                          {
                            field: 'skill_1',
                            headerName: 'Skill_1',
                            width: 150,
                           
                          },
                          {
                            field: 'skill_2',
                            headerName: 'Skill_2',
                            width: 150,
                          
                          },
                          {
                            field: 'burst_skill',
                            headerName: 'Burst_skill',
                            width: 150,
                           
                          },
                          {
                            field: 'charimg',
                            headerName: 'Avatar',
                            width: 200,
                          
                          },
                        {
                          field: "action",
                          headerName: "Action",
                          width: 120,
                          renderCell: renderActions,

                        },
                      ]}
                      getRowId={(row) => row.Id} // Use uuid or id as the row id
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

export default Characterlist;