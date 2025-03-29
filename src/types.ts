export interface Category {
  _id: string;
  name: string;
  areaId: string;
  areaName: string;
}

export interface FormConfig {
  containerSelector: string;
  tenantId: string;
  fields: FormField;
  formTitle?: string;
  buttonLabel?: string;
}

export interface Field {
  readonly id: string;
  label?: string;
  hidden?: boolean;
  required?: boolean;
}

export interface FormField {
  name: Field;
  email: Field;
  subject: Field;
  category: Field;
  message: Field;
}

export interface FormOption {
  fields: FormField;
  buttonLabel?: string;
  formTitle?: string;
  categories: Category[];
}

export interface FormState {
  selectedCategory: string | null;
  tenantId: string;
  isSubmitting: boolean;
  error: string | null;
}

export interface FormSubmitData {
  tenantId: string;
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  timestamp: number;
}

