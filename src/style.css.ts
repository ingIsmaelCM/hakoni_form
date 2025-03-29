export const style = `
        :root {
            --hakoni-primary-color: #3498db;
            --hakoni-secondary-color: #2ecc71;
            --hakoni-tertiary-color: #34495e;
            --hakoni-light-white: #ecf0f1;
            --hakoni-soft-black: #7f8c8d;
        }

        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }

        ::-webkit-scrollbar-track {
           background: var(--hakoni-primary-color);
        }

        ::-webkit-scrollbar-thumb {
            background: var(--hakoni-soft-black);
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
           background: var(--hakoni-soft-black);
        }

        ::-webkit-scrollbar-thumb {
            transition: background-color 0.2s ease;
        }

        * {
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
            background-color: var(--hakoni-light-white);
            color: var(--tertiary-color);
            margin: 0;
            padding: 0;
        }

        .hakoni_form_container {
            max-width: 37.5em;
            margin: 3.125em auto;
            padding: 1.25em;
            background-color: #fff;
            border-radius: 0.5em;
            box-shadow: 0 0 0.625em rgba(0, 0, 0, 0.1);
        }

        .hakoni_form_h1 {
            text-align: center;
            color: var(--hakoni-primary-color);
            margin-bottom: 1.25em;
        }

        .hakoni_form_group {
            margin-bottom: 1.25em;
        }

        .hakoni_form_label {
            display: block;
            margin-bottom: 0.3125em;
            color: var(--hakoni-tertiary-color);
        }

        .hakoni_form_input,
        .hakoni_form_select,
        .hakoni_form_textarea {
            width: 100%;
            padding: 0.625em 0.9375em;
            border: 1px solid var(--hakoni-soft-black);
            border-radius: 0.25em;
            font-size: 1em;
        }

        .hakoni_form_input:focus,
        .hakoni_form_select:focus,
        .hakoni_form_textarea:focus {
            border-color: var(--hakoni-primary-color);
            outline: none;
        }

        .hakoni_form_textarea {
            resize: none;
            line-height: 1.5;
            
        }

        .hakoni_form_button {
            width: 100%;
            padding: 0.625em;
            background-color: var(--hakoni-primary-color);
            color: var(--hakoni-light-white);
            border: none;
            border-radius: 0.25em;
            cursor: pointer;
            font-size: 1em;
        }

        .hakoni_form_button:hover {
            background-color: #27ae60;
        }

        @media (max-width: 48em) {
            .hakoni_form_container {
                margin: 1.25em;
                padding: 0.9375em;
            }
        }
`