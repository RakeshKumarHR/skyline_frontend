interface ColumnsInterface {
  key: string;
  label: string;
}
const columns: ColumnsInterface[] = [
  { key: "user", label: "User" },
  { key: "movie", label: "Movie" },
  { key: "comment", label: "Comment" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];
export { columns };
