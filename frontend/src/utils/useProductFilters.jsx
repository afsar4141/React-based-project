import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const PAGE_SIZE = 6;

const sorters = {
    default: null,
    "price-asc": (a, b) => Number(a.price) - Number(b.price),
    "price-desc": (a, b) => Number(b.price) - Number(a.price),
    title: (a, b) => a.title.localeCompare(b.title),
};

// Search + category filter + sort + "show more" windowing, all client-side.
const useProductFilters = () => {
    const { products, loading } = useSelector((state) => state.productReducer);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const categories = useMemo(
        () => [...new Set(products.map((p) => p.category))].sort(),
        [products]
    );

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        const list = products.filter(
            (p) =>
                (category === "all" || p.category === category) &&
                (!q ||
                    `${p.title} ${p.description} ${p.category}`
                        .toLowerCase()
                        .includes(q))
        );
        const sorter = sorters[sort];
        return sorter ? [...list].sort(sorter) : list;
    }, [products, search, category, sort]);

    // Any filter change should start again from the first page.
    const wrap = (setter) => (value) => {
        setter(value);
        setVisibleCount(PAGE_SIZE);
    };

    return {
        loading,
        categories,
        total: filtered.length,
        visibleProducts: filtered.slice(0, visibleCount),
        hasMore: visibleCount < filtered.length,
        loadMore: () => setVisibleCount((c) => c + PAGE_SIZE),
        search,
        category,
        sort,
        setSearch: wrap(setSearch),
        setCategory: wrap(setCategory),
        setSort: wrap(setSort),
    };
};

export default useProductFilters;
