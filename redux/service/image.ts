import { ecommerceApi } from "../api";

export const imageApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        
		//get all product image
		getImages: builder.query<any, { page: number; pageSize: number }>({
			query: ({ page = 1, pageSize = 10 }) =>
				`api/file/product/?page=${page}&page_size=${pageSize}`,
		}),
		// // get single product
		// getProductById: builder.query<any, number>({
		// 	query: (id) => `api/products/${id}/`,
		// }),

		// //get my peoducts only
		// getMyProducts: builder.query<any , { page: number; pageSize: number }>({
		// 	query: ({ page = 1, pageSize = 10 }) => `api/products/my_products/?page=${page}&page_size=${pageSize}`,
		// }),
		// // update a product
		// updateProduct: builder.mutation<
		// 	any,
		// 	{ id: number; updatedProduct: object; }
		// >({
		// 	query: ({ id, updatedProduct }) => ({
		// 		url: `/api/products/${id}/`,
		// 		method: "PATCH",
		// 		body: updatedProduct,
		// 	}),
		// }),
		// createProduct: builder.mutation<any, { newProduct: object}>({
        //     query: ({ newProduct}) => ({
        //         url: "/api/products/",
        //         method: "POST",
        //         body: newProduct,
        //     }),
        // }),

	})
})

export const {
	useGetImagesQuery

} = imageApi;