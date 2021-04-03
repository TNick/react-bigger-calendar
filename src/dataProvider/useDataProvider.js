import { useContext, useMemo } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { waitFor } from '../lib'

import DataProviderContext from './DataProviderContext'
import defaultDataProvider from './defaultDataProvider'
import {
  doQuery,
  getRemainingStackedCalls,
  stackCall,
  stackOptimisticCall
} from './performQuery'

/**
 * Hook for getting a dataProvider.
 *
 * Gets a dataProvider object, which behaves just like the real dataProvider
 * (same methods returning a Promise). But it's actually a Proxy object, which
 * dispatches Redux actions along the process. The benefit is that react-admin
 * tracks the loading state when using this hook, and stores results in the
 * Redux store for future use.
 *
 * In addition to the 2 usual parameters of the dataProvider methods (resource,
 * payload), the Proxy supports a third parameter for every call. It's an
 * object literal which may contain side effects, or make the action optimistic
 * (with mutationMode: optimistic) or undoable (with mutationMode: undoable).
 */
const useDataProvider = () => {
  // Redux hooks
  const dispatch = useDispatch()
  const store = useStore()

  // The data provider that the user handed at component creation time.
  const dataProvider = useContext(DataProviderContext) || defaultDataProvider

  // Optimistic mode can be triggered by a previous optimistic or undoable query
  const isOptimistic = useSelector((state) => state.admin.ui.optimistic)

  const dataProviderProxy = useMemo(() => {
    return new Proxy(dataProvider, {
      // We override the get method to intercept access to properties.
      get: (target, name) => {
        // Bail out quickly if this does not concerns us.
        if (typeof name === 'symbol') {
          return
        }

        // Get the original value and return it if it's not a function.
        const type = name.toString()
        const originalHandler = dataProvider[type]
        if (typeof originalHandler !== 'function') {
          return originalHandler
        }

        // We're just going to go ahead and assume that all methods invoked
        // through the proxy are retriever method. To access other properties
        // the user should keep a reference of the original data provider object.
        return (resource, payload, options) => {
          const {
            action = 'CUSTOM_FETCH',
            undoable = false,
            onSuccess = undefined,
            onFailure = undefined,
            mutationMode = undoable ? 'undoable' : 'pessimistic',
            enabled = true,
            ...rest
          } = options || {}

          // Validate the options.
          if (onSuccess && typeof onSuccess !== 'function') {
            throw new Error('The onSuccess option must be a function')
          }
          if (onFailure && typeof onFailure !== 'function') {
            throw new Error('The onFailure option must be a function')
          }
          if (mutationMode === 'undoable' && !onSuccess) {
            throw new Error(
              'You must pass an onSuccess callback calling notify() to use the undoable mode'
            )
          }
          if (typeof enabled !== 'boolean') {
            throw new Error('The enabled option must be a boolean')
          }

          if (enabled === false) {
            return Promise.resolve({})
          }

          // Compose the query arguments
          const params = {
            resource,
            type,
            payload,
            action,
            onFailure,
            onSuccess,
            rest,
            mutationMode,
            // these ones are passed down because of the rules of hooks
            dataProvider,
            store,
            dispatch
          }

          if (isOptimistic) {
            // When in optimistic mode, fetch calls aren't executed
            // right away. Instead, they are are stacked, to be
            // executed once the dataProvider leaves optimistic mode.
            // In the meantime, the admin uses data from the store.
            if (mutationMode === 'undoable' || mutationMode === 'optimistic') {
              // optimistic and undoable calls are added to a
              // specific stack, as they must be replayed first
              stackOptimisticCall(params)
            } else {
              // pessimistic calls are added to the regular stack
              // and will be replayed last
              stackCall(params)
            }
            // Return a Promise that only resolves when the optimistic call was made
            // otherwise hooks like useQueryWithStore will return loaded = true
            // before the content actually reaches the Redux store.
            // But as we can't determine when this particular query was finished,
            // the Promise resolves only when *all* optimistic queries are done.
            return waitFor(() => getRemainingStackedCalls() === 0)
          } else {
            return doQuery(params)
          }
        }
      }
    })
  }, [dataProvider, dispatch, isOptimistic, store])

  return dataProviderProxy
}
export default useDataProvider
