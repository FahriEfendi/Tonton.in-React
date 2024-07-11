import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import { MyProSidebarProvider } from "../pages/global/sidebar/sidebarContext";
import Topbar from "../pages/global/Topbar";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


function AddChar() {
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [id_tag, setId_tag] = useState("");
  const [id_category, setId_category] = useState("");
  const [vid_thumbnail, setVid_thumbnail] = useState("");
  const [id_episode, setId_episode] = useState("");
  const [time, setTime] = useState("");
 

  const AddBokepIndo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/videos", {
        title: title,
        slug: slug,
        description: description,
        id_tag: id_tag,
        id_category: id_category,
        vid_thumbnail: vid_thumbnail,
        id_episode: id_episode,
        time: time
      });

      navigate("/admin/bokepindo");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div className="min-h-full" style={{ height: "100%", width: "100%" }}>
            <Helmet>
              <title>Shifty | Add Karakter</title>
            </Helmet>
            <Topbar />
            <main className="w-11/12 md:w-9/12 border-1 p-4 mb-4 rounded mx-auto">
            <Box m="20px">
                <div>
                  <h1 className="title">Tambah Bokep Indo</h1>
                  <h2 className="subtitle">Add Bokep Indo </h2>
                  <div className="card is-shadowless">
                    <div className="card-content">
                      <div className="content">
                        <form onSubmit={AddBokepIndo}>
                          <p className="has-text-centered">{msg}</p>
                          <br />
                         
                          <TextField fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required // This attribute makes the field required
                          />
                         <br />
                         <br />
                         <TextField fullWidth
                            label="Slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            required // This attribute makes the field required
                          />
                         <br />
                         <br />
                         <TextField fullWidth
                            label="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required // This attribute makes the field required
                          />
                         <br />
                         <br />
                         
                         <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={id_tag}
                              label="Tag"
                              required // This attribute makes the field required
                              onChange={(e) => setId_tag(e.target.value)}
                            >
                              <MenuItem value={"1"}>Bocil</MenuItem>
                              <MenuItem value={2}>Tante</MenuItem>
                          
                            </Select>
                          </FormControl>
                          <br />
                          <br />
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">category</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={id_category}
                              label="category"
                              required // This attribute makes the field required
                              onChange={(e) => setId_category(e.target.value)}
                            >
                              <MenuItem value={"1"}>Bokep Indonesia</MenuItem>
                              <MenuItem value={2}>Bokep Live Record</MenuItem>
                          
                            </Select>
                          </FormControl>
                           <br />
                           <br />
                           <TextField fullWidth
                            label="Vid tubnail"
                            value={vid_thumbnail}
                            onChange={(e) => setVid_thumbnail(e.target.value)}
                            required // This attribute makes the field required
                          />
                         <br />
                         <br />

                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Episode</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={id_episode}
                              label="Class"
                              required // This attribute makes the field required
                              onChange={(e) => setId_episode (e.target.value)}
                            >
                              <MenuItem value={"1"}>8</MenuItem>
                              <MenuItem value={2}>12</MenuItem>
                            </Select>
                          </FormControl>

                          <br />
                           <br />
                           <TextField fullWidth
                            label="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required // This attribute makes the field required
                          />
                         <br />
                         <br />

                          
                          <div className="field">
                            <div className="control">
                              <Button type="submit" variant="contained">
                                Save Data
                              </Button>                          
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AddChar;