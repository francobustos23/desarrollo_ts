import { TableHead, TableHeader, TableRow } from "../ui/table"


export const TableHeaderComponent = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Acciones</TableHead>
            </TableRow>
        </TableHeader>
    )
}
