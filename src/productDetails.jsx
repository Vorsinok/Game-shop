import React, { useEffect, useState } from 'react';
import Api from './services/commersApiService';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductDetails({ productId, onBack }) {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const api = Api();
                const response = await api.Product.GetProduct(productId); 
                if (response) {
                    setProduct(response);
                } else {
                    throw new Error('Товар не найден');
                }
            } catch (err) {
                setError('Ошибка при загрузке данных');
                console.error(err);
            }
        };
    
        if (productId) {
            fetchProduct(); 
        }
    }, [productId]); 
    
    //
    const handleAddToCart = async () => {
        try {
            const api = Api();
            await api.post('/cart/add', { productId });
            //проверка отправки
            alert('Товар добавлен в корзину!');
        } catch (error) {
            console.error('Ошибка при добавлении в корзину:', error);
            //проверка отправки
            alert('Ошибка при добавлении в корзину.');
        }
    };


    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!product) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="product-details">
            <h1 className="product-details-name">{product?.productName}</h1>
            <div className="product-details-main">
                <div className="product-details-imgContainer">
                    {product?.productMedia?.length > 0 && (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            loop={true}
                            className="product-slider"
                        >
                            {product.productMedia.map((media, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={media.src}
                                        alt={media.alt || "Product image"}
                                        className="product-image"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
                <div className="product-details-txtContainer">
                    <p>{product?.shortDescription}</p>

                    {product?.developer?.length > 0 && (
                        <p>Разработчик: {product.developer.map(dev => dev.name).join(", ")}</p>
                    )}

                    {product?.publisher?.length > 0 && (
                        <p>Издатель: {product.publisher.map(pub => pub.name).join(", ")}</p>
                    )}

                    {product?.categories?.[0] && (
                        <p>Категория: {product.categories[0].tytle}</p>
                    )}

                    <p>Дата выпуска: {product?.releaseDate || "Неизвестно"}</p>

                </div>
            </div>
            <div className="product-details-containerPurchase">
                <h3>{product?.productName}</h3>
                <div className="product-details-containerPrice">
                    <p>{product.price[0].value} {product.price[0].currency}</p>
                    <button className="product-details-buttonBuy" onClick={handleAddToCart}>
                        До кошика
                    </button>

                </div>
            </div>
            <h1 className='product-details-configuration'>СИСТЕМНІ ВИМОГИ</h1>
            <div className="product-details-containerConfiguration">
                <div className="product-details-minimalConfiguration">
                    <p>МІНІМАЛЬНІ:</p>
                    <p>ОС: {product.configuration[0].minimal[0].OS}</p>
                    <p>Процесор: {product.configuration[0].minimal[0].CPU}</p>
                    <p>Оперативна пам’ять: {product.configuration[0].minimal[0].RAM}</p>
                    <p>Відеокарта: {product.configuration[0].minimal[0].GPU}</p>
                    <p>Місце на диску: {product.configuration[0].minimal[0].place}</p>
                </div>
                <div className="product-details-recommendedConfiguration">
                    <p>РЕКОМЕНДОВАНІ:</p>
                    <p>ОС: {product.configuration[0].recommended[0].OS}</p>
                    <p>Процесор: {product.configuration[0].recommended[0].CPU}</p>
                    <p>Оперативна пам’ять: {product.configuration[0].recommended[0].RAM}</p>
                    <p>Відеокарта: {product.configuration[0].recommended[0].GPU}</p>
                    <p>Місце на диску: {product.configuration[0].recommended[0].place}</p>
                </div>
            </div>
        </div>

    );
}

export default ProductDetails;
