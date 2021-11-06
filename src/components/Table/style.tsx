import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'green',//theme.palette.common.black,
            color: theme.palette.common.white,
            // fontFamily: fontPoppins,
            // fontWeight: fontsWeightBold
        },
        body: {
            fontSize: 14,
            // fontFamily: fontPoppins
        },
    }),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            }
        },
    }),
)(TableRow);

export const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 700,
        borderRadius: 4,
    },
    tableTopBorder: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    tableBottomBorder: {
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    }
});
