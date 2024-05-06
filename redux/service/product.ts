import { ecommerceApi } from "../api";

export const productApi = ecommerceApi.injectEndpoints({
	endpoints: (builder) => ({
		// get all products
		//                        <result type,         args type>
		getProducts: builder.query<any, { page: number; pageSize: number }>({
			query: ({ page = 1, pageSize = 10 }) =>
				`api/products/?page=${page}&page_size=${pageSize}`,
		}),
		// get single product
		getProductById: builder.query<any, number>({
			query: (id) => `api/products/${id}/`,
		}),
		getLazyProductById: builder.query<any, number>({
			query: (id) => `api/products/${id}/`,
		}),
		//get my peoducts only
		getMyProducts: builder.query<any, { page: number; pageSize: number }>({
			query: ({ page = 1, pageSize = 10 }) => `api/products/my_products/?page=${page}&page_size=${pageSize}`,
		}),

		createProduct: builder.mutation<any, { newProduct: object }>({
			query: ({ newProduct }) => ({
				url: "api/products/",
				method: "POST",
				body: newProduct,
			}),
		}),

		// page.tsx a product
		updateProduct: builder.mutation<
			any,
			{ id: number; updatedProduct: object }
		>({
			query: ({ id, updatedProduct }) => ({
				url: `api/products/${id}/`,
				method: 'PATCH',
				body: updatedProduct,
			}),
		}),
		// delete a product
		deleteProduct: builder.mutation<any, { id: number }>({
			query: ({ id }) => ({
				url: `api/products/${id}/`,
				method: 'DELETE',
			}),
		}),

	})
})

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useUpdateProductMutation,
	useGetMyProductsQuery,
	useCreateProductMutation,
	useLazyGetProductByIdQuery,
	useDeleteProductMutation,
} = productApi;