import { MediaFile } from "./types";


const env = process.env;


export class FileHandler {

    private fileInput: HTMLInputElement;
    private carouselElement: HTMLDivElement;
    private previewElement: HTMLDivElement;
    private previeImg: HTMLImageElement;
    private closePreviewElement: HTMLSpanElement;

    private selectedFiles: MediaFile[] = [];
    private originalFiles: File[] = [];

    private acceptedFiles: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];


    constructor() {
        this.fileInput = document.querySelector('#hakoni_form_attachments') as HTMLInputElement;
        this.carouselElement = document.querySelector('#hakoni_form_attachments_carousel') as HTMLDivElement;
        this.previewElement = document.querySelector('#hakoni_form_attachments_preview') as HTMLDivElement;
        this.previeImg = document.querySelector('#hakoni_form_attachments_preview_img') as HTMLImageElement;
        this.closePreviewElement = document.querySelector('#hakoni_form_attachments_preview_close') as HTMLSpanElement;
    }

    public init(): void {
        this.attachEventListeners();
        this.updateCarousel();
    }

    public getSelectedFiles(): MediaFile[] {
        return this.selectedFiles;
    }

    private attachEventListeners(): void {
        this.fileInput.addEventListener('change', async (e) => {
            const element = e.target as HTMLInputElement;
            const files = element.files;
            if (!files || this.selectedFiles.length >= Number(env.MAX_FILE_COUNT || '20')) return;
            for (let i = 0; i < Math.min(files.length, Number(env.MAX_FILE_COUNT || '20')); i++) {
                const file = files[i];
                if (!this.acceptedFiles.includes(file.type)) continue;
                this.originalFiles.push(file);
                const base64 = await this.getBase64(file);
                this.selectedFiles.push({
                    name: file.name,
                    size: file.size,
                    extension: file.name.split('.').pop() || '',
                    url: base64,
                    type: file.type.includes('image') ? 'image' : 'document'
                });
            }
            this.setDataTransfer();
            this.updateCarousel();
        });
        this.closePreviewElement.addEventListener('click', () => {
            this.previewElement.style.display = 'none';
        });


    }

    private getBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }
    private carouselLeftArrow(): HTMLDivElement {
        const arrow = document.createElement('div');
        arrow.classList.add('hakoni_form_carousel_left_arrow');
        const span = document.createElement('span');
        span.innerText = '<';
        arrow.appendChild(span);
        arrow.id = 'hakoni_form_attachments_carousel_left_arrow';
        arrow.addEventListener('click', () => {
            const carousel = document.querySelector('#hakoni_form_attachments_carousel') as HTMLDivElement;
            const item = carousel.querySelector('.hakoni_form_carousel_item') as HTMLDivElement;
            if (carousel.scrollLeft > 0) {
                carousel.scrollLeft -= (item.clientWidth*2.5);
            }
        });
        return arrow;
    }

    private carouselRightArrow(): HTMLDivElement {
        const arrow = document.createElement('div');
        arrow.classList.add('hakoni_form_carousel_right_arrow');
        const span = document.createElement('span');
        span.innerText = '>';
        arrow.appendChild(span);
        arrow.id = 'hakoni_form_attachments_carousel_right_arrow';
        arrow.addEventListener('click', () => {
            const carousel = document.querySelector('#hakoni_form_attachments_carousel') as HTMLDivElement;
            const item = carousel.querySelector('.hakoni_form_carousel_item') as HTMLDivElement;
            if (carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth) {
                carousel.scrollLeft += (item.clientWidth*2.5);
            }
        });
        return arrow;
    }

    private updateCarousel(): void {
        this.carouselElement.innerHTML = '';
        this.selectedFiles.forEach(file => {
            const item = document.createElement('div');
            item.className = 'hakoni_form_carousel_item';
            if (file.type === 'image') {
                const img = document.createElement('img');
                img.className = 'hakoni_form_carousel_img';
                img.src = file.url;
                img.alt = file.name;
                img.addEventListener('click', () => {
                    this.showPreview(file);
                });
                item.appendChild(img);
            } else {
                const link = document.createElement('a');
                const name = document.createElement('span');
                name.className = 'hakoni_form_carousel_document_name';
                name.innerText = this.start_and_end(file.name);
                link.className = 'hakoni_form_carousel_link';
                link.href = file.url;
                link.download = file.name;
                link.appendChild(name);
                const img = document.createElement('img');
                img.className = 'hakoni_form_carousel_document';
                img.src = '../assets/document.svg';
                img.alt = file.name;
                item.appendChild(img);
                item.appendChild(link);
            }

            const removeBtn = document.createElement('span');
            removeBtn.className = 'hakoni_form_remove_btn';
            removeBtn.innerText = 'X';
            removeBtn.addEventListener('click', () => {
                this.removeFile(this.selectedFiles.indexOf(file));
                this.setDataTransfer();
            });
            item.appendChild(removeBtn);
            this.carouselElement.appendChild(item);

        });
        if(this.selectedFiles.length > 3) {
            const leftArrow = this.carouselLeftArrow();
            const rightArrow = this.carouselRightArrow();
            this.carouselElement.prepend(leftArrow);
            this.carouselElement.appendChild(rightArrow);
        }
    }

    private setDataTransfer() {
        const dataTransfer = new DataTransfer();
        this.originalFiles.filter(f => !!this.selectedFiles.find(s => s.name === f.name)).forEach(f => {
            dataTransfer.items.add(f);
        });
        this.fileInput.files = dataTransfer.files;
    }

    private showPreview(file: MediaFile): void {
        this.previeImg.src = file.url;
        this.previewElement.style.display = 'flex';
    }

    private removeFile(index: number): void {
        this.selectedFiles.splice(index, 1);
        this.updateCarousel();
    }

    start_and_end(str: string) {
        if (str.length > 25) {
          return str.substring(0, 15) + '...' + str.substring(str.length-8, str.length);
        }
        return str;
      }


}