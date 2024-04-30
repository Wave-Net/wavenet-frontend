export const packet = {
    getProductsData() {
        return [
            {
                id: '0',
                number: '0',
                time: '2024-04-30',
                source: '1.1.1.1',
                destination: '255.255.255.255',
                proto: 'mqtt',
                len: '25',
                info: '',
            },
            {
                id: '1',
                number: '1',
                time: '2024-04-30',
                source: '1.1.1.1',
                destination: '255.255.255.255',
                proto: 'mqtt',
                len: '25',
                info: '',
            },
            {
                id: '2',
                number: '2',
                time: '2024-04-30',
                source: '1.1.1.1',
                destination: '255.255.255.255',
                proto: 'mqtt',
                len: '25',
                info: '',
            },
            {
                id: '3',
                number: '3',
                time: '2024-04-30',
                source: '1.1.1.1',
                destination: '255.255.255.255',
                proto: 'mqtt',
                len: '25',
                info: '',
            },
            {
                id: '4',
                number: '4',
                time: '2024-04-30',
                source: '1.1.1.1',
                destination: '255.255.255.255',
                proto: 'mqtt',
                len: '25',
                info: '',
            },
            {
                id: '5',
                number: '5',
                time: '2024-04-30',
                source: '1.1.1.1',
                destination: '255.255.255.255',
                proto: 'mqtt',
                len: '25',
                info: '',
            },            {
                id: '6',
                number: '6',
                time: '2024-04-30',
                source: '1.1.1.1',
                destination: '255.255.255.255',
                proto: 'mqtt',
                len: '25',
                info: '',
            },
        ];
    },


    getProductsMini() {
        return Promise.resolve(this.getProductsData());
    }

    // getProductsSmall() {
    //     return Promise.resolve(this.getProductsData().slice(0, 10));
    // },

    // getProducts() {
    //     return Promise.resolve(this.getProductsData());
    // },

    // getProductsWithOrdersSmall() {
    //     return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    // },

    // getProductsWithOrders() {
    //     return Promise.resolve(this.getProductsWithOrdersData());
    // }
};