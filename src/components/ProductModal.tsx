import React from 'react';
import { CatalogProduct } from '../types';

interface ProductModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-enter">
      <div className="bg-white rounded-2xl max-w-xs w-full overflow-hidden shadow-2xl border border-stone-100 flex flex-col">
        <div className="relative h-44 bg-slate-100">
          <img
            alt={product.title}
            className="w-full h-full object-cover"
            src={product.img}
          />
          <button
            aria-label="Cerrar modal"
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <span className="absolute bottom-2 left-2 bg-[#075E54] text-white px-2 py-0.5 rounded text-xs font-semibold">
            {product.tag}
          </span>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-base text-stone-900">
              {product.title}
            </h4>
            <span className="text-[#00685d] font-bold text-base">
              {product.price}
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-snug">
            {product.desc}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-500 font-medium">Stock en almacén:</span>
            <span className="font-bold text-[#006d2f] bg-green-50 px-2 py-0.5 rounded border border-green-200">
              {product.stock}
            </span>
          </div>

          <button
            className="mt-2 w-full py-2 bg-[#00685d] hover:bg-[#008376] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
          >
            Cerrar Detalle
          </button>
        </div>
      </div>
    </div>
  );
};
