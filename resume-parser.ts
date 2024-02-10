import * as pdfjsLib from 'pdfjs-dist';
import * as mammoth from 'mammoth';

export function extractTextFromPDF(file: ArrayBuffer){
        const input: { file: ArrayBuffer } = { file: file };
        pdfjsLib.getDocument(input as any).promise.then(function (pdf) {
            var numPages = pdf.numPages;
            var text = "";

            for (var i = 1; i <= numPages; i++) {
                pdf.getPage(i).then(function (page) {
                    page.getTextContent().then(function (content) {
                        content.items.forEach(function (item) {
                            if ('str' in item) { // Type checking
                                text += item.str + "\n";
                            } else if ('textContent' in item) { // Type checking for TextMarkedContent
                                text += item.textContent + "\n";
                            }
                        });
                    });
                });
            }
            console.log(text);
        });
}

interface File {
    path: string;
}

function extractTextFromDOCX(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        mammoth.extractRawText({ path: file.path })
            .then(result => {
                resolve(result.value);
            })
            .catch(error => {
                reject(error);
            });
    });
}


