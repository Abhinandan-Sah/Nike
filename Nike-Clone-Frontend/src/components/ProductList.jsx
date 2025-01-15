import { useSelector } from "react-redux";
import { selectProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { indiaCurrency } from "../constants/services";

export default function ProductList() {
  const products = useSelector(selectProducts);
  return (
    <div className="bg-white  ">
      <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {products.map((product, index) => (
            <Link to={`/productOverview/${product.id}`}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 font-semibold ">
                {product.title}
              </h3>
              <h3 className="mt-2 text-sm text-gray-700  ">
                {product.detail && product.detail.slice(0, 25) + "..."}
              </h3>
              <h3 className="mt-2 text-sm text-gray-700  ">
                Color {product.colors && product.colors.length}
              </h3>

              <p className="mt-2 text-sm text-gray-700 font-semibold ">
                MRP : {indiaCurrency}
                {product.discountPrice}
              </p>
              <p className="mt-2 text-sm text-gray-700 font-semibold line-through ">
                MRP : {indiaCurrency}
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
