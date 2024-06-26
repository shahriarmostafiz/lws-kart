import React from 'react';
import ProductCard from './ProductCard';
import { getTrendingProducts } from '@/db/queries';

const TrendingProducts = async ({ lang, dictionary }) => {

    const trendingProducts = await getTrendingProducts()
    // console.log(trendingProducts);
    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                {dictionary?.trendingProducts}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {
                    trendingProducts?.map(product => <ProductCard product={product} key={product?.id} lang={lang} dictionary={dictionary} />)
                }
            </div>
        </div>

    );
};

export default TrendingProducts;