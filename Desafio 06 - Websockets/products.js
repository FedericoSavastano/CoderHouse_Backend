export const products = []

export const addProduct = (prod) => {
    if (!products.length) {
        products.push(Object.assign({}, prod, { id: 1 }));
    } else {
        products.push(
            Object.assign({}, prod, {
                id: products[products.length - 1].id + 1,
            })
        );
    } 
}
