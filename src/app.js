document.addEventListener('alpine:init', () => {
    Alpine.data('menu', () => ({
        items: [
            { id: 1, name: 'Chocolate Chip Cookie', img: '1.jpeg', price: 15000 },
            { id: 2, name: 'Cromboloni', img: '2.jpeg', price: 25000 },
            { id: 3, name: 'Strawberry Tart', img: '3.jpeg', price: 30000 },
            { id: 4, name: 'Croissant', img: '4.jpeg', price: 30000 },
            { id: 5, name: 'Tiramisu Cake', img: '5.jpeg', price: 23000 },
            { id: 6, name: 'Cheese Cake', img: '6.jpeg', price: 28000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem)  {
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            //jika belum ada / cart masih kosong
            if(!cartItem) {
            this.items.push({...newItem, quantity: 1, total: newItem.price});
            this.quantity++;
            this.total += newItem.price;   
            } else {
                // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                    //jika barang berbeda
                    if(item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barang sudah ada, tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;  
                    }
                });
            }

            console.log(this.total);
        },
        remove(id) {
            //ambil item yang mau diremove berdasarkan id nya
            const cartItem = this.items.find((item) => item.id === id);

            //jika item lebih dari 1
            if(cartItem.quantity > 1) {
                //telusuri 1 1
                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik
                    if(item.id !== id) {
                        return item;
                    }   else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
                //jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
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