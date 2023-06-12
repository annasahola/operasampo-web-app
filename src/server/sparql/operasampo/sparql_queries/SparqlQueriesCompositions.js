const perspectiveID = 'compositions'

export const compositionProperties = `
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id scop:additionalTitle ?additionalTitle__id .
      BIND(?additionalTitle__id AS ?additionalTitle__prefLabel)
    }
    UNION
    {
      ?id scop:originalTitle ?originalTitle .
    }
    UNION
    {
      ?id scop:originalWork ?originalWork .
    }
    UNION
    {
      ?id scop:composedBy ?composer__id .
      ?composer__id skos:prefLabel ?composer__prefLabel .
      BIND(CONCAT("/people/page/", REPLACE(STR(?composer__id), "^.*\\\\/(.+)", "$1")) AS ?composer__dataProviderUrl)
    }
    UNION
    {
      ?id scop:language ?language .
    }
    UNION
    {
      ?id scop:libretist ?libretist__id .
      ?libretist__id skos:prefLabel ?libretist__prefLabel .
      BIND(CONCAT("/people/page/", REPLACE(STR(?libretist__id), "^.*\\\\/(.+)", "$1")) AS ?libretist__dataProviderUrl)
    }
    UNION
    {
      ?id scop:composed ?composed .
    }
    UNION
    {
      ?id scop:published ?published .
    }
    UNION
    {
      ?id scop:publishedDate ?publishedDate .
    }
    UNION
    {
      ?id scop:opus ?opus .
    }
    UNION
    {
      ?id scop:catalogue ?catalogue .
    }
    UNION
    {
      ?id ^scop:composition ?performance__id ;
          skos:prefLabel ?label .
      FILTER(LANG(?label) = 'fi')
      ?performance__id a scop:Performance .
      OPTIONAL {
        ?performance__id skos:prefLabel ?p_name .
      }
      OPTIONAL {
        ?performance__id scop:performanceDateStart ?pd .
        BIND(STR(?pd) as ?pd_label)
      }
      BIND(CONCAT(?label, " (", COALESCE(?pd_label, "esitysajankohta ei tiedossa"), ")") as ?backup_label)
      BIND(COALESCE(?p_name, ?backup_label) as ?performance__prefLabel)
      BIND(CONCAT("/performances/page/", REPLACE(STR(?performance__id), "^.*\\\\/(.+)", "$1")) AS ?performance__dataProviderUrl)
    }
    UNION
    {
      ?id scop:additionalInfo ?additionalInfo .
      FILTER(LANG(?additionalInfo) = 'fi')
    }
    UNION
    {
      ?id ^scop:composition ?role__id .
      ?role__id a scop:Role ;
                skos:prefLabel ?role__prefLabel .
      FILTER(LANG(?role__prefLabel) = 'fi')
      BIND(CONCAT("/roles/page/", REPLACE(STR(?role__id), "^.*\\\\/(.+)", "$1")) AS ?role__dataProviderUrl)
    }
    UNION
    {
      ?id scop:editorNotes ?editorNotes .
    }
`

export const compositionsByComposerQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?composition) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?composition a scop:Composition ;
                  scop:composedBy ?category .
      ?category skos:prefLabel ?prefLabel .
    }
    UNION
    {
      ?composition a scop:Composition .
      FILTER NOT EXISTS {
        ?composition scop:composedBy [] .
      }
      BIND("Tuntematon" as ?category)
      BIND("Tuntematon" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const compositionsByLibretistQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?composition) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?composition a scop:Composition ;
                  scop:libretist ?category .
      ?category skos:prefLabel ?prefLabel .
    }
    UNION
    {
      ?composition a scop:Composition .
      FILTER NOT EXISTS {
        ?composition scop:libretist [] .
      }
      BIND("Tuntematon" as ?category)
      BIND("Tuntematon" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const performancePlacesInstancePageQuery = `
  SELECT DISTINCT ?id ?esityspaikka__label (xsd:date(?_date) AS ?date) (year(xsd:date(?_date)) AS ?year) ?type 
  WHERE {
    VALUES ?id { <ID> }
    ?performance a scop:Performance ;
                scop:composition ?id .
    ?performance scop:performanceDateStart ?_date ;
                scop:performedIn ?place .
    ?place skos:prefLabel ?esityspaikka__label .
    BIND("esityspaikka" AS ?type)
  }
`

export const performancesPerformedInstancePageQuery = `
  SELECT DISTINCT (STR(?year) AS ?category) (COUNT(DISTINCT ?performance) AS ?performanceCount)
  WHERE {
    VALUES ?id { <ID> }
    ?performance a scop:Performance ;
                scop:composition ?id .
    ?performance scop:performanceDateStart ?_date ;
                scop:performedIn ?place .
    BIND(YEAR(?_date) AS ?year)
  }
  GROUP BY ?year ORDER BY ?year
`

export const compositionVenuesQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?performance) as ?instanceCount)
  WHERE {
    BIND(<ID> as ?composition)
    ?composition a scop:Composition .
    ?performance a scop:Performance ;
                scop:composition ?composition ;
                scop:performedIn ?category .
    OPTIONAL {
      ?category skos:prefLabel ?prefLabel_ .
    }
    BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`