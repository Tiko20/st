import TablePagination from '@mui/material/TablePagination';
import { ChangeEvent, useState, MouseEvent, useEffect, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
interface Props {
    dataLength: number
}
const DataGridPageination: FC<Props> = ({ dataLength }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState<number>(Number(searchParams.get("page")) || 0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(Number(searchParams.get("pageSize")) || 10);


    const handleChangePage = (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        searchParams.set("page", page.toString())
        searchParams.set("pageSize", rowsPerPage.toString())
        setSearchParams(searchParams)
    }, [page, rowsPerPage])

    return (
        <TablePagination
            component="div"
            count={dataLength}
            page={!dataLength || dataLength <= 0 ? 0 : page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )

}
export default DataGridPageination 