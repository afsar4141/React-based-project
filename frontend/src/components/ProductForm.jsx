import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FormField from "./FormField";

// One form for both "create" and "update" (they were copy-pasted before).
const ProductForm = ({
    defaultValues,
    onSubmit,
    submitLabel,
    buttonClass = "bg-red-400",
    children,
}) => {
    const { products } = useSelector((state) => state.productReducer);
    const categories = [...new Set(products.map((p) => p.category))];
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
            <FormField
                {...register("image", { required: "Image URL is required" })}
                type="url"
                placeholder="Product Image URL"
                error={errors.image}
            />
            <FormField
                {...register("title", {
                    required: "Title is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                })}
                type="text"
                placeholder="Product Title"
                error={errors.title}
            />
            <FormField
                {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: { value: 0.01, message: "Price must be above 0" },
                })}
                type="number"
                step="0.01"
                placeholder="0.00"
                error={errors.price}
            />
            <FormField
                {...register("category", { required: "Category is required" })}
                type="text"
                list="category-options"
                placeholder="Product Category"
                error={errors.category}
            />
            <datalist id="category-options">
                {categories.map((c) => (
                    <option key={c} value={c} />
                ))}
            </datalist>
            <FormField
                as="textarea"
                {...register("description", {
                    required: "Description is required",
                })}
                rows={4}
                placeholder="Product Description Here..."
                error={errors.description}
            />
            <button
                disabled={isSubmitting}
                className={`text-white rounded mt-5 text-3xl px-5 py-3 disabled:opacity-50 ${buttonClass}`}
            >
                {submitLabel}
            </button>
            {children}
        </form>
    );
};

export default ProductForm;
