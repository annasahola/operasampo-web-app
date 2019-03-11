export const FETCH_PAGINATED_RESULTS = 'FETCH_PAGINATED_RESULTS';
export const FETCH_PAGINATED_RESULTS_FAILED = 'FETCH_PAGINATED_RESULTS_FAILED';
export const FETCH_RESULTS = 'FETCH_RESULTS';
export const FETCH_RESULTS_FAILED = 'FETCH_RESULTS_FAILED';
export const UPDATE_PAGINATED_RESULTS = 'UPDATE_PAGINATED_RESULTS';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';
export const SORT_RESULTS = 'SORT_RESULTS';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const FETCH_BY_URI = 'FETCH_BY_URI';
export const FETCH_BY_URI_FAILED = 'FETCH_BY_URI_FAILED';
export const UPDATE_INSTANCE = 'UPDATE_INSTANCE';
export const FETCH_FACET = 'FETCH_FACET';
export const FETCH_FACET_FAILED = 'FETCH_FACET_FAILED';
export const UPDATE_FACET = 'UPDATE_FACET';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_SPATIAL_FILTER = 'UPDATE_SPATIAL_FILTER';
export const OPEN_MARKER_POPUP = 'OPEN_MARKER_POPUP';
export const SHOW_ERROR = 'SHOW_ERROR';

export const fetchPaginatedResults = (resultClass, facetClass, sortBy, variant) => ({
  type: FETCH_PAGINATED_RESULTS,
  resultClass, facetClass, sortBy, variant
});
export const fetchPaginatedResultsFailed = (resultClass, error, message) => ({
  type: FETCH_PAGINATED_RESULTS_FAILED,
  resultClass, error, message
});
export const fetchResults = ({ resultClass, facetClass, sortBy, variant }) => ({
  type: FETCH_RESULTS,
  resultClass, facetClass, sortBy, variant
});
export const fetchResultsFailed = (resultClass, error, message) => ({
  type: FETCH_RESULTS_FAILED,
  resultClass, error, message
});
export const updatePaginatedResults = ({ resultClass, data }) => ({
  type: UPDATE_PAGINATED_RESULTS,
  resultClass, data
});
export const updateResults = ({ resultClass, data }) => ({
  type: UPDATE_RESULTS,
  resultClass, data
});
export const sortResults = (resultClass, sortBy) => ({
  type: SORT_RESULTS,
  resultClass, sortBy
});
export const updatePage = (resultClass, page) => ({
  type: UPDATE_PAGE,
  resultClass, page
});
export const fetchByURI = (resultClass, facetClass, variant, uri) => ({
  type: FETCH_BY_URI,
  resultClass, facetClass, variant, uri
});
export const fetchByURIFailed = (resultClass, error, message) => ({
  type: FETCH_RESULTS_FAILED,
  resultClass, error, message
});
export const updateInstance = ({ resultClass, instance }) => ({
  type: UPDATE_INSTANCE,
  resultClass, instance
});
export const fetchFacet = (resultClass, id, sortBy, sortDirection) => ({
  type: FETCH_FACET,
  resultClass, id, sortBy, sortDirection
});
export const fetchFacetFailed = (resultClass, id, error, message) => ({
  type: FETCH_FACET_FAILED,
  resultClass, id, error, message
});
export const updateFacet = ({ resultClass, id, distinctValueCount, values, flatValues, sortBy, sortDirection }) => ({
  type: UPDATE_FACET,
  resultClass, id, distinctValueCount, values, flatValues, sortBy, sortDirection
});
export const updateFilter = ({ resultClass, property, value }) => ({
  type: UPDATE_FILTER,
  resultClass, property, value
});
export const updateSpatialFilter = ({ resultClass, property, filter }) => ({
  type: UPDATE_SPATIAL_FILTER,
  resultClass, property, filter
});
export const openMarkerPopup = uri => ({
  type: OPEN_MARKER_POPUP,
  uri
});
export const showError = message => ({
  type: SHOW_ERROR,
  message
});
