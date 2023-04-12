const perspectiveID = 'people'

export const personProperties = `
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
      ?id foaf:firstName ?firstName .
    }
    UNION
    {
      ?id foaf:surname ?lastName .
    }
    UNION
    {
      ?id scop:role ?role .
    }
    UNION
    {
      ?id scop:nationality ?nationality .
    }
    UNION
    {
      ?id scop:language ?language .
    }
    UNION
    {
      ?id scop:dateOfBirth ?dateOfBirth .
    }
    UNION
    {
      ?id scop:placeOfBirth ?placeOfBirth .
    }
    UNION
    {
      ?id scop:dateOfDeath ?dateOfDeath .
    }
    UNION
    {
      ?id scop:placeOfDeath ?placeOfDeath .
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
      ?id ^scop:actor ?pr .
      ?pr a scop:PerformanceRole ;
                      scop:compositionRole ?roleCharacter__id .
      ?roleCharacter__id skos:prefLabel ?prefLabel_ ;
                        scop:composition ?composition .
      FILTER(LANG(?prefLabel_) = 'fi')
      ?composition skos:prefLabel ?comp_pref_fi .
      FILTER(LANG(?comp_pref_fi) = 'fi')
      BIND(COALESCE(?prefLabel_, ?roleCharacter__id) as ?rc_pref)
      BIND(CONCAT(?rc_pref, " (", ?comp_pref_fi, ")") as ?roleCharacter__prefLabel)
      BIND(CONCAT("/roles/page/", REPLACE(STR(?roleCharacter__id), "^.*\\\\/(.+)", "$1")) AS ?roleCharacter__dataProviderUrl)
    }
    UNION
    {
      ?performanceRole__performanceRoleId a scop:PerformanceRole ;
            scop:actor ?id ;
            scop:performance ?performanceRole__roleValues__id ;
            scop:compositionRole ?performanceRole__id .
      ?performanceRole__id scop:composition ?comp .
      ?comp skos:prefLabel ?compLabel .
      OPTIONAL {
        ?performanceRole__roleValues__id skos:prefLabel ?performanceLabel .
      }
      OPTIONAL {
        ?performanceRole__roleValues__id scop:performanceDate ?pd .
        ?pd skos:prefLabel ?pdLabel .
      }
      BIND(CONCAT(?compLabel, " (", COALESCE(?pdLabel, "esitysajankohta ei tiedossa"), ")") as ?backupLabel)
      BIND(COALESCE(?performanceLabel, ?backupLabel) as ?performanceRole__roleValues__prefLabel)
      BIND(CONCAT("/performances/page/", REPLACE(STR(?performanceRole__roleValues__id), "^.*\\\\/(.+)", "$1")) AS ?performanceRole__roleValues__dataProviderUrl)
      ?performanceRole__id skos:prefLabel ?performanceRole__prefLabel .
      FILTER(LANG(?performanceRole__prefLabel) = 'fi')
      BIND(CONCAT("/roles/page/", REPLACE(STR(?performanceRole__id), "^.*\\\\/(.+)", "$1")) AS ?performanceRole__dataProviderUrl)
    }
`

export const personRolesQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?performanceRole) as ?instanceCount)
  WHERE {
    BIND(<ID> as ?person)
    ?person a scop:Person .
    ?performanceRole a scop:PerformanceRole ;
                    scop:actor ?person .
    ?performanceRole scop:compositionRole ?category .
    OPTIONAL {
      ?category skos:prefLabel ?prefLabel_ .
      FILTER(LANG(?prefLabel_) = 'fi')
    }
    BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const personInstancePageNetworkLinksQuery = `
  SELECT DISTINCT ?source ?target (COUNT(DISTINCT ?performance) as ?weight)
  WHERE {
    VALUES ?id { <ID> }
    ?id ^scop:actor/scop:performance ?performance .
    ?target ^scop:actor/scop:performance ?performance .
    FILTER(?id != ?target)
    BIND(?id as ?source)
  }
  GROUP BY ?source ?target
`

export const personNetworkNodesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
  WHERE {
    VALUES ?class { scop:Person }
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
      skos:prefLabel ?prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?href)
  }
`