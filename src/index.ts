import { FileHandler } from './file.handler';
import { FormBuilder } from './form.builder';
import { FormConfig, FormState, FormSubmitData, Category, MediaFile, Field, FormField } from './types';

class HakoniForm {
  private config: FormConfig;
  private state: FormState;
  private container: HTMLElement;
  private form: HTMLFormElement | null = null;
  private categories: Category[] = [];
  private apiUrl = process.env.API_URL || '';
  private fileHandler: FileHandler | null = null;
  private formBuilder: FormBuilder | null = null;
  private formData: FormSubmitData = {
    tenantId: '',
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    attachments: []
  };


  constructor(config: FormConfig) {
    this.config = config;
    const container = document.querySelector(config.containerSelector);
    if (!container) {
      throw new Error(`Container ${config.containerSelector} not found`);
    }
    this.container = container as HTMLElement;
    this.state = {
      selectedCategory: null,
      tenantId: config.tenantId,
      isSubmitting: false,
      error: {}
    };
    this.getCategories().then(() => {
      this.init();
      this.fileHandler = new FileHandler();
      this.fileHandler.init();

    });
  }

  private init(): void {
    this.render();
  }

  private render(): void {
    this.formBuilder = new FormBuilder({
      fields: this.config.fields || {},
      formTitle: this.config.formTitle,
      buttonLabel: this.config.buttonLabel,
      categories: this.categories
    });
    const formHtml = this.formBuilder.build();
    this.container.innerHTML = '';
    this.container.appendChild(formHtml);
    this.form = this.container.querySelector('form');
    this.attachEventListeners();
  }

  private async getCategories() {
    try {
      const response = await fetch(this.apiUrl + 'areas/' + this.config.tenantId + '/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
      });
      this.categories = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  private attachEventListeners(): void {
    if (!this.form) return;
    const button = this.form.querySelector('#hakoni_form_submit');
    if (button) {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.handleSubmit();
      });
    }
  }


  private fillData() {
    const formData = new FormData(this.form!);
    const submitData: FormSubmitData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      category: formData.get('category') as string,
      message: formData.get('message') as string,
      tenantId: this.state.tenantId,
      attachments: this.fileHandler?.getSelectedFiles() || [],
    };
    this.formData = submitData;
  }

  private validateForm(): boolean {
    const fields = this.formBuilder!.getFields();
    Object.keys(fields).forEach(key => {
      const field: Field = fields[key as keyof FormField];
      const value: string | MediaFile[] = this.formData[key as keyof FormSubmitData];
      const label: HTMLLabelElement | null = this.form?.querySelector(`label[for="${field.id}"]`) || null;
      if (field.required && !field.hidden && !value?.length) {
        label?.classList.add('hakoni_form_error');
        this.state.error[key] = `${field.label} is required`;
      } else {
        label?.classList.remove('hakoni_form_error');
      }
    });
    return !Object.keys(this.state.error).length;
  }

  private async handleSubmit(): Promise<void> {
    const loaderContainer = document.querySelector('#hakoni_form_loader_container') as HTMLDivElement;
    try {
      if (this.state.isSubmitting || !this.form) return;
      this.fillData();
      if (!this.validateForm()) {
        throw this.state.error;
      };
      this.state.isSubmitting = true;
      if (loaderContainer) {
        loaderContainer.style.display = 'flex';
      }
      const response = await fetch(this.apiUrl + 'tickets/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      // this.form?.reset();
    } catch (error) {
      throw error instanceof Error ? error.message : error;
    } finally {
      this.state.isSubmitting = false;
      if (loaderContainer) {
        loaderContainer.style.display = 'none';
      }
    }
  }

}

export function createHakoniForm(config: FormConfig): HakoniForm {
  return new HakoniForm(config);
}

