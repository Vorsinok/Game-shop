import React, { useEffect, useState } from 'react';
import Api from './services/commersApiService';

function ProductsList({ onSelectProduct }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const api = Api();
                const response = api.Product.GetProducts(); // mock-данные
                if (response && Array.isArray(response.productItems)) {
                    setProducts(response.productItems);
                } else {
                    throw new Error('Неправильный формат данных');
                }
            } catch (err) {
                setError('Ошибка при загрузке данных');
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <h1 className='main-title'>Список продуктов</h1>
            <div className="products-list">
                {products.map((product) => (
                    <div key={product.Id} className="product-item">
                        <div className="product-item-visible" onClick={() => onSelectProduct(product.Id)}>
                            <img
                                src={product.previewProductMedia[0]?.src}
                                alt={product.previewProductMedia[0]?.alt || 'Product image'}
                                style={{ width: '400px', height: 'auto' }}
                            />
                            <div className="product-list-mainInformation">
                                <p className='product-list-gameName'>{product.productName}</p>
                                <p className='product-list-price'>
                                    {product.price[0].value} {product.price[0].currency}
                                </p>
                            </div>
                        </div>
                        <div className="product-item-hidden">
                            <img
                                src={product.previewProductMedia[0]?.src}
                                alt={product.previewProductMedia[0]?.alt || 'Product image'}
                                style={{ width: '200px', height: 'auto' }}
                            />
                            <p>{product.shortDescription}</p>
                            <p>Дата выпуска: {product.releaseDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsList;
