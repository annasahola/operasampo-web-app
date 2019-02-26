export const endpoint = 'http://ldf.fi/mmm-cidoc/sparql';

export const countQuery = `
  SELECT (COUNT(DISTINCT ?id) as ?count)
  WHERE {
    <FILTER>
    ?id a <RDF_TYPE> .
  }
`;

export const facetResultSetQuery = `
  SELECT *
  WHERE {
    {
      SELECT DISTINCT ?id {
        <FILTER>
        ?id a <RDF_TYPE> .
        ?id <ORDER_BY_PREDICATE> ?orderBy .
      }
      ORDER BY (!BOUND(?orderBy)) <SORT_DIRECTION>(?orderBy)
      <PAGE>
    }
    FILTER(BOUND(?id))
    ?id skos:prefLabel ?prefLabel .
    <RESULT_SET_PROPERTIES>
  }
`;

export const facetValuesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?selected ?source ?parent ?lat ?long ?instanceCount {
    {
      {
        SELECT DISTINCT (count(DISTINCT ?instance) as ?instanceCount) ?id ?selected ?source ?lat ?long ?parent {
          {
            ?instance a <RDF_TYPE> .
            <FILTER>
            ?instance <PREDICATE> ?id .
            <FACET_VALUE_FILTER>
            <SELECTED_VALUES>
            BIND(COALESCE(?selected_, false) as ?selected)
            OPTIONAL { ?id dct:source ?source . }
            OPTIONAL { ?id gvp:broaderPreferred ?parent_ . }
            OPTIONAL {
              ?id wgs84:lat ?lat ;
                  wgs84:long ?long .
            }
            BIND(COALESCE(?parent_, '0') as ?parent)
          }
          <PARENTS>
        }
        GROUP BY ?id ?selected ?source ?lat ?long ?parent
      }
      FILTER(BOUND(?id))
      OPTIONAL { ?id skos:prefLabel ?prefLabel_ }
      BIND(COALESCE(STR(?prefLabel_), STR(?id)) AS ?prefLabel)
    }
    UNION
    {
      {
        SELECT DISTINCT (count(DISTINCT ?instance) as ?instanceCount) {
          ?instance a <RDF_TYPE> .
          <FILTER>
          FILTER NOT EXISTS {
            ?instance <PREDICATE> ?value .
          }
        }
      }
      BIND(IRI("http://ldf.fi/MISSING_VALUE") AS ?id)
      BIND("Unknown" AS ?prefLabel)
      BIND('0' as ?parent)
    }
  }
  <ORDER_BY>
`;