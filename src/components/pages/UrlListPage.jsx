import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const styles = (theme) => ({
  container: {
    maxHeight: 280,
    borderRadius: "0 0 20px 20px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "100px",
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.grey[300],
      borderRadius: "4px",
      // height: 100,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.grey[500],
      borderRadius: "4px",
    },
  },
  table: {
    minWidth: 400,
    tableLayout: "fixed", // Fix table layout to remove horizontal scroll
    "& th, & td": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.secondary,
    // backgroundColor: "gray",
    zIndex: 1,
  },
  cell: {
    width: "25%", // Set the width of table cells
  },
  actionCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
    cursor: "pointer",
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

function UrlListPage(props) {
  const { classes } = props;
  const { urls } = useSelector((state) => state.urls);

  const handleShortUrlClick = (shortUrl) => {
    window.open(shortUrl, "_blank"); // Open the short URL in a new tab
  };

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow className={classes.stickyHeader}>
            <TableCell align="center" className={classes.cell}>
              Original URL
            </TableCell>
            <TableCell align="center" className={classes.cell}>
              Short URL
            </TableCell>
            <TableCell align="center" className={classes.cell}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url.id}>
              <TableCell className={classes.cell}>{url.originalUrl}</TableCell>
              <TableCell
                className={classes.cell}
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => handleShortUrlClick(url.shortUrl)}
              >
                {url.shortUrl}
              </TableCell>
              <TableCell align="center" className={classes.actionCell}>
                <AiFillEdit
                  className={classes.icon}
                  style={{ color: "green" }}
                />
                <AiFillDelete
                  className={classes.icon}
                  style={{ color: "red" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter className={classes.footer}>
          <TableRow>
            <TableCell colSpan={3}></TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </TableContainer>
  );
}

UrlListPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UrlListPage);
