import { Fragment } from "react";
import { IBook } from "../../interfaces/BestsellerList";
import { Column, ColumnDescription, ColumnData } from "./Styled";

interface IProps {
  book: IBook;
}

export const BestsellerDetails = ({ book }: IProps) => {
  const { book_details } = book;
  return (
    <Fragment>
      <Column item xs={12} sm={2} mb={{ xs: 2, sm: 0 }}>
        <ColumnDescription>Rank</ColumnDescription>
        <ColumnData>{book.rank}</ColumnData>
      </Column>
      <Column item xs={12} sm={6} mb={{ xs: 2, sm: 0 }}>
        <ColumnDescription>Title</ColumnDescription>
        <ColumnData variant="h2">{book_details.title}</ColumnData>
      </Column>
      <Column item xs={12} sm={4}>
        <ColumnDescription>Author</ColumnDescription>
        <ColumnData>{book_details.author || "-"}</ColumnData>
      </Column>
    </Fragment>
  );
};
