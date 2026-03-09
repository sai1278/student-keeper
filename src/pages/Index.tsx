import { useState, useMemo } from "react";
import { useStudents } from "@/hooks/useStudents";
import { Student, StudentFormData } from "@/data/students";
import { downloadExcel } from "@/utils/excelExport";
import { StudentFormDialog } from "@/components/StudentFormDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { TableSkeleton } from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Download,
  Search,
  Pencil,
  Trash2,
  GraduationCap,
  Users,
} from "lucide-react";

const Index = () => {
  const { students, isLoading, addStudent, updateStudent, deleteStudent } =
    useStudents();

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.age.toString().includes(q)
    );
  }, [students, search]);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data: StudentFormData) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, data);
    } else {
      await addStudent(data);
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingStudent(null);
  };

  const handleDelete = async () => {
    if (deletingStudent) {
      await deleteStudent(deletingStudent.id);
      setDeletingStudent(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Student Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your student records effortlessly
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:px-6 animate-fade-in">
        {/* Stats */}
        <div className="mb-6 flex items-center gap-2 rounded-lg border bg-card px-4 py-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Total Students:{" "}
            <strong className="text-foreground">{students.length}</strong>
          </span>
          {search && (
            <span className="text-sm text-muted-foreground">
              · Showing:{" "}
              <strong className="text-foreground">{filtered.length}</strong>
            </span>
          )}
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or age..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => downloadExcel(filtered)}
              disabled={filtered.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Excel
            </Button>
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          {isLoading ? (
            <TableSkeleton />
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Users className="mb-3 h-10 w-10 opacity-40" />
              <p className="font-medium">No students found</p>
              <p className="text-sm">
                {search
                  ? "Try adjusting your search"
                  : "Add your first student to get started"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[60px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-[80px]">Age</TableHead>
                    <TableHead className="w-[120px] text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((student, idx) => (
                    <TableRow key={student.id} className="group">
                      <TableCell className="text-muted-foreground font-mono text-sm">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {student.email}
                      </TableCell>
                      <TableCell>{student.age}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(student)}
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingStudent(student)}
                            className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      {/* Dialogs */}
      <StudentFormDialog
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={
          editingStudent
            ? {
                name: editingStudent.name,
                email: editingStudent.email,
                age: editingStudent.age.toString(),
              }
            : undefined
        }
        title={editingStudent ? "Edit Student" : "Add New Student"}
        isLoading={isLoading}
      />

      <DeleteConfirmDialog
        open={!!deletingStudent}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleDelete}
        studentName={deletingStudent?.name || ""}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Index;
