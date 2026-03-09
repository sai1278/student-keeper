import { StudentFormData } from "@/data/students";

export interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStudentForm(data: StudentFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name must be less than 100 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.age.trim()) {
    errors.age = "Age is required";
  } else {
    const age = parseInt(data.age);
    if (isNaN(age) || age < 1 || age > 120) {
      errors.age = "Age must be between 1 and 120";
    }
  }

  return errors;
}
