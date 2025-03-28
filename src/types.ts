export interface Category {
  _id: string;
  name: string;
  areaId: string;
  areaName: string;
}

export interface FormConfig {
  containerSelector: string;
  tenantId: string;
}

export interface FormState {
  selectedCategory: string | null;
  tenantId: string;
  isSubmitting: boolean;
  error: string | null;
}

export interface FormSubmitData {
  tenantId: string;
  categoryId: string;
  timestamp: number;
}

