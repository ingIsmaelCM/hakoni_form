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
    this.attachEventListeners();
  }

  private render(): void {
    const formHtml = `
      <form class="hakoni-form">
        <div class="form-group">
          <label for="category">Select Category:</label>
          <select id="category" name="category" required>
            <option value="">Choose a category...</option>
            ${this.categories.map(category =>
      `<option value="${category._id}">${category.name}</option>`
    ).join('')}
          </select>
        </div>
        <button type="submit" class="submit-button">Enviar</button>
        ${this.state.error ? `<div class="error">${this.state.error}</div>` : ''}
      </form>
    `;

    this.container.innerHTML = formHtml;
    this.form = this.container.querySelector('form');
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

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubmit();
    });

    const categorySelect = this.form.querySelector('#category');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.state.selectedCategory = target.value;
      });
    }
  }

  private async handleSubmit(): Promise<void> {
    if (this.state.isSubmitting || !this.state.selectedCategory) return;

    this.state.isSubmitting = true;
    this.state.error = null;
    this.render();

    const submitData: FormSubmitData = {
      tenantId: this.state.tenantId,
      categoryId: this.state.selectedCategory,
      timestamp: Date.now()
    };

    try {
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

