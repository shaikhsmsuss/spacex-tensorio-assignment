import React, { useState, useEffect } from "react";
import TableGrid from "../../commons/TableGrid";
import { Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import SpaceModal from "../../commons/SpaceModal";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

function SpacexLaunches() {
  const [launches, setLaunches] = React.useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [flightNumbr, setFlightNumber] = useState();
  const [filterParams, setFilterParams] = useSearchParams();
  const [filterAllLaunches, setFilterAllLaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTerm = filterParams?.get("launches");

  const handleChange = (event) => {
    setLaunches(event.target.value);
    if (event.target.value === "") {
      setFilterParams({});
    } else {
      setFilterParams({ launches: event.target.value });
    }
  };

  const fetchAllLaunches = async () => {
    setIsLoading(true);
    const res = await axios.get("https://api.spacexdata.com/v3/launches");
    const transformArray = res?.data?.map((item, index) => ({
      id: index,
      ...item,
    }));
    setIsLoading(false);
    setFilterAllLaunches(transformArray);
  };

  useEffect(() => {
    fetchAllLaunches();
  }, []);

  useEffect(() => {
    const fetchFilterLaunches = async () => {
      if (searchTerm === "upcoming") {
        setIsLoading(true);
        const res = await axios.get(`https://api.spacexdata.com/v3/launches`);
        const transformArray = res?.data?.map((item, index) => ({
          id: index,
          ...item,
        }));
        setIsLoading(false);
        const filterFailedLaunches = transformArray?.filter((item) => item?.upcoming);
        setFilterAllLaunches(filterFailedLaunches);
        setLaunches(searchTerm);
      } else if (searchTerm === "launches") {
        const res = await axios.get("https://api.spacexdata.com/v3/launches");
        const transformArray = res?.data?.map((item, index) => ({
          id: index,
          ...item,
        }));
        setFilterAllLaunches(transformArray);
        setLaunches(searchTerm);
      } else if (searchTerm === "failed") {
        const res = await axios.get("https://api.spacexdata.com/v3/launches");
        const transformArray = res?.data?.map((item, index) => ({
          id: index,
          ...item,
        }));
        const filterFailedLaunches = transformArray?.filter(
          (item) => item?.launch_failure_details
        );
        setFilterAllLaunches(filterFailedLaunches);
        setLaunches(searchTerm);
      } else if (searchTerm === "success") {
        const res = await axios.get("https://api.spacexdata.com/v3/launches");
        const transformArray = res?.data?.map((item, index) => ({
          id: index,
          ...item,
        }));
        const filterFailedLaunches = transformArray?.filter(
          (item) => item?.launch_success
        );
        setFilterAllLaunches(filterFailedLaunches);
        setLaunches(searchTerm);
      } else {
        fetchAllLaunches();
      }
    };
    fetchFilterLaunches();
  }, [searchTerm]);

  const onRowClickHandler = (params) => {
    setIsOpen(true);
    setFlightNumber(params?.row?.flight_number);
  };

  const launchStatus = (params) => {
    if (params?.row?.launch_success === true) {
      return <p className="succes">success</p>;
    } else if (params?.row?.upcoming === true) {
      return <p className="upcoming">upcoming</p>;
    } else {
      return <p className="failed">failed</p>;
    }
  };

  const orbitInfo = (params) => {
    if (params?.row?.rocket) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const [orbitData] = params?.row?.rocket?.second_stage?.payloads;
      return orbitData?.orbit;
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "No:",
      width: 90,
      valueGetter: (params) => `${params.row.flight_number || ""}`,
    },
    {
      field: "launched",
      headerName: "Launched (UTC)",
      width: 200,
      sortable: false,
      valueGetter: (params) =>
        `${moment(params.row?.launch_date_utc).format("Do MMMM YYYY, h:mm") || ""}`,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      sortable: false,
      valueGetter: (params) => `${params.row.launch_site.site_name || ""}`,
    },
    {
      field: "mission",
      headerName: "Mission",
      width: 150,
      sortable: false,
      valueGetter: (params) => `${params.row.mission_name || ""}`,
    },
    {
      field: "orbit",
      headerName: "Orbit",

      width: 150,
      sortable: false,
      renderCell: (params) => {
        return <div>{orbitInfo(params)}</div>;
      },
    },
    {
      field: "status",
      headerName: "Launch Status",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return <div>{launchStatus(params)}</div>;
      },
    },
    {
      field: "rocket",
      headerName: "Rocket",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return <div>{params?.row?.rocket?.rocket_name}</div>;
      },
    },
  ];

  return (
    <div className="wrapper">
      <Grid container spacing={2} className="container">
        {/* <div className="item-1">
          <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
            <InputLabel id="demo-select-small">Launch Year </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={launchByDate}
              label="Select"
              onChange={handleLaunchByDateChange}
            >
              <MenuItem value="" onClick={() => setFilterParams({})}>
                <em>None</em>
              </MenuItem>
              {launchYears?.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div> */}
        <div className="item">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Filter</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={launches}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"launches"}>All Launches</MenuItem>
              <MenuItem value={"upcoming"}>Upcoming Launches</MenuItem>
              <MenuItem value={"success"}>Successful Launches</MenuItem>
              <MenuItem value={"failed"}>Failed Launches</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
      <TableGrid
        rows={filterAllLaunches}
        columns={columns}
        onRowClick={onRowClickHandler}
        getRowId={(row) => row?.id}
        isLoading={isLoading}
      />
      {isOpen && (
        <SpaceModal isOpen={isOpen} setIsOpen={setIsOpen} flightNumbr={flightNumbr} />
      )}
    </div>
  );
}

export default SpacexLaunches;
