const perspectiveID = 'producers'

export const producerProperties = `
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
      ?id scop:additionalInfo ?additionalInfo .
      FILTER(LANG(?additionalInfo) = 'fi')
    }
    UNION
    {
      ?id scop:editorNotes ?editorNotes .
    }
    UNION
    {
      ?id ^scop:producedBy ?producedPerformances__id .
      ?producedPerformances__id scop:composition ?composition__id .
      ?composition__id skos:prefLabel ?composition__prefLabel .
      OPTIONAL {
        ?producedPerformances__id scop:performanceDate ?pd .
      }
      BIND(CONCAT(?composition__prefLabel, " (", COALESCE(?pd, "esitysajankohta ei tiedossa"), ")") as ?producedPerformances__prefLabel)
      BIND(CONCAT("/performances/page/", REPLACE(STR(?producedPerformances__id), "^.*\\\\/(.+)", "$1")) AS ?producedPerformances__dataProviderUrl)
    }
`