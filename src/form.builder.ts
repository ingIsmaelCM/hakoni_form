import { Category, Field, FormField, FormOption } from "./types";
import { style } from './style.css';

export class FormBuilder {

    private form: HTMLFormElement;
    private fields: FormField;
    private buttonLabel: string;
    private formTitle: string;
    private categories: Category[];

    constructor(options: FormOption) {
        const { fields, formTitle, buttonLabel, categories } = options;
        this.formTitle = formTitle || 'Formulario de contacto';
        this.buttonLabel = buttonLabel || 'Enviar';
        this.form = document.createElement('form');
        this.form.classList.add('hakoni_form_form');
        this.categories = categories || [];
        this.fields = {
            name: {
                id: 'hakoni_form_name',
                label: fields.name?.label || 'Nombre Completo',
                hidden: fields.name?.hidden || false,
                required: fields.name?.required || true,
            },
            email: {
                id: 'hakoni_form_email',
                label: fields.email?.label || 'Correo Electrónico',
                hidden: fields.email?.hidden || false,
                required: fields.email?.required || true,
            },
            subject: {
                id: 'hakoni_form_subject',
                label: fields.subject?.label || 'Asunto',
                hidden: fields.subject?.hidden || false,
                required: fields.subject?.required || true,
            },
            category: {
                id: 'hakoni_form_category',
                label: fields.category?.label || 'Categoría',
                hidden: fields.category?.hidden || false,
                required: fields.category?.required || true,
            },
            message: {
                id: 'hakoni_form_message',
                label: fields.message?.label || 'Mensaje',
                hidden: fields.message?.hidden || false,
                required: fields.message?.required || true,
            },
        };
    }

    public build(): HTMLDivElement {
        const container = document.createElement('div');
        const styleTag = document.createElement('style');
        styleTag.innerHTML = style;
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(styleTag);

        container.classList.add('hakoni_form_container');
        const title = document.createElement('h1');
        title.classList.add('hakoni_form_h1');
        title.innerText = this.formTitle;
        container.appendChild(title);
        this.nameElement().emailElement().categoryElement().subjectElement().messageElement().submitButton();
        container.appendChild(this.form);
        return container;
    }

    private formGoup(child: HTMLElement[]): FormBuilder {
        const formGroup = document.createElement('div');
        formGroup.classList.add('hakoni_form_group');
        child.forEach(element => formGroup.appendChild(element));
        this.form.appendChild(formGroup);
        return this;
    }
    private formLabel(field: Field): HTMLLabelElement {
        const label = document.createElement('label');
        label.classList.add('hakoni_form_label');
        label.setAttribute('for', field.id);
        label.innerText = field.label!;
        return label;
    }

    private nameElement(): FormBuilder {
        const name = document.createElement('input');
        name.type = 'text';
        name.classList.add('hakoni_form_input');

        name.id = this.fields.name.id;
        name.name = this.fields.name.id.replace('hakoni_form_', '');
        if (this.fields.name.hidden) {
            name.setAttribute('type', 'hidden');
        }
        if (this.fields.name.required) {
            name.required = true;
        }
        const label = this.formLabel(this.fields.name);
        return this.formGoup([label, name]);
    }

    private emailElement(): FormBuilder {
        const email = document.createElement('input');
        email.type = 'email';
        email.classList.add('hakoni_form_input');

        email.id = this.fields.email.id;
        email.name = this.fields.email.id.replace('hakoni_form_', '');
        if (this.fields.email.hidden) {
            email.setAttribute('type', 'hidden');
        }
        if (this.fields.email.required) {
            email.required = true;
        }
        const label = this.formLabel(this.fields.email);
        return this.formGoup([label, email]);
    }

    private subjectElement(): FormBuilder {
        const subject = document.createElement('input');
        subject.type = 'text';
        subject.classList.add('hakoni_form_input');

        subject.id = this.fields.subject.id;
        subject.name = this.fields.subject.id.replace('hakoni_form_', '');
        if (this.fields.subject.hidden) {
            subject.setAttribute('type', 'hidden');
        }
        if (this.fields.subject.required) {
            subject.required = true;
        }
        const label = this.formLabel(this.fields.subject);
        return this.formGoup([label, subject]);
    }

    private categoryElement(): FormBuilder {
        const category = document.createElement('select');
        category.classList.add('hakoni_form_select');

        category.id = this.fields.category.id;
        category.name = this.fields.category.id.replace('hakoni_form_', '');
        if (this.fields.category.hidden) {
            category.setAttribute('type', 'hidden');
        }
        if (this.fields.category.required) {
            category.required = true;
        }
        category.innerHTML = '';
        const emptyOption = document.createElement('option');
        emptyOption.innerText = '';
        category.appendChild(emptyOption);
        this.categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat._id;
            option.innerText = cat.name;
            category.appendChild(option);
        });

        if (this.fields.category.hidden) {
            category.setAttribute('hidden', 'true');
        }
        const label = this.formLabel(this.fields.category);
        return this.formGoup([label, category]);
    }

    private messageElement(): FormBuilder {
        const message = document.createElement('textarea');
        message.classList.add('hakoni_form_textarea');

        message.id = this.fields.message.id;
        message.name = this.fields.message.id.replace('hakoni_form_', '');
        message.setAttribute('rows', '8');
        if (this.fields.message.hidden) {
            message.setAttribute('type', 'hidden');
        }
        if (this.fields.message.required) {
            message.required = true;
        }
        const label = this.formLabel(this.fields.message);
        return this.formGoup([label, message]);
    }

    private submitButton(): FormBuilder {
        const button = document.createElement('button');
        button.classList.add('hakoni_form_button');
        button.type = 'button';
        button.id = 'hakoni_form_submit';
        button.innerText = this.buttonLabel;
      
        return this.formGoup([button]);
    }
}
