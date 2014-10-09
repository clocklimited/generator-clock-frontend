var matchVersionPathOnResources = /(^|\s)link.*(href)=(?!versionPath)['"](\w|\.+)/
  , matchUriOnExternalResources = /(src)=(?!versionPath)['"](?!(javascript|data|http|\/\/|\s|'))/
  , matchVersionPathOnCss = /url\(['"](?!(http|\/\/|data:))/
  , matchCss = /console\./

  // To save time I've allowed for customer formats of 5 chars. On the next
  // clean site from the {5}?' from the regexp
  , hardcodedDateFormat = /\.format\('.{5}?'/

module.exports =
  { error:
  // All errors will halt the task and exit with a 0
    [ { terms:
        [ matchVersionPathOnResources
        // Too many false positives - /(^|\s)meta.*(content)=(?!versionPath)['"](\w|\.+)/,
        , matchUriOnExternalResources
        ]
      , fileset: 'templates'
      , description: 'Missing versionPath'
      }
    , { terms:
      [ /if\s*\(err(or)?\)\s*(cb|callback|next)/
      ]
      , fileset:
        [ 'browserJs'
        , 'serverJs'
        ]
      , description: 'Missing returns on errors'
      }
    , { terms:
      [ matchVersionPathOnCss
      ]
      , fileset: 'stylus'
      , description: 'Missing versionPath'
      }
    , { terms:
      [ hardcodedDateFormat
      ]
      , fileset:
        [ 'browserJs'
        , 'serverJs'
        , 'templates'
        ]
      }
    ]
  , warning:
    [ { terms:
      [ matchCss
      ]
    , fileset:
      [ 'browserJs'
      , 'serverJs'
      , 'templates'
      ]
    , description: 'console is not support in IE'
    }
  ]
}
