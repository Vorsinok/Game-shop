/**
 * API Service constructor.
 * @param {string} baseUrl - Base URL for the API.
 * @returns {object} - Object containing HTTP methods.
 */
function apiService(baseUrl) {
    /**
     * Perform a GET request.
     * @param {string} path - API path.
     * @param {object} [params={}] - Query parameters as key-value pairs.
     * @returns {Promise<void>}
     */
    async function get(path, params = {}) {
        try {
            const url = new URL(baseUrl + path);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            document.getElementById('output').textContent = data.message;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    /**
     * Perform a POST request.
     * @param {string} path - API path.
     * @param {object} newData - Data to send in the request body.
     * @returns {Promise<void>}
     */
    async function post(path, newData) {
        try {
            const response = await fetch(baseUrl + path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            document.getElementById('output').textContent = data.message;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    /**
     * Perform a PUT request.
     * @param {string} path - API path.
     * @param {object} updatedData - Data to update in the request body.
     * @returns {Promise<void>}
     */
    async function put(path, updatedData) {
        try {
            const response = await fetch(baseUrl + path, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            document.getElementById('output').textContent = data.message;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    return { get, post, put };
}

/**
 * API object with predefined controllers and methods.
 * @returns {object}
 */
function Api() {
    const baseUrl = window.env.CMS_DOMAIN;
    const api = apiService(baseUrl);

    /**
     * Product controller.
     */
    const Product = {
        ControllerUrl: `/products`,

        /**
         * Get a specific product.
         * @param productId - Product ID (only 1, 2, or 3 are allowed).
         * @returns {object} - Product details.
         */
        GetProduct: function (productId) {
            const action = "/products";
            return {
                Id: 1,
                productName: "Black Myth: Wukong",
                productMedia: [
                    {
                        type: "image", //allowed type: image, video  
                        src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg?t=1734426465",
                        alt: "wukong",
                    }
                ],
                shortDescription: "Black Myth: Wukong — ролевой боевик по мотивам китайской мифологии. Став Избранным, вы отправитесь в приключение, полное испытаний и чудес, в котором вам предстоит приподнять завесу тайны над великой легендой.",
                releaseDate: "20 авг. 2024 г.",
                developer: [{
                    id: 1,
                    name: "Game Science",
                }],
                publisher: [{
                    id: 1,
                    name: "Game Science",
                }],
                categories: [
                    {
                        id: 1,
                        tytle: "Мифология",
                    }
                ],
                price: [
                    {
                        culture: "eu",
                        value: 2.1,
                        currency: "EUR",
                    }
                ],
                configuration: [
                    {
                        minimal: [
                            {
                                OS: "Windows 10 64-bit",
                                CPU: "Intel Core i5-8400 / AMD Ryzen 5 1600",
                                RAM: "16 GB ОЗУ",
                                GPU: "NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB",
                                place: "130 GB",
                            }
                        ],
                        recommended: [
                            {
                                OS: "Windows 10 64-bit",
                                CPU: "Intel Core i7-9700 / AMD Ryzen 5 5500",
                                RAM: "16 GB ОЗУ",
                                GPU: "NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700 XT / INTEL Arc A750",
                                place: "130 GB",
                            }
                        ]
                    }
                ]
            };
        },

        /**
         * Get all products.
         * @returns {void}
         */
        GetProducts: function () {
            const action = "/products";
            return {
                productItems: [{
                    Id: 1,
                    productName: "Black Myth: Wukong",
                    previewProductMedia: [
                        {
                            type: "image", //allowed type: image, video  
                            src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg?t=1734426465",
                            alt: "wukong",
                        }
                    ],
                    shortDescription: "Black Myth: Wukong — ролевой боевик по мотивам китайской мифологии. Став Избранным,",
                    releaseDate: "20 авг. 2024 г.",
                    categories: [
                        {
                            id: 1,
                            tytle: "",
                        }
                    ],
                    price: [
                        {
                            culture: "eu",
                            value: 2.1,
                            currency: "EUR",
                        }
                    ]
                }]

            }

            //return api.get(this.ControllerUrl + action, {});
        },

        /**
         * Get filtered products.
         * @returns {void}
         */
        GetFilteredProducts: function () {
            const action = "/filteredProducts";
            return {
                productItems: [{
                    Id: 1,
                    productName: "Tower",
                    previewProductMedia: [
                        {
                            type: "image", //allowed type: image, video  
                            src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg?t=1734426465",
                            alt: "wukong",
                        }
                    ],
                    shortDescription: "Black Myth: Wukong — ролевой боевик по мотивам китайской мифологии. Став Избранным,",
                    releaseDate: "20 авг. 2024 г.",
                    categories: [
                        {
                            id: 1,
                            tytle: "",
                        }
                    ],
                    price: [
                        {
                            culture: "eu",
                            value: 2.1,
                            currency: "EUR",
                        }
                    ]
                }]
            }
            //return api.get(this.ControllerUrl + action, {});
        },

        /**
         * Get cart products.
         * @returns {void}
         */

        GetCartProducts: function () {
            const action = "/cartProducts";
            return {
                productItems: [{
                    Id: 1,
                    productName: "Tower",
                    previewProductMedia: [
                        {
                            type: "image", //allowed type: image, video  
                            src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg?t=1734426465",
                            alt: "wukong",
                        }
                    ],
                }
                ]
            }
        },
        /**
        * Get person info.
        * @returns {void}
        */

        GetPersonInfo: function () {
            const action = "/person";
            return {
                personItems: [{
                    Id: 1,
                    personName: "Vorsinok",
                    personImg: [
                        {
                            type: "image", //allowed type: image, video  
                            src: "https://i.pinimg.com/736x/0e/d0/b1/0ed0b1aadf7a7d1ce8ced1aace20daea.jpg",
                            alt: "avatar",
                        }
                    ],
                    shortInfo: "hi!",
                }]
            }
        }

    };

    //post замокать обьект
    const Cart = {
        AddToCart: function () {
            //return api.post('/cart/add', { productId });
            const action = "/addToCart";
            return {
                productItems: [{
                    Id: 1,
                    productName: "Tower",
                    previewProductMedia: [
                        {
                            type: "image", //allowed type: image, video  
                            src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg?t=1734426465",
                            alt: "wukong",
                        }
                    ],
                }
                ]
            }
        }
    };


    /**
     * Category controller.
     */
    const Category = {
        ControllerUrl: `/category`,

        /**
         * Get a category.
         * @returns {void}
         */
        GetCategory: function () {
            const action = "/category";
            //return api.get(this.ControllerUrl + action, {});
            return {
                name: "ЛИДЕРЫ ПРОДАЖ",
                description: "Все продукты",
            }
        },
    };

    /**
     * Search controller.
     */
    const Search = {
        ControllerUrl: `/search`,

        /**
         * Perform a search and return results.
         * @returns {object} - Search results.
         */
        GetCategory: function () {
            const action = "/search";
            return {
                items: [
                    {
                        name: "somecategoryname",
                        img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg?t=1734426465",
                        id: 1,
                        type: "product or category",
                    },
                    {
                        name: "somesecondcategoryname",
                        img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg?t=1734426465",
                        id: 1,
                        type: "product or category",
                    }
                ]
            };
        },
    };

    return { Product, Category, Search, Cart };
}

export default Api;
