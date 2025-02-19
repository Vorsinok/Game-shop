import React, { useState, useEffect } from 'react';
import './App.css';
import ProductsList from './productsList';
import ProductDetails from './productDetails';

function App() {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showShop, setShowShop] = useState(true); 
    useEffect(() => {
        const shopButton = document.getElementById('shop-button');
        if (shopButton) {
            shopButton.addEventListener('click', () => {
                setShowShop(true);
                setSelectedProductId(null); 
            });
        }
        return () => {
            if (shopButton) {
                shopButton.removeEventListener('click', () => setShowShop(true));
            }
        };
    }, []);

    return (
        <div className="App">
            {selectedProductId ? (
                <ProductDetails productId={selectedProductId} onBack={() => setSelectedProductId(null)} />
            ) : (
                <ProductsList onSelectProduct={setSelectedProductId} />
            )}
        </div>
    );
}

export default App;
