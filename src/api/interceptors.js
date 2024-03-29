/*
Copyright 2022 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { get } from './comms';
import {
  getQueryParams,
  getTektonAPI,
  triggersAPIGroup,
  useCollection,
  useResource
} from './utils';

function getInterceptorsAPI({ filters, isWebSocket, name, namespace }) {
  return getTektonAPI(
    'interceptors',
    { group: triggersAPIGroup, isWebSocket, namespace, version: 'v1alpha1' },
    getQueryParams({ filters, name })
  );
}

export function getInterceptors({ filters = [], namespace } = {}) {
  const uri = getInterceptorsAPI({ filters, namespace });
  return get(uri);
}

export function getInterceptor({ name, namespace }) {
  const uri = getTektonAPI('interceptors', {
    group: triggersAPIGroup,
    name,
    namespace,
    version: 'v1alpha1'
  });
  return get(uri);
}

export function useInterceptors(params) {
  const webSocketURL = getInterceptorsAPI({ ...params, isWebSocket: true });
  return useCollection({
    api: getInterceptors,
    kind: 'Interceptor',
    params,
    webSocketURL
  });
}

export function useInterceptor(params) {
  const webSocketURL = getInterceptorsAPI({ ...params, isWebSocket: true });
  return useResource({
    api: getInterceptor,
    kind: 'Interceptor',
    params,
    webSocketURL
  });
}
