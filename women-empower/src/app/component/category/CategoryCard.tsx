
import { Category } from "@/app/types/category";
interface CategoryCardProps {
  category: Category;
}
export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="flex-shrink-0 w-28 sm:w-32 md:w-36 bg-white rounded-xl transition duration-300 overflow-hidden cursor-pointer relative">
      <div className="relative w-full h-24 sm:h-28 md:h-32 overflow-hidden flex items-center justify-center">
        <img
          src="/images/tedee.png"
          alt={category.name}
          className="w-20 h-20 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-1 sm:p-1">
        <h3 className="font-medium text-gray-800 text-xs sm:text-sm text-center leading-tight min-h-[28px] flex items-center justify-center">
          {category.name}
        </h3>
      </div>
    </div>
  );
};
