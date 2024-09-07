import { FC, useMemo } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "./PopulationTable.module.css";

interface Country {
  abbreviation: string;
  name: string;
  capital: string;
  phone: string;
  population: number;
  media: {
    flag: string;
    emblem: string;
  };
}

interface PopulationTableProps {
  countries: Country[];
}

const PopulationTable: FC<PopulationTableProps> = ({ countries }) => {
  const columns = useMemo<ColumnDef<Country>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Country Name",
      },
      {
        accessorKey: "abbreviation",
        header: "Code",
      },
      {
        accessorKey: "capital",
        header: "Capital",
      },
      {
        accessorKey: "phone",
        header: "Ph Code",
      },
      {
        accessorKey: "population",
        header: "Population",
      },
      {
        accessorKey: "media.flag",
        header: "Flag",
        cell: (info) => (
          <img
            src={info.getValue<string>()}
            alt="flag"
            width={50}
            height={30}
          />
        ),
      },
      {
        accessorKey: "media.emblem",
        header: "Emblem",
        cell: (info) => (
          <img
            src={info.getValue<string>()}
            alt="emblem"
            width={30}
            height={30}
          />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: countries,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={styles.mainTable}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={styles.tableHeader}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`${styles.tableCell} ${
                  cell.column.columnDef.header === "Emblem" &&
                  styles.emblemColumn
                }`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PopulationTable;
