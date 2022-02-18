import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function BasicTable({ ipad }) {
  function formatDate(string) {
    return new Date(string).toString();
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead sx={{ background: "#000" }}>
          <TableRow>
            <StyledTableCell>IP Address</StyledTableCell>
            <StyledTableCell align="right">Accessed Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ipad.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ipadd}
              </TableCell>
              <TableCell align="right">{formatDate(row.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
