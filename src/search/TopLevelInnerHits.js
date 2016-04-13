  /**
    @class
    <p>inner hits can also be defined as a top level construct alongside 
    the query and aggregations definition. 
    The main reason for using the top level inner hits definition is to 
    let the inner hits return documents that don’t match with the main query.
    At the present this is also the only way to do grandparent/grandchild inner_hits
    Inner hits definitions can be nested via the top level notation.</p>

    <p>See https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-inner-hits.html#top-level-inner-hits</p>

    @name ejs.InnerHits
    @ejs request

    @desc
    <p>Include additional nested hits in the response.</p>

    */
  ejs.TopLevelInnerHits = function (name, typeOrPath, nested) {
    
    var _innerHits = ejs.InnerHits();
    var innerHitDefinition = _innerHits.toJSON();

    return extend(_innerHits, {
    /**
      <p> Allows you to set the specified query on this inner hits object. </p>
      @member ejs.TopLevelInnerHits
      @param {Query} someQuery Any valid <code>Query</code> object.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      query: function (someQuery) {
        if (someQuery == null) {
          return _innerHits.inner_query;
        }

        if (!isQuery(someQuery)) {
          throw new TypeError('Argument must be a Query');
        }
        _innerHits.inner_query = someQuery;
        innerHitDefinition.query = someQuery.toJSON();
        return this;
      },
      
    /**
      <p> Add a nesated inner_hit.  This method can be called multiple times
      in order to set multiple nested inner_hits. </p>

      @member ejs.TopLevelInnerHits
      @param {Aggregation} innerHits Any valid <code>TopLevelInnerHits</code> object.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      innerHits: function(nestedInnerHits) {
        if (nestedInnerHits == null) {
          return innerHitDefinition.inner_hits;
        }

        if (innerHitDefinition.inner_hits == null) {
          innerHitDefinition.inner_hits = {};
        }

        if (!isTopLevelInnerHits(nestedInnerHits)) {
          throw new TypeError('Argument must be an instance of TopLevelInnerHits');
        }

        extend(innerHitDefinition.inner_hits, nestedInnerHits.toJSON());

        return this;
      },
      
    /**
      The type of ejs object.  For internal use only.

      @member ejs.TopLevelInnerHits
      @returns {String} the type of object
      */
      _type: function () {
        return 'top level inner hits';
      },
      
      toJSON: function () {
        var topLevelInnerHits = {};
        topLevelInnerHits[name] = {};
        if (nested) {
          topLevelInnerHits[name]['path'] = {};
          topLevelInnerHits[name]['path'][typeOrPath] = innerHitDefinition;
        } else {
          topLevelInnerHits[name]['type'] = {};
          topLevelInnerHits[name]['type'][typeOrPath] = innerHitDefinition;
        }
        return topLevelInnerHits;
      }   
    });
  };