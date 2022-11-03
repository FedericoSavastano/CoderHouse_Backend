import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Contenedor {
    constructor(fileRoute) {
        this.fileRoute = `${__dirname}/db/${fileRoute}.json`;
    }

    async #readMyFile() {
        try {
            if (fs.existsSync(this.fileRoute)) {
                let fileContent = await fs.promises.readFile(
                    this.fileRoute,
                    'utf-8'
                );
                let fileContentParsed = await JSON.parse(fileContent);
                return fileContentParsed;
            } else {
                fs.promises.writeFile(
                    this.fileRoute,
                    JSON.stringify('[]', null, '\t')
                );
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async save(obj) {
        try {
            let fileContent = await this.#readMyFile();
            console.log(fileContent);
            obj.id = (await this.#getLastId()) + 1;
            obj.timestamp = Date.now();
            await fileContent.push(obj);
            await fs.promises.writeFile(
                this.fileRoute,
                JSON.stringify(fileContent, null, '\t')
            );
            return {
                status: 'SUCCESS',
                response: `your new element is saved under the id : ${obj.id}`,
            };
        } catch (error) {
            console.log(error);
            return { status: 'ERROR', response: error };
        }
    }

    async #getLastId() {
        try {
            let fileContent = await this.#readMyFile();
            if (fileContent[0].id) {
                let lastId = await fileContent.at(-1).id;
                return lastId;
            } else {
                return Number(0);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getById(num) {
        try {
            let contentSelected;
            let fileContent = await this.#readMyFile();
            await fileContent.forEach((content) => {
                if (content.id === num) contentSelected = content;
            });
            return contentSelected
                ? {
                      status: 'SUCCESS',
                      response: `Item with the id ${num}`,
                      element: contentSelected,
                  }
                : {
                      status: 'WARNING',
                      response: `There is no item with the id ${num}`,
                  };
        } catch (error) {
            console.log(error);
            return { status: 'ERROR', response: error };
        }
    }

    async getAll() {
        try {
            let fileContent = await this.#readMyFile();
            return fileContent;
        } catch (error) {
            console.log(error);
            return { status: 'ERROR', response: error };
        }
    }

    async editById(num, obj) {
        try {
            let contentSelected;
            let fileContent = await this.#readMyFile();
            await fileContent.forEach((content) => {
                if (content.id === num) contentSelected = content;
            });
            if (contentSelected) {
                let indexOfProductSelected =
                    fileContent.indexOf(contentSelected);

                for (const property in obj) {
                    if (
                        fileContent[indexOfProductSelected].hasOwnProperty(
                            property
                        )
                    ) {
                        fileContent[indexOfProductSelected][property] =
                            obj[property];
                    }
                }

                await fs.promises.writeFile(
                    this.fileRoute,
                    JSON.stringify(fileContent, null, '\t')
                );
                return {
                    status: 'SUCCESS',
                    response: `You edited the element under the id : ${num}`,
                };
            } else {
                return {
                    status: 'WARNING',
                    response: `The element with id : ${num} could not be edited because it was not in the file`,
                };
            }
        } catch (error) {
            console.log(error);
            return { status: 'ERROR', response: error };
        }
    }

    async addToElement(num, obj) {
        try {
            let contentSelected;
            let fileContent = await this.#readMyFile();
            await fileContent.forEach((content) => {
                if (content.id === num) contentSelected = content;
            });
            if (contentSelected) {
                let indexOfElementSelected =
                    fileContent.indexOf(contentSelected);

                for (const property in obj) {
                    fileContent[indexOfElementSelected][property] =
                        obj[property];
                }

                await fs.promises.writeFile(
                    this.fileRoute,
                    JSON.stringify(fileContent, null, '\t')
                );
                return {
                    status: 'SUCCESS',
                    response: `You edited the element under the id : ${num}`,
                };
            } else {
                return {
                    status: 'WARNING',
                    response: `The element with id : ${num} could not be edited because it was not in the file`,
                };
            }
        } catch (error) {
            console.log(error);
            return { status: 'ERROR', response: error };
        }
    }

    async deleteById(num) {
        try {
            let contentSelected;
            let fileContent = await this.#readMyFile();
            await fileContent.forEach((content) => {
                if (content.id === num) contentSelected = content;
            });
            if (contentSelected) {
                await fileContent.splice(
                    fileContent.indexOf(contentSelected),
                    1
                );
                await fs.promises.writeFile(
                    this.fileRoute,
                    JSON.stringify(fileContent, null, '\t')
                );
                return {
                    status: 'SUCCESS',
                    response: `You deleted the element under the id : ${num}`,
                };
            } else {
                return {
                    status: 'WARNING',
                    response: `The element with id : ${num} could not be deleted because it was not in the file`,
                };
            }
        } catch (error) {
            console.log(error);
            return { status: 'ERROR', response: error };
        }
    }

    async deleteByIdProduct(numCart, numProd) {
        try {
            let contentSelected;
            let cartSelected;
            let indexOfCartSelected;
            let fileContent = await this.#readMyFile();

            await fileContent.forEach((content) => {
                if (content.id === numCart) contentSelected = content;
            });
            if (contentSelected && contentSelected.products) {
                cartSelected = contentSelected;

                indexOfCartSelected = fileContent.indexOf(contentSelected);

                await contentSelected.products.forEach((prods) => {
                    if (prods.id === numProd) contentSelected = prods;
                });

                await fileContent[indexOfCartSelected].products.splice(
                    fileContent[indexOfCartSelected].products.indexOf(
                        contentSelected
                    ),
                    1
                );
                await fs.promises.writeFile(
                    this.fileRoute,
                    JSON.stringify(fileContent, null, '\t')
                );
                return {
                    status: 'SUCCESS',
                    response: `You deleted the element under the id : ${numProd}`,
                };
            } else {
                return {
                    status: 'WARNING',
                    response: `The element with id : ${numProd} could not be deleted because it was not in the file`,
                };
            }
        } catch (error) {
            console.log(error);
            return { status: 'ERROR', response: error };
        }
    }

    async deleteAll() {
        try {
            if (fs.existsSync(this.fileRoute)) {
                await fs.promises.unlink(this.fileRoute);
                return { status: 'SUCCESS', response: 'File was deleted' };
            } else {
                return { status: 'WARNING', response: 'File does not exist' };
            }
        } catch (error) {
            console.log(error);
            return { status: 'ERROR', response: error };
        }
    }
}

export { Contenedor };
