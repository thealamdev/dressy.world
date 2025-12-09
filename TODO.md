<div className="grid grid-cols-1 gap-4 md:gap-6">
                    {products.map((product) => (
                        <label
                            key={product.id}
                            className="flex flex-col md:flex-row md:gap-4 items-start md:items-center p-4 border rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                checked={selectedProducts.includes(product.id)}
                                onChange={(e) => handleCheckboxChange(product, e.target.checked)}
                                className="w-6 h-6 accent-orange-500 mb-2 md:mb-0"
                            />

                            {/* Product Image */}
                            <Image
                                width={60}
                                height={60}
                                src={product.image_url}
                                alt={product.title}
                                className="mb-2 md:mb-0 rounded-lg object-cover"
                            />

                            {/* Product Info */}
                            <div className="flex-1 w-full">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-5.5">
                                        {product.title}
                                    </h3>

                                    {product.stock && (
                                        <span className="text-sm text-white bg-orange-500 px-3 py-1 rounded-full mt-2 md:mt-0 inline-block">
                                            {product.stock}
                                        </span>
                                    )}
                                </div>

                                <span className="text-orange-600 font-extrabold text-lg md:text-xl mt-1 md:mt-0 block">
                                    {BDTFormatter.format(product.price)}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>