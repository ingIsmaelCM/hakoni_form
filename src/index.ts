import { FormBuilder } from './form.builder';
import { FormConfig, FormState, FormSubmitData, Category } from './types';

class HakoniForm {
  private config: FormConfig;
  private state: FormState;
  private container: HTMLElement;
  private form: HTMLFormElement | null = null;
  private categories: Category[] = [];
  private apiUrl = process.env.API_URL || '';


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
      error: null
    };
    this.getCategories().then(() => {
      this.init();
    });
  }

  private init(): void {
    this.render();
  }

  private render(): void {
    const formHtml = new FormBuilder({
      fields: this.config.fields || {},
      formTitle: this.config.formTitle,
      buttonLabel: this.config.buttonLabel,
      categories: this.categories
    }).build();
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
      console.log(response);
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
        console.log(e);
        e.preventDefault();
        await this.handleSubmit();
      });
    }
  }

  private async handleSubmit(): Promise<void> {



    try {
      if (this.state.isSubmitting || !this.form) return;
      this.state.isSubmitting = true;
      //validate form 
      const form = this.form as HTMLFormElement;
      if (!form.checkValidity()) {
        this.state.error = 'Form is not valid';
        console.log(this.state.error);
        this.state.isSubmitting = false;
        return;
      }

      const formData = new FormData(this.form);

      const submitData: FormSubmitData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        category: formData.get('category') as string,
        message: formData.get('message') as string,
        tenantId: this.state.tenantId,
        timestamp: Date.now()
      };

      console.log(submitData);
      const response = await fetch(this.apiUrl + 'tickets/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form after successful submission
      this.state.selectedCategory = null;
      this.form?.reset();
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      this.state.isSubmitting = false;
      this.render();
    }
  }
}

export function createHakoniForm(config: FormConfig): HakoniForm {
  return new HakoniForm(config);
}

