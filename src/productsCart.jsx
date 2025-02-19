import React, { useEffect, useState } from 'react';
import Api from './services/commersApiService';

function ProductsCart({ onSelectProduct }) {
    const [products, setProducts] = useState([]);
    const [person, setPerson] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const api = Api();

            // Получаем товары
            const productResponse = api.Product.GetCartProducts();
            if (productResponse && Array.isArray(productResponse.productItems)) {
                setProducts(productResponse.productItems);
            } else {
                throw new Error('Неправильный формат данных товаров');
            }

            const personResponse = api.Product.GetPersonInfo();
            if (personResponse && Array.isArray(personResponse.personItems)) {
                setPerson(personResponse.personItems[0]); 
            } else {
                throw new Error('Неправильный формат данных пользователя');
            }
        } catch (err) {
            setError('Ошибка при загрузке данных');
            console.error(err);
        }
    }, []);

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {person && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#333',
                    color: '#fff',
                    padding: '15px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    maxWidth: '300px'
                }}>
                    <img
                        src={person.personImg[0].src}
                        alt={person.personImg[0].alt}
                        style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '15px' }}
                    />
                    <div>
                        <h3 style={{ fontSize: '18px', margin: '0' }}>{person.personName}</h3>
                        <p style={{ fontSize: '14px', color: '#bbb' }}>{person.shortInfo}</p>
                    </div>
                </div>
            )}

            {/* Блок товаров */}
            {products.map((product) => (
                <div key={product.Id} className='cart-container-product'>
                    <img
                        src={product.previewProductMedia[0].src}
                        alt={product.previewProductMedia[0].alt}
                        style={{ width: '100%', borderRadius: '10px' }}
                    />
                    <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{product.productName}</h3>
                    <button className='cart-container-button'>
                        Завантажити
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductsCart;
