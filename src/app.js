document.addEventListener('alpine:init', () => {
    Alpine.data('menu', () => ({
        items: [
            { id: 1, name: 'Chocolate Chip Cookie', img: '1.jpeg', price: 15000 },
            { id: 2, name: 'Cromboloni', img: '2.jpeg', price: 25000 },
            { id: 3, name: 'Strawberry Tart', img: '3.jpeg', price: 30000 },
            { id: 4, name: 'Croissant', img: '4.jpeg', price: 30000 },
            { id: 5, name: 'Tiramisu Cake', img: '5.jpeg', price: 23000 },
            { id: 6, name: 'Cheese Cake', img: '6.jpeg', price: 280000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem)  {
            this.items.push(newItem);
            this.quantity++;
            this.total += newItem.price;
            console.log(this.items);
        },
    });
});

// konversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, 
    }).format(number);
};