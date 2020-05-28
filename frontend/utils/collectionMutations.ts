import { queryCache, MutationOptions, AnyQueryKey } from "react-query"
import { AxiosResponse } from "axios"
import update from 'immutability-helper';
import findIndex from "lodash/findIndex";

export function createItemMutation<T, K>(
  queryKey: string | AnyQueryKey,
  fullQueryKey: string | AnyQueryKey,
  formatter?: (input: K) => T
): MutationOptions<AxiosResponse<T> | undefined, K> {

  return {
    onMutate: item => {
      const newItem = formatter ? formatter(item): item
      queryCache.cancelQueries(queryKey || '')

      const previousValue = queryCache.getQueryData(fullQueryKey)

      queryCache.setQueryData(
        queryKey || '',
        (old?: T[]) => [...(old || []), (newItem as T)]
      )
      return previousValue
    },
    // On failure, roll back to the previous items list
    onError: (err, variables, previousValue) => {
      console.error("An error happened !", { err, variables, previousValue });
      return queryCache.setQueryData(queryKey || '', previousValue)
    },
    onSuccess: () => {
      console.log("Item created");
    },
    // After success or failure, refetch the collection
    onSettled: () => queryCache.refetchQueries(queryKey || ''),
  }
}

export function updateItemMutation<T extends DbEntry>(
  queryKey: string | AnyQueryKey,
  fullQueryKey: string | AnyQueryKey,
): MutationOptions<AxiosResponse<T> | undefined, T> {

  return {
    onMutate: item => {
      queryCache.cancelQueries(queryKey || '')
      const previousValue = queryCache.getQueryData(fullQueryKey)
      queryCache.setQueryData(
        queryKey || '',
        (old?: T[] | undefined) => {
          const index = findIndex(old, ['id', item.id])
          if (!old || !index) {
            return old || []
          }
          return update(
            old,
            {
              [index]: { $merge: item }
            } as any // WTF ?
          )
        }
      )
      return previousValue
    },
    // On failure, roll back to the previous items list
    onError: (err, variables, previousValue) => {
      console.error("An error happened !", { err, variables, previousValue });
      return queryCache.setQueryData(queryKey || '', previousValue)
    },
    onSuccess: () => {
      console.log("Item updated");
    },
    // After success or failure, refetch the collection
    onSettled: () => queryCache.refetchQueries(queryKey || ''),
  }
}

export function destroyItemMutation<T extends DbEntry>(
{ queryKey, fullQueryKey }: { queryKey: string | AnyQueryKey; fullQueryKey: string | AnyQueryKey; },
): MutationOptions<AxiosResponse<T> | undefined, T> {

  return {
    onMutate: toDelete => {
      queryCache.cancelQueries(queryKey || '')
      const previousValue = queryCache.getQueryData(fullQueryKey)
      queryCache.setQueryData(
        queryKey || '',
        (old?: T[]) => old?.filter(e => e.id !== toDelete.id) || old || []
      )
      return previousValue
    },
    // On failure, roll back to the previous items list
    onError: (err, variables, previousValue) => {
      console.error("An error happened !", { err, variables, previousValue });
      return queryCache.setQueryData(queryKey || '', previousValue)
    },
    onSuccess: () => {
      console.log("Item deleted");
    },
    // After success or failure, refetch the collection
    onSettled: () => queryCache.refetchQueries(queryKey || ''),
  }
}