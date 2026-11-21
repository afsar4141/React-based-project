const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const formatPrice = (value) => currency.format(Number(value) || 0);

export const cartTotal = (cart = []) =>
    cart.reduce((sum, ci) => sum + Number(ci.product.price) * ci.quantity, 0);

export const cartCount = (cart = []) =>
    cart.reduce((sum, ci) => sum + ci.quantity, 0);

export const formatDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
