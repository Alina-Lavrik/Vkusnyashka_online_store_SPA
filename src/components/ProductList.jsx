import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

// Компонент списка товаров
const ProductList = () => {

    const products = useSelector(state => state.products.items);
        
        return (
            <div className="product_box">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        );
};
    
export default ProductList;