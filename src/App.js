import React, { useState, useEffect } from 'react';
import './App.css';
import ProductsList from './productsList';
import ProductDetails from './productDetails';
import ProductsCart from './productsCart';

function App() {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [content, setContent] = useState('shop');

    useEffect(() => {
        const shopButton = document.getElementById('shop-button');
        const cartButton = document.getElementById('personCart');

        const handleShopClick = () => {
            setContent('shop');
            setSelectedProductId(null);
        };

        const handleCartClick = () => {
            setContent('cart');
            setSelectedProductId(null);
        };

        if (shopButton) shopButton.addEventListener('click', handleShopClick);
        if (cartButton) cartButton.addEventListener('click', handleCartClick);

        return () => {
            if (shopButton) shopButton.removeEventListener('click', handleShopClick);
            if (cartButton) cartButton.removeEventListener('click', handleCartClick);
        };
    }, []);

    return (
        <div className="App">
            {content === 'cart' ? (
                <ProductsCart />
            ) : selectedProductId ? (
                <ProductDetails productId={selectedProductId} onBack={() => setSelectedProductId(null)} />
            ) : (
                <ProductsList onSelectProduct={setSelectedProductId} />
            )}
        </div>
    );
}

export default App;
