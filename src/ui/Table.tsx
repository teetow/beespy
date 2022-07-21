import React, { Fragment } from "react";
import ScoreTable from "../pages/index/ScoreTable";
import { styled } from "../stitches.config";

const TableView = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(8, 2rem)",
  gridTemplateRows: "repeat(8, 2rem)",
  gridAutoFlow: "row",
  fontWeight: 700,
});

const Cell = styled("div", {
  textAlign: "center",
  alignSelf: "center",

  variants: {
    numeric: {
      true: {
        color: "$yellow9",
      },
      false: {
        fontSize: "0.8rem",
        paddingTop: "0.13em",
        fontWeight: 100,
      },
    },
    done: {
      true: {
        color: "$sand10",
        fontSize: "0.6rem",
        fontWeight: 100,
      },
    },
    header: {
      column: {
        gridRow: 1,
        color: "$sand10",
      },
      row: {
        gridColumn: 1,
        color: "$sand10",
      },
    },
  },
  compoundVariants: [
    {
      numeric: true,
      done: true,
      css: {
        color: "currentColor",
      },
    },
  ],
});

type TableProps = {
  table: ScoreTable;
};

const Table = ({ table }: TableProps) => {
  return (
    <TableView>
      {table.head.map((thead, i) => (
        <Cell key={`${thead}-${i}`} header="column" css={{ gridColumn: i + 1 }}>
          {thead}
        </Cell>
      ))}
      {Object.entries(table.rows).map(([key, row], i) => {
        const currentRow = i + 2;
        return (
          <Fragment key={`${key}`}>
            <Cell header="row" css={{ gridRow: currentRow }}>
              {key.toUpperCase()}
            </Cell>

            {Object.entries(row).map(([length, count], i) => {
              const currentLength = Number(length);
              const currentColumn = ScoreTable.columnForLength(table, currentLength) + 1;

              return (
                <Cell
                  key={`${i}`}
                  numeric={Number.isInteger(count)}
                  done={count === 0}
                  css={{
                    gridRow: currentRow,
                    gridColumn: currentColumn,
                  }}
                >
                  {Number.isNaN(count) ? "-" : count === 0 ? "✔" : count}
                </Cell>
              );
            })}
          </Fragment>
        );
      })}
    </TableView>
  );
};

export default Table;
