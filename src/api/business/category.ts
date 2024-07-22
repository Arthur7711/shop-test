import { API } from '../API'
import { type ICategoryItems } from '../models/categoryTypes'

export const getCategories = async (id: number) => {
  const { data } = await API.get<ICategoryItems>(`categories`, {
    params: {
      categoryIds: id,
      returnProductIds: true
    }
  })
  return data
}
