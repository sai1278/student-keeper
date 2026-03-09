import * as XLSX from "xlsx";
import { Student } from "@/data/students";

export function downloadExcel(students: Student[], filename = "students") {
  const data = students.map((s, i) => ({
    "S.No": i + 1,
    Name: s.name,
    Email: s.email,
    Age: s.age,
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}
