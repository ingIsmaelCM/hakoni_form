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
            background: var(--hakoni-soft-black);
        }

        ::-webkit-scrollbar-thumb {
             background: var(--hakoni-primary-color);
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

        .hakoni_form_loader {
            width: 50px;
            --b: 8px; 
            aspect-ratio: 1;
            border-radius: 50%;
            padding: 1px;
            background: conic-gradient(#0000 10%,#ffffff) content-box;
            -webkit-mask:
                repeating-conic-gradient(#0000 0deg,#000 1deg 20deg,#0000 21deg 36deg),
                radial-gradient(farthest-side,#0000 calc(100% - var(--b) - 1px),#000 calc(100% - var(--b)));
            -webkit-mask-composite: destination-in;
                    mask-composite: intersect;
            animation:l4 1s infinite steps(10);
        }
        @keyframes l4 {to{transform: rotate(1turn)}}

        .hakoni_form_loader_container {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           display: none;
           justify-content: center;
           align-items: center;
           background-color: rgba(0, 0, 0, 0.5);
           z-index: 100;
        }

        .hakoni_form_container {
            max-width: 37.5em;
            margin: 3.125em auto;
            padding: 1.25em;
            border-radius: 0.5em;
            box-shadow: 0 0 0.625em rgba(0, 0, 0, 0.1);
            position: relative;
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

        .hakoni_form_required{
            color: red;
        }
        .hakoni_form_error {
            color: red;
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
            background-color: var(--hakoni-secondary-color);
        }

        .hakoni_form_carousel {
            display: flex;
            align-items: center;
            gap: 0.625em;
            overflow-x: auto;
            margin: 0.25em auto;
            padding: 0.625em;
            background-color: var(--hakoni-light-white);
            border-radius: 0.5em;
            position: relative;
            scroll-behavior: smooth;

        }

         .hakoni_form_carousel_left_arrow, .hakoni_form_carousel_right_arrow {
            user-select: none;
            width: 1.5em;
            height: 100%;
            position: sticky;
            top: 0;
            padding: 0.625em;
            bottom: 0;
            cursor: pointer;
            z-index: 50;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
           
        }
        .hakoni_form_carousel_left_arrow span, .hakoni_form_carousel_right_arrow span {
            background-color: transparent;
            font-size: 1.7em;
            font-weight: bold;
            color: white;
        }

        .hakoni_form_carousel_left_arrow {
            left: 0;
        }
        .hakoni_form_carousel_right_arrow {
            right: 0;
           
        }

        .hakoni_form_carousel_item {
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 8.5em;
            height: 8.5em;
            margin-right: 1.25em;
            text-align: center;
            position: relative;
        }

        .hakoni_form_carousel_img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.25em;
            cursor: pointer;
        }

        .hakoni_form_carousel_document {
            width: 60%;
            height: 60%;
            object-fit: cover;
            border-radius: 0.25em;
            cursor: pointer;
        }

        .hakoni_form_carousel_document_name {
            display: block;
            margin-top: 0.825em;
            color: var(--hakoni-tertiary-color);
            text-decoration: none;
            font-size: 0.75em;
            line-height: 1.5em;
            padding: 0 0.35em;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            direction: rtl;
            width: 80%;
            text-align: center;
        }

        .hakoni_form_carousel_link {
            display: block;
            margin-top: 0.625em;
            color: var(--hakoni-primary-color);
            text-decoration: none;
        }

        .hakoni_form_remove_btn, .hakoni_form_preview_close {
            position: absolute;
            top: 0.3125em;
            right: 0.3125em;
            background-color: red;
            color: white;
            border: none;
            border-radius: 50%;
            width: 1.5em;
            height: 1.5em;
            cursor: pointer;
            font-size: 0.75em;
            line-height: 1.5em;
            text-align: center;
        }

        .hakoni_form_preview {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            justify-content: center;
            align-items: center;
        }

        .hakoni_form_preview_img {
            max-width: 90%;
            max-height: 90%;
        }



        @media (max-width: 48em) {
            .hakoni_form_container {
                margin: 1.25em;
                padding: 0.9375em;
            }
            .hakoni_form_h1 {
            font-size: 1.5em;
            }
            .hakoni_form_carousel_left_arrow, .hakoni_form_carousel_right_arrow{
                display: none;
            }
            
        }
`