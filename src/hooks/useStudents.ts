import { useState, useCallback } from "react";
import { Student, StudentFormData, initialStudents } from "@/data/students";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = useCallback(async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsLoading(false);
  }, []);

  const addStudent = useCallback(async (data: StudentFormData) => {
    await simulateLoading();
    const newStudent: Student = {
      id: Date.now().toString(),
      name: data.name.trim(),
      email: data.email.trim(),
      age: parseInt(data.age),
    };
    setStudents((prev) => [...prev, newStudent]);
  }, [simulateLoading]);

  const updateStudent = useCallback(async (id: string, data: StudentFormData) => {
    await simulateLoading();
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, name: data.name.trim(), email: data.email.trim(), age: parseInt(data.age) }
          : s
      )
    );
  }, [simulateLoading]);

  const deleteStudent = useCallback(async (id: string) => {
    await simulateLoading();
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, [simulateLoading]);

  return { students, isLoading, addStudent, updateStudent, deleteStudent };
}
