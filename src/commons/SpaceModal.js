import { useEffect, useState } from "react";
import { Modal, Box, Grid } from "@mui/material";
import CloseIcon from "../assets/images/closeIcon.png";
import SpacexLogo from "../assets/images/spacexIcon.png";
import Nasa from "../assets/images/nasa.png";
import Wiki from "../assets/images/wiki.png";
import Youtube from "../assets/images/youtube.png";
import Divider from "@mui/material/Divider";
import axios from "axios";
import moment from "moment";

const SpaceModal = (props) => {
  const { isOpen, setIsOpen, flightNumbr } = props;
  const [flightDetails, setFlightDetails] = useState();

  useEffect(() => {
    const fetchFlightById = async () => {
      const res = await axios.get(
        `https://api.spacexdata.com/v3/launches/${flightNumbr}`
      );

      setFlightDetails(res?.data);
    };
    fetchFlightById();
  }, []);

  const launchStatus = () => {
    if (flightDetails?.launch_success === true) {
      return <p className="succes modal-success">success</p>;
    } else if (flightDetails?.upcoming === true) {
      return <p className="upcoming modal-success">upcoming</p>;
    } else {
      return <p className="failed modal-success">failed</p>;
    }
  };

  const orbitInfo = () => {
    if (flightDetails?.rocket) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const [orbitData] = flightDetails?.rocket?.second_stage?.payloads;
      return orbitData?.orbit;
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isOpen}
      >
        <Box className="model-popup-wrapper contact-admin">
          <img
            src={CloseIcon}
            className="close-btn"
            alt="close-button"
            onClick={() => {
              setIsOpen(false);
            }}
          />

          <Grid container spacing={2}>
            <div className="modal-body-item">
              <img src={SpacexLogo} alt="spacex" style={{ height: "84px" }} />
            </div>
            <div className="modal-body-item">
              <div style={{ fontWeight: "700", marginBottom: "8px" }}>
                {flightDetails?.mission_name}
              </div>
              <div className="rocket-name">{flightDetails?.rocket?.rocket_name}</div>
              <div className="icons-data">
                <a
                  href={flightDetails?.links?.article_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="span-item">
                    <img src={Nasa} alt="spacex" />
                  </span>
                </a>
                <a
                  href={flightDetails?.links?.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="span-item">
                    <img src={Wiki} alt="spacex" />
                  </span>
                </a>
                <a
                  href={flightDetails?.links?.video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="span-item">
                    <img src={Youtube} alt="spacex" />
                  </span>
                </a>
              </div>
            </div>
            <div className="modal-body-item">{launchStatus()}</div>
          </Grid>
          <div>
            <div>
              <p>{flightDetails?.details || "No Details available"}</p>
            </div>
            <div className="flight-info-container">
              <Grid container>
                <Grid item xs={6} className="flght-info">
                  Flight Number
                </Grid>
                <Grid item xs={6} className="flght-info">
                  {flightDetails?.flight_number}
                </Grid>
                <Divider style={{ width: "100%" }} />
                <Grid item xs={6} className="flght-info">
                  Mission Name
                </Grid>
                <Grid item xs={6} className="flght-info">
                  {flightDetails?.mission_name}
                </Grid>
                <Divider style={{ width: "100%" }} />
                <Grid item xs={6} className="flght-info">
                  Rocket Type
                </Grid>
                <Grid item xs={6} className="flght-info">
                  {flightDetails?.rocket?.rocket_type}
                </Grid>
                <Divider style={{ width: "100%" }} />
                <Grid item xs={6} className="flght-info">
                  Rocket Name
                </Grid>
                <Grid item xs={6} className="flght-info">
                  {flightDetails?.rocket?.rocket_name}
                </Grid>
                <Divider style={{ width: "100%" }} />
                <Grid item xs={6} className="flght-info">
                  Manufacturer
                </Grid>
                <Grid item xs={6} className="flght-info">
                  SpaceX
                </Grid>
                <Divider style={{ width: "100%" }} />
                <Grid item xs={6} className="flght-info">
                  Nationality
                </Grid>
                <Grid item xs={6} className="flght-info">
                  SpaceX
                </Grid>
                <Divider style={{ width: "100%" }} />
                <Grid item xs={6} className="flght-info">
                  Launch Date
                </Grid>
                <Grid item xs={6} className="flght-info">
                  {moment(flightDetails?.launch_date_utc).format("Do MMMM YYYY, h:mm")}
                </Grid>
                <Divider style={{ width: "100%" }} />
                <Grid item xs={6} className="flght-info">
                  Payload Type
                </Grid>
                <Grid item xs={6} className="flght-info">
                  {flightDetails?.flight_number}
                </Grid>
                <Divider style={{ width: "100%" }} />
                <Grid item xs={6} className="flght-info">
                  Orbit
                </Grid>
                <Grid item xs={6} className="flght-info">
                  {orbitInfo() || "No orbit info available"}
                </Grid>
                <Divider style={{ width: "100%" }} />
                <Grid item xs={6} className="flght-info">
                  Launch Site
                </Grid>
                <Grid item xs={6} className="flght-info">
                  {flightDetails?.flight_number}
                </Grid>
                <Divider style={{ width: "100%" }} />
              </Grid>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SpaceModal;
