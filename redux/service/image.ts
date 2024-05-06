import { ecommerceApi } from "../api";

export const imageApi = ecommerceApi.injectEndpoints({
	endpoints: (builder) => ({

		//get all product image
		getImages: builder.query<any, { page: number; pageSize: number }>({
			query: ({ page = 1, pageSize = 10 }) =>
				`api/file/product/?page=${page}&page_size=${pageSize}`,
		}),

		getCategoryIcons: builder.query<any, { page: number; pageSize: number }>({
			query: ({ page = 1, pageSize = 10 }) =>
			  `/api/file/icon/?page=${page}&page_size=${pageSize}`,
		  }),

		uploadImage: builder.mutation<any, { data: object }>({
			query: ({ data }) => ({
				url: 'api/file/product/',
				method: 'POST',
				body: data,
			}),
		}),

		uploadCategoryIcon: builder.mutation<any, { data: object }>({
			query: ({ data }) => ({
				url: 'api/file/icon/',
				method: 'POST',
				body: data,
			}),
		}),

	})
})

export const {
	useGetImagesQuery,
	useUploadImageMutation,
	useUploadCategoryIconMutation,
	useGetCategoryIconsQuery,

} = imageApi;