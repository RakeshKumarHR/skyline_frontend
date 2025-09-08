interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  rows: any[];
}

export default function Table({ columns, rows }: TableProps) {
  return (
    <div className="rounded-lg border border-gray-200">
      <table className="min-w-full border  rounded-lg overflow-hidden">
        <thead className="text-left text-sm font-medium !text-[10px] text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 !text-[10px]">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
