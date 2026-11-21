import InfiniteScroll from "react-infinite-scroll-component";
import LoadingProduct from "../components/LoadingProduct";
import ProductTemplate from "../components/ProductTemplate";
import useProductFilters from "../utils/useProductFilters";

const controlClass = "border rounded px-3 py-2 bg-white";

const Products = () => {
    const {
        loading,
        categories,
        total,
        visibleProducts,
        hasMore,
        loadMore,
        search,
        category,
        sort,
        setSearch,
        setCategory,
        setSort,
    } = useProductFilters();

    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-3">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className={`${controlClass} flex-1 min-w-[200px]`}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`${controlClass} capitalize`}
                >
                    <option value="all">All categories</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={controlClass}
                >
                    <option value="default">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="title">Name: A to Z</option>
                </select>
            </div>

            {!loading && (
                <p className="mb-5 text-sm text-gray-500">
                    {total} product{total === 1 ? "" : "s"}
                </p>
            )}

            {loading ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                        <LoadingProduct key={i} />
                    ))}
                </div>
            ) : total === 0 ? (
                <p className="p-5 text-center">
                    No products match your search.
                </p>
            ) : (
                <>
                    <InfiniteScroll
                        dataLength={visibleProducts.length}
                        next={loadMore}
                        hasMore={hasMore}
                        loader={<h4 className="text-center">Loading...</h4>}
                        endMessage={
                            <p className="text-center mt-5">
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleProducts.map((p) => (
                                <ProductTemplate key={p.id} p={p} />
                            ))}
                        </div>
                    </InfiniteScroll>
                    {/* Fallback: on tall screens the page may not scroll at all */}
                    {hasMore && (
                        <div className="text-center mt-5">
                            <button
                                onClick={loadMore}
                                className="border rounded px-4 py-2 cursor-pointer"
                            >
                                Load more
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Products;
